import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

interface SupabaseAPI {
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const expoPublicSupabaseUrl =
  Constants.expoConfig?.extra?.expoPublicSupabaseUrl ??
  process.env.EXPO_PUBLIC_SUPABASE_URL;
const expoPublicSupabaseAnonKey =
  Constants?.expoConfig?.extra?.expoPublicSupabaseAnonKey ??
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const previewSupabaseUrl = Constants.expoConfig?.extra?.previewSupabaseUrl;
const previewSupabaseAnonKey =
  Constants?.expoConfig?.extra?.previewSupabaseAnonKey;
const appEnv = Constants.expoConfig?.extra?.appEnv;

function getEnvironment(): SupabaseAPI {
  const env = appEnv || 'development';
  console.log('env🧪', env);

  if (env === 'preview') {
    console.log('Using Preview environment🥎');

    return {
      supabaseUrl: previewSupabaseUrl,
      supabaseAnonKey: previewSupabaseAnonKey,
    };
  } else {
    return {
      supabaseUrl: expoPublicSupabaseUrl,
      supabaseAnonKey: expoPublicSupabaseAnonKey,
    };
  }
}

const supabaseAPI = getEnvironment();

export const supabase = createClient(
  supabaseAPI.supabaseUrl ?? '',
  supabaseAPI.supabaseAnonKey ?? '',
  {
    auth: {
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
