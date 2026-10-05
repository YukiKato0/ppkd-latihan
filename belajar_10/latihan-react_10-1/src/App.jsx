import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

// Layout & Protection
import MainLayout from './app/MainLayout'
import ProtectedRoute from './app/ProtectedRoute'
import ListUser from './components/ListUser'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Navigate to='/login' replace />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/users' element={<ListUser />} />
          </Route>
        </Route>

        <Route
          path='*'
          element={
            <div style={{ padding: '20px' }}>404 | Halaman Tidak Ditemukan</div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
