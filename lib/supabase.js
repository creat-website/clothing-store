import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase
if (!supabaseUrl || !supabaseKey) {
  // Avoid crashing during build if env vars are missing. Provide a safe mock that throws on use.
  if (typeof console !== 'undefined') {
    console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set. Add them to .env.local')
  }
  supabase = {
    auth: {
      async signInWithPassword() {
        if (typeof console !== 'undefined') console.warn('[Supabase] signInWithPassword called without configuration')
        return { data: null, error: new Error('Supabase not configured') }
      },
      async signUp() {
        if (typeof console !== 'undefined') console.warn('[Supabase] signUp called without configuration')
        return { data: null, error: new Error('Supabase not configured') }
      },
      async resend() {
        if (typeof console !== 'undefined') console.warn('[Supabase] resend called without configuration')
        return { data: null, error: new Error('Supabase not configured') }
      },
      async signOut() {
        if (typeof console !== 'undefined') console.warn('[Supabase] signOut called without configuration')
        return { error: null }
      },
      async getUser() {
        if (typeof console !== 'undefined') console.warn('[Supabase] getUser called without configuration')
        return { data: { user: null }, error: null }
      },
      onAuthStateChange(_callback) {
        if (typeof console !== 'undefined') {
          console.warn('[Supabase] onAuthStateChange used without configuration')
        }
        return { data: { subscription: { unsubscribe() { /* no-op */ } } } }
      },
    },
    from(_table) {
      if (typeof console !== 'undefined') console.warn('[Supabase] from().insert() used without configuration')
      return {
        async insert() {
          return { data: null, error: new Error('Supabase not configured') }
        },
      }
    },
  }
} else {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
