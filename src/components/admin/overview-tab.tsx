'use client'

import { Package, MapPin, BookOpen, Clock, Users, MessageSquare, Mail, TrendingUp, ArrowRight } from 'lucide-react'
import type { Tab } from './admin-sidebar'

export type Stats = {
  packages: number
  destinations: number
  packageBookings: number
  destBookings: number
  pendingBookings: number
  confirmedBookings: number
  cancelledBookings: number
  doneBookings: number
  users: number
  contacts: number
  newsletters: number
  blogs: number
}

export default function OverviewTab({ stats, setTab }: { stats: Stats | null; setTab: (t: Tab) => void }) {
  if (!stats)
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl h-32 animate-pulse border border-gray-100" />
        ))}
      </div>
    )

  const totalBookings = stats.packageBookings + stats.destBookings

  const cards = [
    {
      label: 'Paket Wisata',
      value: stats.packages,
      icon: Package,
      color: '#3B82F6',
      bg: 'from-blue-50 to-blue-100/50',
      tab: 'paket' as Tab,
      sub: 'total paket aktif'
    },
    {
      label: 'Destinasi',
      value: stats.destinations,
      icon: MapPin,
      color: '#10B981',
      bg: 'from-emerald-50 to-emerald-100/50',
      tab: 'destinasi' as Tab,
      sub: 'destinasi terdaftar'
    },
    {
      label: 'Pesanan Paket',
      value: stats.packageBookings,
      icon: BookOpen,
      color: '#F59E0B',
      bg: 'from-amber-50 to-amber-100/50',
      tab: 'pesanan' as Tab,
      sub: 'total pemesanan paket'
    },
    {
      label: 'Pesanan Destinasi',
      value: stats.destBookings,
      icon: BookOpen,
      color: '#8B5CF6',
      bg: 'from-violet-50 to-violet-100/50',
      tab: 'pesanan' as Tab,
      sub: 'total pemesanan destinasi'
    },
    {
      label: 'Menunggu Konfirmasi',
      value: stats.pendingBookings,
      icon: Clock,
      color: '#EF4444',
      bg: 'from-red-50 to-red-100/50',
      tab: 'pesanan' as Tab,
      sub: 'perlu ditindaklanjuti'
    },
    {
      label: 'Dikonfirmasi',
      value: stats.confirmedBookings,
      icon: TrendingUp,
      color: '#059669',
      bg: 'from-green-50 to-green-100/50',
      tab: 'pesanan' as Tab,
      sub: 'pesanan dikonfirmasi'
    },
    {
      label: 'Pengguna',
      value: stats.users,
      icon: Users,
      color: '#0B2C4D',
      bg: 'from-slate-50 to-slate-100/50',
      tab: 'pengguna' as Tab,
      sub: 'akun terdaftar'
    },
    {
      label: 'Kontak Masuk',
      value: stats.contacts,
      icon: MessageSquare,
      color: '#06B6D4',
      bg: 'from-cyan-50 to-cyan-100/50',
      tab: 'kontak' as Tab,
      sub: 'pesan dari pengunjung'
    },
    {
      label: 'Newsletter',
      value: stats.newsletters,
      icon: Mail,
      color: '#FB8C00',
      bg: 'from-orange-50 to-orange-100/50',
      tab: 'newsletter' as Tab,
      sub: 'pelanggan email'
    },
    {
      label: 'Blog & Artikel',
      value: stats.blogs,
      icon: BookOpen,
      color: '#EC4899',
      bg: 'from-pink-50 to-pink-100/50',
      tab: 'blog' as Tab,
      sub: 'artikel diterbitkan'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0B2C4D] via-[#123b6b] to-[#1a4a7a] rounded-2xl p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 right-24 w-32 h-32 bg-[#FB8C00]/10 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-[#FB8C00]" />
            <span className="text-white/60 text-sm">Ringkasan performa website</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Dashboard Admin NusaTrip</h2>
          <p className="text-white/50 text-sm mb-4">Kelola seluruh data website dari satu tempat.</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-4 py-2.5">
              <p className="text-2xl font-bold">{totalBookings}</p>
              <p className="text-white/60 text-xs">Total Semua Pesanan</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2.5">
              <p className="text-2xl font-bold text-amber-300">{stats.pendingBookings}</p>
              <p className="text-white/60 text-xs">Perlu Dikonfirmasi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2.5">
              <p className="text-2xl font-bold text-emerald-300">{stats.confirmedBookings}</p>
              <p className="text-white/60 text-xs">Sudah Dikonfirmasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map(({ label, value, icon: Icon, color, bg, tab, sub }) => (
          <button
            key={label}
            onClick={() => setTab(tab)}
            className={`bg-gradient-to-br ${bg} rounded-2xl p-4 border border-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Icon size={16} style={{ color }} />
              </div>
              <ArrowRight
                size={13}
                className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <p className="text-2xl font-bold text-[#0B2C4D] leading-none">{value.toLocaleString()}</p>
            <p className="text-xs font-semibold text-[#0B2C4D]/70 mt-1">{label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}