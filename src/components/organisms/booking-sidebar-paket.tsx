'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, AlertCircle } from 'lucide-react'

type Props = {
  packageId: string
  pricePerPerson: number
}

const bookingFields = [
  { name: 'full_name', label: 'Nama Lengkap', type: 'text' },
  { name: 'phone', label: 'Nomor Telepon', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'travel_date', label: 'Tanggal Keberangkatan', type: 'date' },
  { name: 'participants', label: 'Jumlah Peserta', type: 'number' }
] as const

export default function BookingSidebar({ packageId, pricePerPerson }: Props) {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', travel_date: '', participants: 1, notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone || !form.email || !form.travel_date) {
      setError('Mohon lengkapi semua kolom yang wajib diisi.')
      return
    }
    setSubmitting(true)
    try {
      const total_price = pricePerPerson * Number(form.participants)
      const { error: supabaseError } = await supabase.from('package_bookings').insert([
        {
          package_id: packageId,
          full_name: form.full_name,
          phone: form.phone,
          email: form.email,
          travel_date: form.travel_date,
          participants: Number(form.participants),
          notes: form.notes,
          total_price,
          status: 'pending'
        }
      ])
      if (supabaseError) throw supabaseError
      setSuccess(true)
      setForm({ full_name: '', phone: '', email: '', travel_date: '', participants: 1, notes: '' })
    } catch {
      setError('Gagal mengirim pemesanan. Silakan coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div id="booking" className="bg-white rounded-2xl shadow-xl overflow-hidden w-full scroll-mt-8">
      <div className="bg-[#0B2C4D] px-6 py-5 text-center">
        <h3 className="text-white text-lg font-semibold">Pesan Tur Ini</h3>
      </div>
      <div className="p-8 space-y-5">
        {success ? (
          <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0B2C4D] mb-1">Pemesanan Berhasil!</h4>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Terima kasih telah mempercayai NusaTrip. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
              </p>
            </div>
            <button onClick={() => setSuccess(false)} className="text-sm text-orange-500 hover:underline font-medium mt-1">
              Buat pemesanan baru →
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            {bookingFields.map(({ name, label, type }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={label}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                min={type === 'number' ? 1 : undefined}
                className="w-full h-[54px] px-5 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-gray-50"
              />
            ))}
            <textarea
              name="notes"
              placeholder="Pesan Tambahan (opsional)"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-4 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-gray-50"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-[54px] mt-2 bg-[#FB8C00] text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-60"
            >
              {submitting ? 'Mengirim...' : 'PESAN SEKARANG'}
            </button>
            <p className="text-xs text-gray-400 text-center">Data Anda aman dan tidak akan dibagikan kepada pihak ketiga.</p>
          </>
        )}
      </div>
    </div>
  )
}