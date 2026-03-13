'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import { Bell, RefreshCw } from 'lucide-react'
import AdminSidebar, { type Tab, NAV_ITEMS } from '@/components/admin/admin-sidebar'
import OverviewTab, { type Stats } from '@/components/admin/overview-tab'
import PesananTab from '@/components/admin/pesanan-tab'
import CrudTab from '@/components/admin/crud-tab'

const CRUD_TABS: Tab[] = ['paket', 'destinasi', 'blog', 'pengguna', 'kontak', 'newsletter']

export default function AdminPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      router.push('/')
    }
  }, [user, profile, loading, router])

  const fetchStats = useCallback(async () => {
    const [
      { count: packages },
      { count: destinations },
      { count: packageBookings },
      { count: destBookings },
      { count: pendingBookings },
      { count: confirmedBookings },
      { count: cancelledBookings },
      { count: doneBookings },
      { count: users },
      { count: contacts },
      { count: newsletters },
      { count: blogs }
    ] = await Promise.all([
      supabase.from('packages').select('id', { count: 'exact', head: true }),
      supabase.from('destinations').select('id', { count: 'exact', head: true }),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }),
      supabase.from('destination_bookings').select('id', { count: 'exact', head: true }),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'confirmed'),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'done'),
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('newsletters').select('id', { count: 'exact', head: true }),
      supabase.from('blogs').select('id', { count: 'exact', head: true })
    ])
    setStats({
      packages: packages ?? 0,
      destinations: destinations ?? 0,
      packageBookings: packageBookings ?? 0,
      destBookings: destBookings ?? 0,
      pendingBookings: pendingBookings ?? 0,
      confirmedBookings: confirmedBookings ?? 0,
      cancelledBookings: cancelledBookings ?? 0,
      doneBookings: doneBookings ?? 0,
      users: users ?? 0,
      contacts: contacts ?? 0,
      newsletters: newsletters ?? 0,
      blogs: blogs ?? 0
    })
  }, [])

  useEffect(() => {
    if (profile?.role === 'admin') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStats()
    }
  }, [profile, fetchStats])

  if (loading || !profile)
    return (
      <div className="min-h-screen bg-[#0B2C4D] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )

  if (profile.role !== 'admin') return null

  const currentLabel = NAV_ITEMS.find((n: { id: Tab }) => n.id === tab)?.label ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      <AdminSidebar
        tab={tab}
        setTab={setTab}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        adminName={profile.full_name ?? 'Admin'}
        adminEmail={user?.email ?? ''}
      />
      <main
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-[240px]' : 'ml-[68px]'}`}
      >
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between h-[64px] px-6">
            <div>
              <h1 className="font-bold text-[#0B2C4D] text-base leading-tight">{currentLabel}</h1>
              <p className="text-[11px] text-gray-400">Admin Panel NusaTrip</p>
            </div>
            <div className="flex items-center gap-3">
              {(stats?.pendingBookings ?? 0) > 0 && (
                <button
                  onClick={() => setTab('pesanan')}
                  className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full transition"
                >
                  <Bell size={13} />
                  {stats!.pendingBookings} pesanan pending
                </button>
              )}
              <button
                onClick={fetchStats}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition text-gray-400"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6">
          {tab === 'overview' && <OverviewTab stats={stats} setTab={setTab} />}
          {tab === 'pesanan' && <PesananTab />}
          {CRUD_TABS.includes(tab) && <CrudTab tab={tab} onDataChange={fetchStats} />}
        </div>
      </main>
    </div>
  )
}