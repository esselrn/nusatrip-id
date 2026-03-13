'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Search, Filter, Eye, Trash2, RefreshCw, CheckCircle, XCircle, Clock, Package, MapPin } from 'lucide-react'
import AdminModal from './admin-modal'

type Booking = Record<string, unknown>

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: 'Menunggu', color: '#D97706', bg: '#FEF3C7', icon: Clock },
  confirmed: { label: 'Dikonfirmasi', color: '#059669', bg: '#D1FAE5', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: '#DC2626', bg: '#FEE2E2', icon: XCircle },
  done: { label: 'Selesai', color: '#2563EB', bg: '#DBEAFE', icon: CheckCircle }
}

const BANK_INFO = [
  { bank: 'BCA', no: '1234567890', atas: 'PT NusaTrip Indonesia' },
  { bank: 'Mandiri', no: '9876543210', atas: 'PT NusaTrip Indonesia' },
  { bank: 'BRI', no: '1122334455', atas: 'PT NusaTrip Indonesia' }
]

export default function PesananTab() {
  const [data, setData] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [updating, setUpdating] = useState(false)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [{ data: pb }, { data: db }] = await Promise.all([
      supabase
        .from('package_bookings')
        .select('*, packages(name, cover_image_url, location)')
        .order('created_at', { ascending: false }),
      supabase
        .from('destination_bookings')
        .select('*, destinations(name, cover_image_url, location)')
        .order('created_at', { ascending: false })
    ])
    const merged = [
      ...(pb ?? []).map((b) => ({
        ...b,
        _type: 'paket',
        _name: (b.packages as Record<string, string>)?.name ?? '-',
        _image: (b.packages as Record<string, string>)?.cover_image_url ?? '',
        _location: (b.packages as Record<string, string>)?.location ?? '-'
      })),
      ...(db ?? []).map((b) => ({
        ...b,
        _type: 'destinasi',
        _name: (b.destinations as Record<string, string>)?.name ?? '-',
        _image: (b.destinations as Record<string, string>)?.cover_image_url ?? '',
        _location: (b.destinations as Record<string, string>)?.location ?? '-'
      }))
    ].sort((a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime())
    setData(merged as Booking[])
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll()
  }, [fetchAll])

  const filtered = data.filter((row) => {
    const matchSearch =
      search === '' ||
      [row._name, row.full_name, row.email, row.phone].some((v) =>
        String(v ?? '')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    const matchStatus = statusFilter === 'all' || row.status === statusFilter
    const matchType = typeFilter === 'all' || row._type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const handleStatusChange = async (booking: Booking, newStatus: string) => {
    setUpdating(true)
    const table = booking._type === 'paket' ? 'package_bookings' : 'destination_bookings'
    await supabase.from(table).update({ status: newStatus }).eq('id', String(booking.id))
    await fetchAll()
    if (selected?.id === booking.id) setSelected((prev) => (prev ? { ...prev, status: newStatus } : null))
    setUpdating(false)
  }

  const handleDelete = async (booking: Booking) => {
    if (!confirm(`Hapus pesanan dari ${String(booking.full_name)}?`)) return
    const table = booking._type === 'paket' ? 'package_bookings' : 'destination_bookings'
    await supabase.from(table).delete().eq('id', String(booking.id))
    setSelected(null)
    fetchAll()
  }

  const fmt = (v: unknown) =>
    v ? new Date(String(v)).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'
  const fmtPrice = (v: unknown) => `Rp ${Number(v ?? 0).toLocaleString('id-ID')}`

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, telepon..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2C4D]/20 bg-gray-50"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Filter size={13} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B2C4D]/20"
          >
            <option value="all">Semua Status</option>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B2C4D]/20"
          >
            <option value="all">Semua Tipe</option>
            <option value="paket">Paket Wisata</option>
            <option value="destinasi">Destinasi</option>
          </select>
        </div>
        <button
          onClick={fetchAll}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition shrink-0"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
        <span className="text-xs text-gray-400 font-medium shrink-0">{filtered.length} pesanan</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-7 h-7 border-2 border-gray-200 border-t-[#0B2C4D] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">Tidak ada pesanan ditemukan</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Wisata', 'Tipe', 'Pemesan', 'Kontak', 'Peserta', 'Total', 'Status', 'Tanggal', 'Aksi'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((row) => {
                  const s = String(row.status ?? 'pending')
                  const cfg = STATUS_CONFIG[s] ?? STATUS_CONFIG.pending
                  return (
                    <tr key={String(row.id)} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 font-medium text-[#0B2C4D] max-w-[160px] truncate">{String(row._name)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${row._type === 'paket' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}
                        >
                          {row._type === 'paket' ? <Package size={10} /> : <MapPin size={10} />}
                          {String(row._type).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-[130px] truncate">{String(row.full_name ?? '-')}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{String(row.email ?? '-')}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{String(row.participants ?? '-')}</td>
                      <td className="px-4 py-3 font-semibold text-[#0B2C4D] whitespace-nowrap">
                        {fmtPrice(row.total_price)}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={s}
                          onChange={(e) => handleStatusChange(row, e.target.value)}
                          disabled={updating}
                          className="text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none disabled:opacity-50"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                            <option key={k} value={k}>
                              {v.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{fmt(row.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelected(row)}
                            className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-500 transition"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(row)}
                            className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <AdminModal title="Detail Pesanan" onClose={() => setSelected(null)} size="lg">
          <div className="space-y-5">
            {/* Wisata info */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              {!!selected._image && String(selected._image) !== '' && (
                <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={String(selected._image)} alt="" fill className="object-cover" unoptimized />
                </div>
              )}
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${selected._type === 'paket' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}
                >
                  {String(selected._type).toUpperCase()}
                </span>
                <p className="font-bold text-[#0B2C4D]">{String(selected._name)}</p>
                <p className="text-xs text-gray-500">{String(selected._location)}</p>
              </div>
            </div>

            {/* Data Pemesan */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Data Pemesan</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {(
                  [
                    ['Nama', String(selected.full_name ?? '-')],
                    ['Email', String(selected.email ?? '-')],
                    ['Telepon', String(selected.phone ?? '-')],
                    ['Peserta', `${String(selected.participants)} orang`],
                    ['Tanggal Wisata', fmt(selected.travel_date ?? selected.visit_date)],
                    ['Tanggal Pesan', fmt(selected.created_at)]
                  ] as [string, string][]
                ).map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-gray-400 mb-0.5">{k}</p>
                    <p className="font-medium text-[#0B2C4D]">{v}</p>
                  </div>
                ))}
              </div>
              {!!selected.notes && (
                <div className="mt-3 bg-amber-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-amber-600 mb-0.5 font-semibold">Catatan</p>
                  <p className="text-sm text-gray-700">{String(selected.notes)}</p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between bg-[#0B2C4D] text-white rounded-xl px-4 py-3">
              <span className="text-sm">Total Pembayaran</span>
              <span className="font-bold text-lg">{fmtPrice(selected.total_price)}</span>
            </div>

            {/* Status Control */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ubah Status Pesanan</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(STATUS_CONFIG).map(([k, v]) => {
                  const Icon = v.icon
                  const isCurrent = String(selected.status ?? '') === k
                  return (
                    <button
                      key={k}
                      onClick={() => handleStatusChange(selected, k)}
                      disabled={updating || isCurrent}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition disabled:opacity-50 ${isCurrent ? 'border-current' : 'border-gray-200 hover:border-current'}`}
                      style={{ color: v.color, background: isCurrent ? v.bg : 'white' }}
                    >
                      <Icon size={15} />
                      {v.label}
                      {isCurrent && <span className="ml-auto text-[10px] font-bold">AKTIF</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Payment Info */}
            {String(selected.status ?? '') === 'confirmed' && (
              <div className="border-2 border-emerald-200 bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <p className="font-bold text-emerald-700 text-sm">Pesanan Dikonfirmasi — Info Pembayaran</p>
                </div>
                <p className="text-xs text-emerald-600 mb-3">
                  Sampaikan info berikut ke pemesan untuk menyelesaikan pembayaran:
                </p>
                <div className="space-y-2">
                  {BANK_INFO.map((b) => (
                    <div key={b.bank} className="bg-white rounded-lg px-3 py-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">{b.bank}</p>
                        <p className="font-bold text-[#0B2C4D] text-sm">{b.no}</p>
                        <p className="text-xs text-gray-400">a.n. {b.atas}</p>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(b.no)}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Salin
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-emerald-600 mt-3">
                  * Setelah pembayaran diterima, ubah status menjadi &quot;Selesai&quot;
                </p>
              </div>
            )}
          </div>
        </AdminModal>
      )}
    </div>
  )
}