import { CreditCard, DollarSign, TrendingUp, Users } from "lucide-react"
import { StatCard } from "@/components/common/StatCard"

export default function DashboardPage() {
  const stats = [
    { title: "Total Penjualan", value: "Rp 3.000.000", description: "+20.1% dari bulan lalu", icon: DollarSign },
    { title: "Pelanggan Baru", value: "+2.350", description: "+180.1% dari bulan lalu", icon: Users },
    { title: "Total Transaksi", value: "+12.234", description: "+19% dari bulan lalu", icon: CreditCard },
    { title: "Tingkat Konversi", value: "+12.5%", description: "+4% dari minggu lalu", icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ringkasan</h2>
        <p className="text-sm text-muted-foreground">
          Tinjauan statistik dan performa utama bisnis Anda.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}