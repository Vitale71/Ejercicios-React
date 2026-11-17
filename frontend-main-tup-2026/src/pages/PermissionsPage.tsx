import { useState } from 'react'
import type { SubmitEvent } from 'react'
import {
  createPermission,
  deletePermission,
  getPermission,
  getPermissions,
  updatePermission,
} from '../api/permissions'
import { ConfirmButton } from '../components/ConfirmButton'
import { ErrorMessage } from '../components/ErrorMessage'
import { useFetch } from '../hooks/useFetch'

export function PermissionsPage() {
  // GET /permissions
  const { data: permissions, error, loading, reload } = useFetch(
    getPermissions,
    [],
  )
  const [editingId, setEditingId] = useState<number | null>(null) // null = alta
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)

  function resetForm() {
    setEditingId(null)
    setName('')
    setDescription('')
  }

  // Maneja el submit del formulario, para crear o editar un permiso.
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    setActionError(null)
    const payload = { name, description: description || null }
    try {
      if (editingId) await updatePermission(editingId, payload)
      else await createPermission(payload)
      resetForm()
      reload()
    } catch (e) {
      setActionError((e as Error).message)
    }
  }

  // GET /permissions no trae la descripción y PATCH la reemplaza:
  // antes de editar se pide el permiso completo, para no borrarla sin querer.
  async function startEditing(id: number) {
    setActionError(null)
    try {
      const permission = await getPermission(id)
      setEditingId(id)
      setName(permission.name)
      setDescription(permission.description ?? '')
    } catch (e) {
      setActionError((e as Error).message)
    }
  }
  
  // DELETE /permissions/:id
  async function handleDelete(id: number) {
    setActionError(null)
    try {
      await deletePermission(id)
      if (id === editingId) resetForm()
      reload()
    } catch (e) {
      setActionError((e as Error).message)
    }
  }

  return (
    <>
      <h1>Permisos</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          {editingId ? 'Guardar cambios' : 'Crear permiso'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <ErrorMessage message={error ?? actionError} />
      {loading && <p>Cargando…</p>}

      <ul>
        {permissions?.map((permission) => (
          <li key={permission.id}>
            {permission.name}
            <button type="button" onClick={() => startEditing(permission.id)}>
              Editar
            </button>
            <ConfirmButton
              label="Borrar"
              onConfirm={() => handleDelete(permission.id)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
