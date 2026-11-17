import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { PermissionsPage } from './pages/PermissionsPage'
import { RoleDetailPage } from './pages/RoleDetailPage'
import { RolesPage } from './pages/RolesPage'
import { UserDetailPage } from './pages/UserDetailPage'
import { UserFormPage } from './pages/UserFormPage'
import { UsersPage } from './pages/UsersPage'
import { ToastProvider } from './context/ToastContext'
import { Toast } from './components/Toast'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>    {/* 1) ¿hay sesión? */}
              <Route element={<Layout />}>           {/* 2) menú, Salir */}
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/new" element={<UserFormPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/users/:id/edit" element={<UserFormPage />} />
              {/* nuevas: */}
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/roles/:id" element={<RoleDetailPage />} />
              {/* solución de "Para completar": */}
              <Route path="/permissions" element={<PermissionsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
        <Toast />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
