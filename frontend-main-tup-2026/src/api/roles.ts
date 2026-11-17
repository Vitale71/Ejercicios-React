import { apiFetch } from './client'
import type {
  CreatedResponse,
  MessageResponse,
  NamedPayload,
  RoleDetail,
  RoleSummary,
  UserSummary,
} from './types'

export const getRoles = () => apiFetch<RoleSummary[]>('/role')

export const getRole = (id: number) => apiFetch<RoleDetail>(`/role/${id}`)

export const getRoleUsers = (id: number) =>
  apiFetch<UserSummary[]>(`/role/${id}/user`)

export const createRole = (role: NamedPayload) =>
  apiFetch<CreatedResponse>('/role', { method: 'POST', body: role })

export const updateRole = (id: number, role: NamedPayload) =>
  apiFetch<CreatedResponse>(`/role/${id}`, { method: 'PATCH', body: role })

export const deleteRole = (id: number) =>
  apiFetch<MessageResponse>(`/role/${id}`, { method: 'DELETE' })

export const addPermissionToRole = (roleId: number, permId: number) =>
  apiFetch<RoleDetail>(`/role/${roleId}/permission/${permId}`, {
    method: 'POST',
  })

export const removePermissionFromRole = (roleId: number, permId: number) =>
  apiFetch<RoleDetail>(`/role/${roleId}/permission/${permId}`, {
    method: 'DELETE',
  })
