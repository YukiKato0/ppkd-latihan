import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentPath={location.pathname}
          onSelectMenu={(path) => navigate(path)}
          isCollapsed={isCollapsed}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar (Drawer Overlay) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative z-10 w-64 bg-card h-full">
            <Sidebar
              currentPath={location.pathname}
              onSelectMenu={(path) => {
                navigate(path)
                setIsMobileOpen(false)
              }}
              isCollapsed={false}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
          onNewTransaction={() => navigate('/products')}
          onOpenHoldOrders={() => alert('Fitur Hold Order')}
          onSearchChange={(query) => console.log('Search:', query)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}