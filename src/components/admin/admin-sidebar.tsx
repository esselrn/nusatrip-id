'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard,
  Package,
  MapPin,
  BookOpen,
  Users,
  Mail,
  MessageSquare,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'

export type Tab = 'overview' | 'pesanan' | 'paket' | 'destinasi' | 'blog' | 'pengguna' | 'kontak' | 'newsletter'

export const NAV_ITEMS: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'pesanan', icon: BookOpen, label: 'Pesanan' },
  { id: 'paket', icon: Package, label: 'Paket Wisata' },
  { id: 'destinasi', icon: MapPin, label: 'Destinasi' },
  { id: 'blog', icon: BookOpen, label: 'Blog & Artikel' },
  { id: 'pengguna', icon: Users, label: 'Pengguna' },
  { id: 'kontak', icon: MessageSquare, label: 'Kontak' },
  { id: 'newsletter', icon: Mail, label: 'Newsletter' }
]

interface Props {
  tab: Tab
  setTab: (t: Tab) => void
  open: boolean
  setOpen: (o: boolean) => void
  adminName: string
  adminEmail: string
}

export default function AdminSidebar({ tab, setTab, open, setOpen, adminName, adminEmail }: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 bg-[#0B2C4D] shadow-2xl ${open ? 'w-[240px]' : 'w-[68px]'}`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 h-[64px] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FB8C00] flex items-center justify-center shrink-0 font-bold text-white text-sm select-none">
            N
          </div>
          {open && <span className="font-bold text-white text-base tracking-wide">NusaTrip</span>}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition ml-2"
        >
          {open ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            title={!open ? label : undefined}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-150 text-sm font-medium ${
              tab === id ? 'bg-[#FB8C00] text-white' : 'text-white/55 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Icon size={17} className="shrink-0" />
            {open && <span className="truncate flex-1 text-left">{label}</span>}
            {open && tab === id && <ChevronRight size={13} className="shrink-0 opacity-70" />}
          </button>
        ))}
      </nav>

      {/* Admin Profile */}
      <div className="border-t border-white/10 p-3 shrink-0">
        {open && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-[#FB8C00] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {(adminName || 'A')[0].toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold text-white truncate">{adminName}</p>
              <p className="text-[10px] text-white/40 truncate">{adminEmail}</p>
              <span className="inline-block text-[9px] font-bold bg-[#FB8C00]/20 text-[#FB8C00] px-1.5 py-0.5 rounded mt-0.5 tracking-wide">
                ADMINISTRATOR
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => window.open('/', '_blank')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] transition text-xs mb-1"
          title={!open ? 'Lihat sebagai pengguna' : undefined}
        >
          <Users size={15} className="shrink-0" />
          {open && <span>Lihat sebagai pengguna</span>}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition text-xs"
          title={!open ? 'Keluar' : undefined}
        >
          <LogOut size={15} className="shrink-0" />
          {open && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  )
}