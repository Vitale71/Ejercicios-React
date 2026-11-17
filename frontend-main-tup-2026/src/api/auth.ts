import { apiFetch } from './client'
import type { LoginResponse } from './types'

export const login = (email: string, password: string) =>
  apiFetch<LoginResponse>('/login', {
    method: 'POST',
    body: { email, password },
  })
