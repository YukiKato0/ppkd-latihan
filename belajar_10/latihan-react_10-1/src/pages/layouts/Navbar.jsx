import { useState } from 'react'
import {
  Search,
  Menu,
  PanelLeft,
  Store,
  User,
  PlusCircle,
  PauseCircle,
  ChevronDown
} from 'lucide-react'
import { Button, Input } from '@/components/ui'

export function Navbar({
  storeName = "Cabang Utama - Jakarta",
  cashierName = "Budi Santoso",
  shiftNumber = 1,
  holdCount = 3,
  isCollapsed = false,
  onToggleCollapse,
  onToggleMobileSidebar,
  onNewTransaction,
  onOpenHoldOrders,
  onSearchChange
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchQuery(val)
    if (onSearchChange) onSearchChange(val)
  }

  return (
    <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile Toggle, Desktop Collapse Toggle & Outlet Selector */}
      <div className="flex items-center gap-2">
        {/* Mobile Sidebar Toggle (Drawer) */}
        <Button
          onClick={onToggleMobileSidebar}
          variant='ghost'
          className="p-2 rounded hover:bg-accent text-muted-foreground md:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Desktop Sidebar Toggle (Collapse / Expand) */}
        <Button
          onClick={onToggleCollapse}
          variant='ghost'
          className="hidden md:block"
          title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
          aria-label="Toggle desktop sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </Button>

        {/* Outlet Switcher */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium cursor-pointer hover:bg-accent/50 transition-colors ml-1">
          <Store className="w-4 h-4 text-primary shrink-0" />
          <span className="hidden sm:inline font-semibold text-foreground truncate max-w-37.5">
            {storeName}
          </span>
          <span className="sm:hidden font-semibold text-foreground truncate max-w-22.5">
            Cabang
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>

        {/* Status Shift */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Shift #{shiftNumber} Aktif</span>
        </div>
      </div>

      {/* Middle: Search Bar Barcode/Produk */}
      <div className="flex-1 max-w-md mx-2 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari produk atau scan barcode..."
            className="w-full pl-3! pr-4 py-1.5 bg-background border border-input rounded text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Right: Quick Actions & Profile */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onOpenHoldOrders}
          variant='outline'
          className="relative"
          title="Pesanan Tertahan"
        >
          <PauseCircle className="w-5 h-5 text-amber-500" />
          <span className="hidden sm:inline">Hold</span>
          {holdCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
              {holdCount}
            </span>
          )}
        </Button>

        <Button
          onClick={onNewTransaction}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Baru</span>
        </Button>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs border border-border shrink-0">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="hidden xl:flex flex-col text-left leading-none">
            <span className="text-xs font-semibold text-foreground">{cashierName}</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Kasir Senior</span>
          </div>
        </div>
      </div>
    </header>
  )
}