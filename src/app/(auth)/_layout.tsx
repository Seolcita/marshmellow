import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';

export default function AuthLayout() {
  const { session } = useAuth();

  // if (session) {
  //   return <Redirect href={'/(user)/main'} />;
  // }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
