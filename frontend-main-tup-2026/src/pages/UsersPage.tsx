import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import { deleteUser, getAdults, getUsers, searchUsers } from '../api/users'
import { ConfirmButton } from '../components/ConfirmButton'
import { useAuth } from '../context/useAuth'
import { ErrorMessage } from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'

const PAGE_SIZE = 5

export function UsersPage() {
  const { can } = useAuth() // nuevo
  const [offset, setOffset] = useState(0)
  const [searchText, setSearchText] = useState('') // lo que se escribe
  const [search, setSearch] = useState('')         // lo que se busca
  const [onlyAdults, setOnlyAdults] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  // Un solo pedido que depende de los filtros: si cambia uno, se pide de nuevo.
  const { data: users, error, loading, reload } = useFetch(() => {
    if (search) return searchUsers(search)
    if (onlyAdults) return getAdults()
    return getUsers(offset, PAGE_SIZE)
  }, [search, onlyAdults, offset])

  function handleSearch(event: SubmitEvent) {
    event.preventDefault()
    setOffset(0)
    setSearch(searchText.trim())
  }

  async function handleDelete(id: number) {
    setActionError(null)
    try {
      await deleteUser(id)
      reload() // vuelve a pedir la lista, ya sin el usuario borrado
    } catch (e) {
      setActionError((e as Error).message)
    }
  }

  return (
    <>
      <h1>Usuarios</h1>
      {can('write_users') && <Link to="/users/new">Nuevo usuario</Link>}

      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar por nombre"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <label>
          <input
            type="checkbox"
            checked={onlyAdults}
            onChange={(e) => {
              setOffset(0)
              setOnlyAdults(e.target.checked)
            }}
          />
          Solo mayores de edad
        </label>
      </form>

      <ErrorMessage message={error ?? actionError} />
      {loading && <p>Cargando…</p>}

      {users && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <Link to={`/users/${user.id}`}>Ver</Link>
                  {can('update_users') && (
                    <Link to={`/users/${user.id}/edit`}>Editar</Link>
                  )}
                  {can('delete_users') && (
                    <ConfirmButton
                      label="Borrar"
                      onConfirm={() => handleDelete(user.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Buscar y "mayores" traen todo junto: solo se pagina la lista. */}
      {!search && !onlyAdults && users && (
        <div>
          <button
            type="button"
            disabled={offset === 0}
            onClick={() => setOffset(offset - PAGE_SIZE)}
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={users.length < PAGE_SIZE}
            onClick={() => setOffset(offset + PAGE_SIZE)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  )
}
