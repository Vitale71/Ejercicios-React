import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import * as authApi from '../api/auth'
import { setUnauthorizedHandler } from '../api/client'
import { getRole } from '../api/roles'
import type { UserDetail } from '../api/types'
import { getMyId, getUser } from '../api/users'
import { AuthContext } from './useAuth'

// El JWT solo trae el email: quién soy y qué puedo hacer se pide a la API.
async function fetchSession() {
  // 1) GET /user/me/id
  const { id } = await getMyId()
  // 2) GET /user/{id}: mis datos y mis roles
  const user = await getUser(id)
  // 3) GET /role/{id} por cada rol, todos a la vez: los permisos de cada uno
  const roles = await Promise.all(user.roles.map((r) => getRole(r.id)))
  // 4) Juntar los nombres de los permisos, sin repetidos
  const names = roles.flatMap((role) => role.permissions.map((p) => p.name))
  return { user, permissions: [...new Set(names)] }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState<UserDetail | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [sessionMessage, setSessionMessage] = useState<string | null>(null)
  const [showAllButtons, setShowAllButtons] = useState(false)

  // useCallback: la misma función en cada render, así los useEffect de abajo
  // no se vuelven a ejecutar en cada render.
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setPermissions([])
    setShowAllButtons(false)
  }, [])

  // apiFetch llama a esto cuando la API responde 401 con un token.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
      setSessionMessage('Tu sesión venció. Volvé a ingresar.')
    })
  }, [logout])

  // Corre al iniciar sesión y al recargar la página con un token guardado.
  useEffect(() => {
    if (!token) return
    fetchSession()
      .then((session) => {
        setUser(session.user)
        setPermissions(session.permissions)
      })
      .catch((e: Error) => {
        logout()
        setSessionMessage((current) => current ?? e.message)
      })
  }, [token, logout])

  async function login(email: string, password: string) {
    setSessionMessage(null)
    const { token: newToken } = await authApi.login(email, password)
    localStorage.setItem('token', newToken)
    setToken(newToken) // cambia el token → corre el useEffect de arriba
  }

  // Para volver a pedir los permisos después de cambiar roles (paso 13).
  async function refreshSession() {
    const session = await fetchSession()
    setUser(session.user)
    setPermissions(session.permissions)
  }

  const value = {
    user,
    permissions,
    isAuthenticated: token !== null,
    loadingSession: token !== null && user === null,
    sessionMessage,
    login,
    logout,
    refreshSession,
    can: (permission: string) =>
      showAllButtons || permissions.includes(permission),
    showAllButtons,
    setShowAllButtons,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
