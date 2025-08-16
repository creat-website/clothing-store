import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Please add them to .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
