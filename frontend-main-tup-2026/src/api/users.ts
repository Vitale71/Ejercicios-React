import { apiFetch } from './client'
import type {
  CreatedResponse,
  MessageResponse,
  UserDetail,
  UserPayload,
  UserSummary,
} from './types'

// La API no tiene endpoint de países: son los que crea main.py al arrancar.
export const COUNTRIES = [
  { id: 1, name: 'Argentina' },
  { id: 2, name: 'Brasil' },
]

export const getUsers = (offset: number, limit: number) =>
  apiFetch<UserSummary[]>(`/user?offset=${offset}&limit=${limit}`)

export const getUser = (id: number) => apiFetch<UserDetail>(`/user/${id}`)

export const getMyId = () => apiFetch<{ id: number }>('/user/me/id')

export const searchUsers = (name: string) =>
  apiFetch<UserSummary[]>(`/user/search/${encodeURIComponent(name)}`)

export const getAdults = () => apiFetch<UserSummary[]>('/user_mayores')

export const createUser = (user: UserPayload) =>
  apiFetch<CreatedResponse>('/user', { method: 'POST', body: user })

export const updateUser = (id: number, user: UserPayload) =>
  apiFetch<CreatedResponse>(`/user/${id}`, { method: 'PATCH', body: user })

export const deleteUser = (id: number) =>
  apiFetch<MessageResponse>(`/user/${id}`, { method: 'DELETE' })

export const addRoleToUser = (userId: number, roleId: number) =>
  apiFetch<UserDetail>(`/user/${userId}/role/${roleId}`, { method: 'POST' })

export const removeRoleFromUser = (userId: number, roleId: number) =>
  apiFetch<UserDetail>(`/user/${userId}/role/${roleId}`, { method: 'DELETE' })
