import { Link } from 'react-router-dom'
import { getRoles } from '../api/roles'
import { ErrorMessage } from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'

export function RolesPage() {
  const { data: roles, error, loading } = useFetch(getRoles, [])

  return (
    <>
      <h1>Roles</h1>
      <ErrorMessage message={error} />
      {loading && <p>Cargando…</p>}
      <ul>
        {roles?.map((role) => (
          <li key={role.id}>
            <Link to={`/roles/${role.id}`}>{role.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
