import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qnfifsaavgsyutxaoymd.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZmlmc2FhdmdzeXV0eGFveW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjY3NTMsImV4cCI6MjA3MDg0Mjc1M30.Tco7Pbbz3iRNNKG3WmPbc65P-Ze95U20ttem8ADhejA'

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Please add them to .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
