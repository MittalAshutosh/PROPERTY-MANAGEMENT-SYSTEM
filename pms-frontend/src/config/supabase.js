import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isPlaceholder = (value = '') => {
  const normalized = String(value).trim().toLowerCase();
  return (
    !normalized ||
    normalized.includes('your-project') ||
    normalized.includes('your-project-ref') ||
    normalized.includes('your-anon-key') ||
    normalized.includes('your_anon_key') ||
    normalized.includes('placeholder')
  );
};

export const HAS_SUPABASE_CONFIG = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !isPlaceholder(supabaseUrl) &&
  !isPlaceholder(supabaseAnonKey)
);
export const SUPABASE_CONFIG_ERROR = 'Supabase environment is missing or using placeholders. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to real values.';

const createMissingConfigError = () => new Error(SUPABASE_CONFIG_ERROR);

const createQueryStub = () => ({
  select() { return this; },
  eq() { return this; },
  abortSignal() { return this; },
  async single() { return { data: null, error: createMissingConfigError() }; },
});

if (!HAS_SUPABASE_CONFIG) {
  console.error(SUPABASE_CONFIG_ERROR);
}

export const supabase = HAS_SUPABASE_CONFIG
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        async getSession() { return { data: { session: null }, error: createMissingConfigError() }; },
        onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; },
        async getUser() { return { data: { user: null }, error: createMissingConfigError() }; },
        async signInWithPassword() { return { data: null, error: createMissingConfigError() }; },
        async signUp() { return { data: null, error: createMissingConfigError() }; },
        async signOut() { return { error: null }; },
      },
      from() { return createQueryStub(); },
    };