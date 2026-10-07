import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  LogOut,
  Store
} from 'lucide-react'
import { Button } from '@/components/ui'

const DEFAULT_MENU_GROUPS = [
  {
    title: 'UTAMA',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'KATALOG & STOK',
    items: [
      { path: '/products', label: 'Daftar Produk', icon: Package },
      { path: '/categories', label: 'Kategori', icon: FolderTree },
    ],
  },
  {
    title: 'MANAJEMEN',
    items: [
      { path: '/users', label: 'Pengguna', icon: Users },
    ],
  },
]

export function Sidebar({
  currentPath = '/dashboard',
  onSelectMenu,
  isCollapsed = false,
  onLogout,
  menuGroups = DEFAULT_MENU_GROUPS
}) {
  return (
    <aside
      className={`relative flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out select-none ${isCollapsed ? 'w-19' : 'w-64'
        }`}
    >
      {/* Brand Header */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold shrink-0 shadow-sm">
            <Store className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-sm leading-tight text-foreground truncate">
                Kasir POS
              </span>
              <span className="text-[11px] text-muted-foreground truncate">
                v1.0.0 Pro
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-muted-foreground/70 tracking-wider uppercase mb-2">
                {group.title}
              </h4>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.path

              return (
                <button
                  key={item.path}
                  onClick={() => onSelectMenu && onSelectMenu(item.path)}
                  title={isCollapsed ? item.label : undefined}
                  className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-150 ${isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary-foreground' : ''}`} />

                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-border mt-auto">
        <Button
          onClick={onLogout}
          variant='destructive'
          title={isCollapsed ? 'Akhiri Shift / Logout' : undefined}
          className={`w-full ${isCollapsed ? 'justify-center px-0' : ''
            }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Akhiri Shift / Logout</span>}
        </Button>
      </div>
    </aside>
  )
}