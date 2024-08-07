import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import QueryProvider from '../providers/QueryProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { useColorScheme } from '@/src/components/useColorScheme';
import { InvitationProvider } from '../providers/InvitationProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Ignore some common warnings that are not relevant to the app. Current SDK is SDK 51.
  const IGNORED_LOGS = [
    'Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.',
  ];
  LogBox.ignoreLogs(IGNORED_LOGS);

  // TODO: Currently custom font is not working. Need to fix this.
  const [loaded, error] = useFonts({
    // SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <InvitationProvider>
          <QueryProvider>
            <Stack>
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
              <Stack.Screen name='(user)' options={{ headerShown: false }} />
              <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
            </Stack>
          </QueryProvider>
        </InvitationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
