import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// El marco de todas las pantallas privadas: menú arriba, contenido abajo.
export function Layout() {
  const { user, permissions, logout, showAllButtons, setShowAllButtons } =
    useAuth()

  return (
    <>
      <header>
        <nav>
          <NavLink to="/users">Usuarios</NavLink>
          <NavLink to="/roles">Roles</NavLink>
          {/* solución de "Para completar": */}
          <NavLink to="/permissions">Permisos</NavLink>
        </nav>
        <span>
          {user?.name} ({user?.roles.map((r) => r.name).join(', ')})
        </span>
        <button type="button" onClick={logout}>
          Salir
        </button>
      </header>
      {/* nuevo. ¿Qué hace el backend si el front se equivoca? */}
      <p>
        Mis permisos: {permissions.join(', ') || 'ninguno'}
        <label>
          <input
            type="checkbox"
            checked={showAllButtons}
            onChange={(e) => setShowAllButtons(e.target.checked)}
          />
          Mostrar todos los botones
        </label>
      </p>
      <main>
        <Outlet />
      </main>
    </>
  )
}
