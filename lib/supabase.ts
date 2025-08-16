import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined

let supabase: SupabaseClient

if (typeof supabaseUrl !== 'string' || typeof supabaseKey !== 'string' || !supabaseUrl || !supabaseKey) {
  if (typeof console !== 'undefined') {
    console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set. Add them to .env.local')
  }
  // Create a typed placeholder that throws on use, but satisfies TypeScript
  const thrower = () => {
    throw new Error('Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  supabase = {
    auth: {
      signInWithPassword: thrower as any,
      signUp: thrower as any,
      resend: thrower as any,
      signOut: thrower as any,
      getUser: thrower as any,
    },
  } as unknown as SupabaseClient
} else {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
