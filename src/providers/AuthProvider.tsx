import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../lib/supabase';

type Tokens = {
  access_token: string;
  refresh_token: string;
};

type AuthContextType = {
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  loginWithToken: ({ access_token, refresh_token }: Tokens) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  isLoading: true,
  loginWithToken: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      setSession(session);

      if (error) {
        //TODO: Handle error
        console.error('AuthProvider Error', error);
      }

      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        console.log('data😄', data);

        if (error) {
          //TODO: Handle error
          console.log('fetching data error', error);
        } else {
          setProfile(data);
        }
      }

      setIsLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const loginWithToken = async ({ access_token, refresh_token }: Tokens) => {
    const signIn = async () => {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      const data = await supabase.auth.refreshSession();
      const {
        data: { session: newSession },
      } = data;
      newSession && setSession(newSession);

      return data;
    };

    const {
      data: { user: supabaseUser },
    } = await signIn();

    setProfile(supabaseUser);
  };

  return (
    <AuthContext.Provider
      value={{ session, profile, isLoading, loginWithToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
