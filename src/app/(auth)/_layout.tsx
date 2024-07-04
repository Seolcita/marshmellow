import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import ColorMap from '../../styles/Color';
import * as Linking from 'expo-linking';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { supabase } from '../../lib/supabase';

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export default function AuthLayout() {
  const { session } = useAuth();

  const url = Linking.useURL();
  console.log('url👀', url);
  if (url) {
    createSessionFromUrl(url);
    return <Redirect href={'/(auth)/request-reset-password'} />;
  }

  // if (session) {
  //   return <Redirect href={'/(user)/main'} />;
  // }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='sign-in'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='sign-up'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='request-reset-password'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='reset-password'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
