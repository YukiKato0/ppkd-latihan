import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ListUserPage from './pages/ListUserPage'
import ProductsPage from './pages/ProductsPage'
import CategoriesPage from './pages/CategoriesPage'

// Layout & Protection
import MainLayout from './pages/layouts/MainLayout'
import ProtectedRoute from './app/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Navigate to='/login' replace />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/users' element={<ListUserPage />} />
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/products' element={<ProductsPage />} />
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
