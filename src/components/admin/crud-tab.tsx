'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, Plus, Trash2, Eye, Pencil, RefreshCw, CheckCircle, XCircle, Star } from 'lucide-react'
import AdminModal from './admin-modal'
import type { Tab } from './admin-sidebar'

type Row = Record<string, unknown>

const TABLE_MAP: Partial<Record<Tab, string>> = {
  paket: 'packages',
  destinasi: 'destinations',
  blog: 'blogs',
  pengguna: 'users',
  kontak: 'contacts',
  newsletter: 'newsletters'
}

const FIELDS: Partial<Record<Tab, { key: string; label: string; type?: string; required?: boolean; textarea?: boolean }[]>> =
  {
    paket: [
      { key: 'name', label: 'Nama Paket', required: true },
      { key: 'location', label: 'Lokasi Singkat', required: true },
      { key: 'full_location', label: 'Lokasi Lengkap' },
      { key: 'price_per_person', label: 'Harga per Orang', type: 'number', required: true },
      { key: 'rating', label: 'Rating (0-5)', type: 'number' },
      { key: 'duration_day', label: 'Durasi (Hari)', type: 'number' },
      { key: 'duration_night', label: 'Durasi (Malam)', type: 'number' },
      { key: 'max_person', label: 'Maks. Peserta', type: 'number' },
      { key: 'type', label: 'Tipe Paket' },
      { key: 'language', label: 'Bahasa' },
      { key: 'short_description', label: 'Deskripsi Singkat', textarea: true },
      { key: 'summary', label: 'Summary', textarea: true },
      { key: 'cover_image_url', label: 'URL Cover Image' },
      { key: 'thumbnail_url', label: 'URL Thumbnail' }
    ],
    destinasi: [
      { key: 'name', label: 'Nama Destinasi', required: true },
      { key: 'location', label: 'Lokasi Singkat', required: true },
      { key: 'full_location', label: 'Lokasi Lengkap' },
      { key: 'price_per_person', label: 'Harga per Orang', type: 'number', required: true },
      { key: 'rating', label: 'Rating (0-5)', type: 'number' },
      { key: 'short_description', label: 'Deskripsi Singkat', textarea: true },
      { key: 'summary', label: 'Summary', textarea: true },
      { key: 'cover_image_url', label: 'URL Cover Image' },
      { key: 'thumbnail_url', label: 'URL Thumbnail' }
    ],
    blog: [
      { key: 'title', label: 'Judul', required: true },
      { key: 'category', label: 'Kategori' },
      { key: 'author', label: 'Penulis' },
      { key: 'date', label: 'Tanggal (teks)' },
      { key: 'description', label: 'Deskripsi', textarea: true },
      { key: 'image', label: 'URL Gambar' },
      { key: 'hero_image', label: 'URL Hero Image' },
      { key: 'content', label: 'Konten', textarea: true }
    ],
    pengguna: [
      { key: 'full_name', label: 'Nama Lengkap' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'role', label: 'Role (user/admin)' }
    ],
    kontak: [
      { key: 'name', label: 'Nama' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Subjek' },
      { key: 'message', label: 'Pesan', textarea: true }
    ],
    newsletter: [{ key: 'email', label: 'Email', required: true }]
  }

const COLUMNS: Partial<Record<Tab, { key: string; label: string }[]>> = {
  paket: [
    { key: 'name', label: 'Nama' },
    { key: 'location', label: 'Lokasi' },
    { key: 'price_per_person', label: 'Harga' },
    { key: 'rating', label: 'Rating' },
    { key: 'is_featured', label: 'Featured' },
    { key: 'created_at', label: 'Dibuat' }
  ],
  destinasi: [
    { key: 'name', label: 'Nama' },
    { key: 'location', label: 'Lokasi' },
    { key: 'price_per_person', label: 'Harga' },
    { key: 'rating', label: 'Rating' },
    { key: 'is_featured', label: 'Featured' },
    { key: 'created_at', label: 'Dibuat' }
  ],
  blog: [
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori' },
    { key: 'author', label: 'Penulis' },
    { key: 'date', label: 'Tanggal' },
    { key: 'created_at', label: 'Dibuat' }
  ],
  pengguna: [
    { key: 'full_name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'phone', label: 'Telepon' },
    { key: 'created_at', label: 'Bergabung' }
  ],
  kontak: [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subjek' },
    { key: 'created_at', label: 'Tanggal' }
  ],
  newsletter: [
    { key: 'email', label: 'Email' },
    { key: 'created_at', label: 'Tanggal Daftar' }
  ]
}

const fmtDate = (v: unknown) =>
  v ? new Date(String(v)).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
const fmtPrice = (v: unknown) => `Rp ${Number(v ?? 0).toLocaleString('id-ID')}`

function CellValue({ colKey, value, row, tab }: { colKey: string; value: unknown; row?: Row; tab?: Tab }) {
  if (colKey === 'created_at' || colKey === 'date') return <span className="text-gray-400 text-xs">{fmtDate(value)}</span>
  if (colKey === 'price_per_person')
    return <span className="font-semibold text-[#0B2C4D] text-xs whitespace-nowrap">{fmtPrice(value)}</span>
  if (colKey === 'rating') return <span className="text-amber-500 font-semibold text-xs">★ {String(value ?? '-')}</span>
  if (colKey === 'is_featured')
    return value ? <CheckCircle size={15} className="text-green-500" /> : <XCircle size={15} className="text-gray-300" />
  if (colKey === 'role')
    return (
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${value === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
      >
        {String(value ?? 'user').toUpperCase()}
      </span>
    )
  if (colKey === 'full_name' && tab === 'pengguna') {
    const name = String(value ?? '-')
    const initial = name !== '-' ? name[0].toUpperCase() : '?'
    const colors = ['bg-blue-400', 'bg-emerald-400', 'bg-violet-400', 'bg-amber-400', 'bg-pink-400', 'bg-cyan-400']
    const color = colors[(name.charCodeAt(0) ?? 0) % colors.length]
    const isAdmin = row?.role === 'admin'
    return (
      <div className="flex items-center gap-2.5">
        <div
          className={`w-7 h-7 rounded-full ${isAdmin ? 'bg-[#FB8C00]' : color} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
        >
          {initial}
        </div>
        <span className="font-medium text-[#0B2C4D] text-sm">{name}</span>
        {isAdmin && <span className="text-[9px] font-bold bg-[#FB8C00]/15 text-[#FB8C00] px-1.5 py-0.5 rounded">ADMIN</span>}
      </div>
    )
  }
  if (colKey === 'phone') return <span className="text-gray-500 text-xs">{String(value ?? '-')}</span>
  const str = String(value ?? '-')
  return (
    <span className="text-gray-700 text-sm truncate block max-w-[180px]" title={str}>
      {str}
    </span>
  )
}

interface Props {
  tab: Tab
  onDataChange?: () => void
}

export default function CrudTab({ tab, onDataChange }: Props) {
  const [data, setData] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [viewRow, setViewRow] = useState<Row | null>(null)
  const [editRow, setEditRow] = useState<Row | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState<Row>({})
  const [saving, setSaving] = useState(false)

  const tableName = TABLE_MAP[tab] ?? tab
  const cols = COLUMNS[tab] ?? []
  const fields = FIELDS[tab] ?? []
  const isReadOnly = tab === 'kontak' || tab === 'newsletter'
  const hasFeatured = tab === 'paket' || tab === 'destinasi'

  const tabLabel: Partial<Record<Tab, string>> = {
    paket: 'Paket',
    destinasi: 'Destinasi',
    blog: 'Blog',
    pengguna: 'Pengguna',
    kontak: 'Kontak',
    newsletter: 'Newsletter'
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    // Pengguna: fetch semua user tanpa filter
    const query = supabase.from(tableName).select('*')
    // Sort by role (admin first) then created_at
    if (tab === 'pengguna') {
      const { data: result } = await query.order('role', { ascending: true }).order('created_at', { ascending: true })
      setData((result ?? []) as Row[])
    } else {
      const { data: result } = await query.order('created_at', { ascending: false })
      setData((result ?? []) as Row[])
    }
    setLoading(false)
  }, [tableName, tab])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])

  const filtered = data.filter(
    (row) =>
      search === '' ||
      Object.values(row).some((v) =>
        String(v ?? '')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  )

  const handleToggleFeatured = async (row: Row) => {
    await supabase.from(tableName).update({ is_featured: !row.is_featured }).eq('id', String(row.id))
    fetchData()
    onDataChange?.()
  }

  const handleDelete = async (row: Row) => {
    if (!confirm('Hapus data ini?')) return
    await supabase.from(tableName).delete().eq('id', String(row.id))
    fetchData()
    onDataChange?.()
  }

  const handleSave = async () => {
    setSaving(true)
    if (editRow) {
      const payload: Row = {}
      fields.forEach((f) => {
        if (form[f.key] !== undefined) payload[f.key] = f.type === 'number' ? Number(form[f.key]) : form[f.key]
      })
      await supabase.from(tableName).update(payload).eq('id', String(editRow.id))
    } else {
      const payload: Row = {}
      fields.forEach((f) => {
        if (form[f.key] !== undefined && form[f.key] !== '')
          payload[f.key] = f.type === 'number' ? Number(form[f.key]) : form[f.key]
      })
      await supabase.from(tableName).insert([payload])
    }
    setSaving(false)
    setEditRow(null)
    setAddOpen(false)
    setForm({})
    fetchData()
    onDataChange?.()
  }

  const openEdit = (row: Row) => {
    setEditRow(row)
    setForm({ ...row })
    setAddOpen(false)
  }
  const openAdd = () => {
    setEditRow(null)
    setForm({})
    setAddOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col sm:flex-row flex-wrap gap-2 items-start sm:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Cari ${tabLabel[tab] ?? tab}...`}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2C4D]/20 bg-gray-50"
          />
        </div>
        <button
          onClick={fetchData}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition shrink-0"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
        <span className="text-xs text-gray-400 font-medium shrink-0">{filtered.length} data</span>
        {!isReadOnly && (
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#0B2C4D] hover:bg-[#0d3560] text-white text-sm font-semibold px-4 py-2 rounded-xl transition shrink-0"
          >
            <Plus size={15} />
            Tambah {tabLabel[tab]}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-7 h-7 border-2 border-gray-200 border-t-[#0B2C4D] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">Tidak ada data</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((row) => (
                  <tr key={String(row.id)} className="hover:bg-gray-50/70 transition-colors">
                    {cols.map((c) => (
                      <td key={c.key} className="px-4 py-3">
                        <CellValue colKey={c.key} value={row[c.key]} row={row} tab={tab} />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {hasFeatured && (
                          <button
                            onClick={() => handleToggleFeatured(row)}
                            title="Toggle Featured"
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${row.is_featured ? 'bg-amber-100 text-amber-500 hover:bg-amber-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                          >
                            <Star size={12} fill={row.is_featured ? 'currentColor' : 'none'} />
                          </button>
                        )}
                        <button
                          onClick={() => setViewRow(row)}
                          className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-500 transition"
                        >
                          <Eye size={13} />
                        </button>
                        {!isReadOnly && (
                          <button
                            onClick={() => openEdit(row)}
                            className="w-7 h-7 rounded-lg bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-500 transition"
                          >
                            <Pencil size={13} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(row)}
                          className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewRow && (
        <AdminModal title="Detail Data" onClose={() => setViewRow(null)} size="md">
          <div className="space-y-2">
            {cols.map((c) => (
              <div key={c.key} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400 w-32 shrink-0 pt-0.5">{c.label}</span>
                <span className="text-sm text-[#0B2C4D] font-medium flex-1 break-all">
                  {c.key === 'price_per_person'
                    ? fmtPrice(viewRow[c.key])
                    : c.key === 'created_at'
                      ? fmtDate(viewRow[c.key])
                      : c.key === 'is_featured'
                        ? viewRow[c.key]
                          ? 'Ya'
                          : 'Tidak'
                        : String(viewRow[c.key] ?? '-')}
                </span>
              </div>
            ))}
          </div>
        </AdminModal>
      )}

      {/* Add/Edit Modal */}
      {(addOpen || editRow) && (
        <AdminModal
          title={editRow ? `Edit ${tabLabel[tab]}` : `Tambah ${tabLabel[tab]}`}
          onClose={() => {
            setAddOpen(false)
            setEditRow(null)
            setForm({})
          }}
          size="lg"
        >
          <div className="space-y-3">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>
                {f.textarea ? (
                  <textarea
                    value={String(form[f.key] ?? '')}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    rows={3}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2C4D]/20 bg-gray-50 resize-none"
                  />
                ) : (
                  <input
                    type={f.type ?? 'text'}
                    value={String(form[f.key] ?? '')}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2C4D]/20 bg-gray-50"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setAddOpen(false)
                  setEditRow(null)
                  setForm({})
                }}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#0B2C4D] hover:bg-[#0d3560] text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : editRow ? 'Simpan Perubahan' : 'Tambah'}
              </button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  )
}