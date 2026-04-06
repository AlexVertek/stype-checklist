import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Filmagens from './pages/Filmagens'
import NovaFilmagem from './pages/NovaFilmagem'
import Checklist from './pages/Checklist'

function ProtectedRoute({ children }) {
  const user = useAuth()
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Carregando...</div>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const user = useAuth()
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/filmagens" replace /> : <Login />}
      />
      <Route
        path="/filmagens"
        element={<ProtectedRoute><Filmagens /></ProtectedRoute>}
      />
      <Route
        path="/filmagens/nova"
        element={<ProtectedRoute><NovaFilmagem /></ProtectedRoute>}
      />
      <Route
        path="/filmagens/:id/checklist"
        element={<ProtectedRoute><Checklist /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/filmagens" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
