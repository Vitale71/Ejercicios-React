import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo que estás buscando no existe o fue eliminado.</p>
      <Link to="/users">Volver a la lista de usuarios</Link>
    </div>
  )
}