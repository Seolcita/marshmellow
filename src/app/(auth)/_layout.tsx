import React from 'react';
import * as Linking from 'expo-linking';
import { Redirect, Stack } from 'expo-router';
import * as QueryParams from 'expo-auth-session/build/QueryParams';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';

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

  if (session) {
    return <Redirect href='/(user)/shared-site-info' />;
  }

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

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
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name='reset-password'
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name='magic-link-login'
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
    </Stack>
  );
}
