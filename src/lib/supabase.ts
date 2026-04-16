import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Tambahkan pengecekan ini untuk debug
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("WADUH: API Key Supabase gak kebaca!")
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)