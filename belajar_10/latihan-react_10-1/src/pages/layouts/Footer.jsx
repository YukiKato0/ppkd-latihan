import { Link } from 'react-router-dom'
import { Layers, Mail, MapPin, Phone } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

export default function FooterComponent() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Kolom 1: Brand & Informasi */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Aplikasi Saya
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Platform manajemen data peserta dan sistem informasi terpadu.
              Memudahkan Anda mengelola data secara efisien, terstruktur, dan aman.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="space-y-3 md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/dashboard"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/peserta"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Data Peserta
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Bantuan */}
          <div className="space-y-3 md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Hubungi Kami
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                <span>support@aplikasisaya.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Hak Cipta & Link Tambahan */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-500">
          <p>&copy; {currentYear} Aplikasi Saya. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="transition-colors hover:text-slate-300">
              Kebijakan Privasi
            </Link>
            <Link to="#" className="transition-colors hover:text-slate-300">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}