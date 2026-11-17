import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPermissions } from '../api/permissions'
import {
  addPermissionToRole,
  getRole,
  getRoleUsers,
  removePermissionFromRole,
} from '../api/roles'
import { ErrorMessage } from '../components/ErrorMessage'
import { useAuth } from '../context/useAuth'
import { useFetch } from '../hooks/useFetch'

export function RoleDetailPage() {
  const roleId = Number(useParams().id)
  const { refreshSession } = useAuth()
  const [selectedPermission, setSelectedPermission] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)

  const { data: role, error, loading, reload } = useFetch(
    () => getRole(roleId),
    [roleId],
  )
  const { data: users } = useFetch(() => getRoleUsers(roleId), [roleId])
  // Todos los permisos, para el selector:
  const { data: permissions } = useFetch(getPermissions, [])

  async function changePermissions(action: () => Promise<unknown>) {
    setActionError(null)
    try {
      await action()
      reload()
      await refreshSession() // puede ser uno de mis roles: mis permisos cambian
    } catch (e) {
      setActionError((e as Error).message)
    }
  }

  if (loading && !role) return <p>Cargando…</p>
  if (error || !role) return <ErrorMessage message={error} />

  // Todos los permisos menos los que el rol ya tiene.
  const has = (id: number) => role.permissions.some((p) => p.id === id)
  const available = permissions?.filter((p) => !has(p.id)) ?? []

  return (
    <>
      <h1>Rol {role.name}</h1>
      <Link to="/roles">Volver</Link>

      <h2>Permisos</h2>
      <ErrorMessage message={actionError} />
      <ul>
        {role.permissions.map((permission) => (
          <li key={permission.id}>
            {permission.name}
            <button
              type="button"
              onClick={() =>
                changePermissions(() =>
                  removePermissionFromRole(role.id, permission.id),
                )
              }
            >
              Quitar
            </button>
          </li>
        ))}
        {role.permissions.length === 0 && <li>Sin permisos asignados.</li>}
      </ul>

      {available.length > 0 && (
        <div>
          <select
            value={selectedPermission}
            onChange={(e) => setSelectedPermission(e.target.value)}
          >
            <option value="">Elegí un permiso</option>
            {available.map((permission) => (
              <option key={permission.id} value={permission.id}>
                {permission.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!selectedPermission}
            onClick={() => {
              changePermissions(() =>
                addPermissionToRole(role.id, Number(selectedPermission)),
              )
              setSelectedPermission('')
            }}
          >
            Asignar permiso
          </button>
        </div>
      )}

      <h2>Usuarios con este rol</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
        {users?.length === 0 && <li>Ningún usuario tiene este rol.</li>}
      </ul>
    </>
  )
}
