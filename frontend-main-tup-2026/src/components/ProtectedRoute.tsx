import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// Envuelve las rutas privadas: sin token, al login.
export function ProtectedRoute() {
  const { isAuthenticated, loadingSession } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (loadingSession) return <p>Cargando sesión…</p>
  return <Outlet /> // acá se dibuja la ruta hija
}
