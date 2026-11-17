import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function LoginPage() {
  const { isAuthenticated, login, sessionMessage } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) return <Navigate to="/users" replace />

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    setError(null)
    try {
      await login(email, password)
    } catch (e) {
      setError((e as Error).message) // el detail de la API, gracias a apiFetch
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ingresar</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
      {(error ?? sessionMessage) && <p>{error ?? sessionMessage}</p>}
    </form>
  )
}
