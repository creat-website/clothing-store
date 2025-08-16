import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined

let supabase: SupabaseClient

if (typeof supabaseUrl !== 'string' || typeof supabaseKey !== 'string' || !supabaseUrl || !supabaseKey) {
  if (typeof console !== 'undefined') {
    console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set. Using safe no-op client. Add them in Vercel Project Settings → Environment Variables.')
  }
  // Safe no-op client: returns defaults and logs instead of throwing, to avoid runtime crashes in UI
  const noOp = async (..._args: any[]) => ({ data: null, error: new Error('Supabase not configured') })

  supabase = {
    auth: {
      async getUser() {
        return { data: { user: null }, error: null }
      },
      async signInWithPassword() {
        if (typeof console !== 'undefined') console.warn('[Supabase] signInWithPassword called without configuration')
        return noOp()
      },
      async signUp() {
        if (typeof console !== 'undefined') console.warn('[Supabase] signUp called without configuration')
        return noOp()
      },
      async resend() {
        if (typeof console !== 'undefined') console.warn('[Supabase] resend called without configuration')
        return noOp()
      },
      async signOut() {
        if (typeof console !== 'undefined') console.warn('[Supabase] signOut called without configuration')
        return { error: null }
      },
      onAuthStateChange(_callback: any) {
        if (typeof console !== 'undefined') console.warn('[Supabase] onAuthStateChange used without configuration')
        return { data: { subscription: { unsubscribe() { /* no-op */ } } } }
      },
    },
    from(_table: string) {
      if (typeof console !== 'undefined') console.warn('[Supabase] from().insert() used without configuration')
      return {
        async insert() {
          return { data: null, error: new Error('Supabase not configured') }
        },
      }
    },
  } as unknown as SupabaseClient
} else {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
