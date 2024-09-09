import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { makeRedirectUri } from 'expo-auth-session';
import { useAuth } from '../../providers/AuthProvider';
import * as Linking from 'expo-linking';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { supabase } from '../../lib/supabase';

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  const redirectTo = makeRedirectUri();
  console.log('REDIRECT TO👀', redirectTo);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  console.log('SESSION🥹', data.session);
  return data.session;
};

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/(user)/shared-site-info'} />;
  }

  const url = Linking.useURL();
  console.log('url👀', url);
  if (url) {
    createSessionFromUrl(url);
  }

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).then((session) => {
        if (session) {
          if (url.includes('reset-password')) {
            return <Redirect href={'/(auth)/request-reset-password'} />;
          }
        }
      });
    }
  }, [url]);

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
    </Stack>
  );
}
