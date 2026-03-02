// src/app/paket-wisata/page.tsx
import { supabase } from '@/lib/supabase'
import PackagesSection from '@/components/organisms/package-section'

export default async function PaketWisataPage() {
  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false })

  return <PackagesSection packages={packages ?? []} />
}