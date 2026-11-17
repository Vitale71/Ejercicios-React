import { apiFetch } from './client'
import type {
  CreatedResponse,
  MessageResponse,
  NamedPayload,
  Permission,
} from './types'

export const getPermissions = () => apiFetch<Permission[]>('/permission')

export const getPermission = (id: number) =>
  apiFetch<Permission>(`/permission/${id}`)

export const createPermission = (permission: NamedPayload) =>
  apiFetch<CreatedResponse>('/permission', { method: 'POST', body: permission })

export const updatePermission = (id: number, permission: NamedPayload) =>
  apiFetch<CreatedResponse>(`/permission/${id}`, {
    method: 'PATCH',
    body: permission,
  })

export const deletePermission = (id: number) =>
  apiFetch<MessageResponse>(`/permission/${id}`, { method: 'DELETE' })
