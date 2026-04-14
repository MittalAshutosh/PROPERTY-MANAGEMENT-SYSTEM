import { createContext, useContext, useEffect, useState } from 'react';
import { HAS_SUPABASE_CONFIG, supabase } from '../config/supabase';

const AuthContext = createContext({});
const DEMO_SESSION_KEY = 'pms_demo_session';
const DEMO_EMAIL = 'admin@test123.com';
const DEMO_PASSWORD = '123456789';

const createDemoSession = (email) => ({
  user: {
    id: 'demo-admin-user',
    email,
    user_metadata: {
      full_name: 'Demo Admin',
    },
  },
  profile: {
    id: 'demo-admin-user',
    role: 'admin',
    full_name: 'Demo Admin',
  },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!HAS_SUPABASE_CONFIG) {
      try {
        const raw = localStorage.getItem(DEMO_SESSION_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.user && parsed?.profile && isMounted) {
            setUser(parsed.user);
            setProfile(parsed.profile);
          }
        }
      } catch (e) {
        console.error('Error restoring demo session:', e);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }

      return () => {
        isMounted = false;
      };
    }

    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
        }
        if (!isMounted) return;
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timeout = setTimeout(() => {
      if (isMounted && loading) {
        setLoading(false);
      }
    }, 5000);

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single().abortSignal(controller.signal);
      clearTimeout(timeoutId);
      if (error) {
        const { data: { user } } = await supabase.auth.getUser();
        const email = user?.email || '';
        let role = 'tenant';
        if (email.includes('admin')) role = 'admin';
        else if (email.includes('manager')) role = 'manager';
        else if (email.includes('maintenance')) role = 'maintenance';
        setProfile({ id: userId, role, full_name: user?.user_metadata?.full_name || email });
        return;
      }
      setProfile(data);
    } catch (error) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const email = user?.email || '';
        let role = 'tenant';
        if (email.includes('admin')) role = 'admin';
        else if (email.includes('manager')) role = 'manager';
        else if (email.includes('maintenance')) role = 'maintenance';
        setProfile({ id: userId, role, full_name: email });
      } catch (e) {
        setProfile({ id: userId, role: 'admin' });
      }
    }
  };

  const signIn = async (email, password) => {
    if (!HAS_SUPABASE_CONFIG) {
      const normalizedEmail = (email || '').trim().toLowerCase();
      if (normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
        const demoSession = createDemoSession(normalizedEmail);
        setUser(demoSession.user);
        setProfile(demoSession.profile);
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoSession));
        return { user: demoSession.user, session: { user: demoSession.user } };
      }
      throw new Error('Invalid credentials for demo mode. Use admin@test123.com / 123456789');
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, fullName, phone) => {
    if (!HAS_SUPABASE_CONFIG) {
      throw new Error('Sign up is disabled in demo mode. Configure Supabase to enable registration.');
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    try {
      setUser(null);
      setProfile(null);
      localStorage.removeItem(DEMO_SESSION_KEY);
      if (!HAS_SUPABASE_CONFIG) {
        return;
      }
      const signOutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('SignOut timeout')), 3000));
      await Promise.race([signOutPromise, timeoutPromise]);
    } catch (error) {
      setUser(null);
      setProfile(null);
    }
  };

  const value = { user, profile, loading, signIn, signUp, signOut, isAdmin: profile?.role === 'admin', isManager: profile?.role === 'manager', isTenant: profile?.role === 'tenant', isMaintenance: profile?.role === 'maintenance', hasRole: (roles) => roles.includes(profile?.role) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
