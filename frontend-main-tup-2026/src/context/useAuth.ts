import { createContext, useContext } from 'react'
import type { UserDetail } from '../api/types'

// Lo que cualquier componente puede pedirle a la sesión.
export interface AuthContextValue {
  user: UserDetail | null
  permissions: string[]
  isAuthenticated: boolean
  loadingSession: boolean
  sessionMessage: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshSession: () => Promise<void>
  can: (permission: string) => boolean
  showAllButtons: boolean                    // paso 12
  setShowAllButtons: (value: boolean) => void // paso 12
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth se usa dentro de <AuthProvider>')
  return context
}
