'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Package, MapPin, Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

type Booking = {
  id: string
  full_name: string
  email: string
  phone: string
  participants: number
  total_price: number
  status: string
  notes: string
  created_at: string
  type: 'paket' | 'destinasi'
  title: string
  cover_image_url: string
  location: string
  travel_date?: string
  visit_date?: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Menunggu', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: Clock },
  confirmed: { label: 'Dikonfirmasi', color: 'bg-green-50 text-green-600 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-50 text-red-500 border-red-200', icon: XCircle },
  done: { label: 'Selesai', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: CheckCircle }
}

export default function RiwayatPesananPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [fetching, setFetching] = useState(true)
  const [tab, setTab] = useState<'semua' | 'paket' | 'destinasi'>('semua')

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/riwayat-pesanan')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      setFetching(true)

      const [{ data: paketBookings, error: e1 }, { data: destBookings, error: e2 }] = await Promise.all([
        supabase
          .from('package_bookings')
          .select('*, packages(name, cover_image_url, location)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('destination_bookings')
          .select('*, destinations(name, cover_image_url, location)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ])

      if (e1) console.error('package_bookings error:', e1)
      if (e2) console.error('destination_bookings error:', e2)
      console.log('USER ID:', user.id)
      console.log('paketBookings:', paketBookings)
      console.log('destBookings:', destBookings)

      const mapped: Booking[] = [
        ...(paketBookings ?? []).map((b: Record<string, unknown>) => ({
          ...(b as Booking),
          type: 'paket' as const,
          title: (b.packages as Record<string, string>)?.name ?? '-',
          cover_image_url: (b.packages as Record<string, string>)?.cover_image_url ?? '',
          location: (b.packages as Record<string, string>)?.location ?? '-'
        })),
        ...(destBookings ?? []).map((b: Record<string, unknown>) => ({
          ...(b as Booking),
          type: 'destinasi' as const,
          title: (b.destinations as Record<string, string>)?.name ?? '-',
          cover_image_url: (b.destinations as Record<string, string>)?.cover_image_url ?? '',
          location: (b.destinations as Record<string, string>)?.location ?? '-'
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setBookings(mapped)
      setFetching(false)
    }
    fetchData()
  }, [user])

  const filtered = tab === 'semua' ? bookings : bookings.filter((b) => b.type === tab)

  if (loading || fetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0B2C4D] rounded-full animate-spin" />
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0B2C4D] pt-20 pb-10 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="text-white/50 text-sm mb-1">Akun Saya</p>
          <h1 className="font-montserrat font-bold text-2xl text-white">Riwayat Pesanan</h1>
          <p className="text-white/60 text-sm mt-1">
            Halo, <span className="text-white font-medium">{profile?.full_name}</span> — {bookings.length} total pesanan
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['semua', 'paket', 'destinasi'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                tab === t
                  ? 'bg-[#0B2C4D] text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {t === 'semua'
                ? `Semua (${bookings.length})`
                : t === 'paket'
                  ? `Paket (${bookings.filter((b) => b.type === 'paket').length})`
                  : `Destinasi (${bookings.filter((b) => b.type === 'destinasi').length})`}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-600 mb-1">Belum ada pesanan</p>
            <p className="text-sm text-gray-400 mb-6">Yuk mulai jelajahi wisata Indonesia!</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => router.push('/paket-wisata')}
                className="bg-[#FB8C00] hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
              >
                Paket Wisata
              </button>
              <button
                onClick={() => router.push('/destinasi')}
                className="border border-[#0B2C4D] text-[#0B2C4D] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-50 transition"
              >
                Destinasi
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {filtered.map((booking) => {
                const status = statusConfig[booking.status] ?? statusConfig.pending
                const StatusIcon = status.icon
                const date = booking.travel_date || booking.visit_date
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      {booking.cover_image_url && (
                        <div className="relative w-full sm:w-[160px] h-[140px] sm:h-auto shrink-0">
                          <Image src={booking.cover_image_url} alt={booking.title} fill className="object-cover" />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                booking.type === 'paket' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'
                              }`}
                            >
                              {booking.type === 'paket' ? 'PAKET' : 'DESTINASI'}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* Content */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-semibold text-[#0B2C4D] text-base leading-tight">{booking.title}</h3>
                            <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                              <MapPin size={11} /> {booking.location}
                            </div>
                          </div>
                          <span
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 ${status.color}`}
                          >
                            <StatusIcon size={12} /> {status.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {date && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar size={13} className="text-orange-400 shrink-0" />
                              <span>
                                {new Date(date).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users size={13} className="text-orange-400 shrink-0" />
                            <span>{booking.participants} Peserta</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={13} className="text-orange-400 shrink-0" />
                            <span>Dipesan {new Date(booking.created_at).toLocaleDateString('id-ID')}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-400">Total Pembayaran</p>
                            <p className="font-bold text-[#0B2C4D] text-base">
                              Rp {Number(booking.total_price).toLocaleString('id-ID')}
                            </p>
                          </div>
                          {booking.status === 'pending' && (
                            <div className="flex items-center gap-1.5 text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                              <AlertCircle size={12} /> Menunggu konfirmasi
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pesan lagi */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-4">Mau menjelajahi wisata lainnya?</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => router.push('/paket-wisata')}
                  className="bg-[#FB8C00] hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                >
                  Lihat Paket Wisata
                </button>
                <button
                  onClick={() => router.push('/destinasi')}
                  className="border border-[#0B2C4D] text-[#0B2C4D] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-50 transition"
                >
                  Lihat Destinasi
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
