import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRoles } from '../api/roles'
import { addRoleToUser, getUser, removeRoleFromUser } from '../api/users'
import { ErrorMessage } from '../components/ErrorMessage'
import { useAuth } from '../context/useAuth'
import { useFetch } from '../hooks/useFetch'

export function UserDetailPage() {
  const userId = Number(useParams().id)
  const { can, user: me, refreshSession } = useAuth()
  const [selectedRole, setSelectedRole] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)

  const { data: user, error, loading, reload } = useFetch(
    () => getUser(userId),
    [userId],
  )
  // Todos los roles, para el selector:
  const { data: roles } = useFetch(getRoles, [])

  // Después de asignar o quitar: recargar y, si soy yo, recalcular permisos.
  async function changeRoles(action: () => Promise<unknown>) {
    setActionError(null)
    try {
      await action()
      reload()
      if (userId === me?.id) await refreshSession()
    } catch (e) {
      setActionError((e as Error).message)
    }
  }

  if (loading && !user) return <p>Cargando…</p>
  if (error || !user) return <ErrorMessage message={error} />

  // Se cruzan dos listas: todos los roles menos los que el usuario ya tiene.
  const has = (id: number) => user.roles.some((r) => r.id === id)
  const availableRoles = roles?.filter((role) => !has(role.id)) ?? []

  return (
    <>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Edad: {user.age}</p>
      <p>País: {user.country?.name ?? 'Sin país'}</p>
      {can('update_users') && <Link to={`/users/${user.id}/edit`}>Editar</Link>}
      <Link to="/users">Volver</Link>

      <h2>Roles</h2>
      <ErrorMessage message={actionError} />
      <ul>
        {user.roles.map((role) => (
          <li key={role.id}>
            <Link to={`/roles/${role.id}`}>{role.name}</Link>
            {/* Quitar pide update_users en el backend. */}
            {can('update_users') && (
              <button
                type="button"
                onClick={() =>
                  changeRoles(() => removeRoleFromUser(user.id, role.id))
                }
              >
                Quitar
              </button>
            )}
          </li>
        ))}
        {user.roles.length === 0 && <li>Sin roles asignados.</li>}
      </ul>

      {/* Asignar pide write_users en el backend. */}
      {can('write_users') && availableRoles.length > 0 && (
        <div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Elegí un rol</option>
            {availableRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!selectedRole}
            onClick={() => {
              changeRoles(() => addRoleToUser(user.id, Number(selectedRole)))
              setSelectedRole('')
            }}
          >
            Asignar rol
          </button>
        </div>
      )}
    </>
  )
}
