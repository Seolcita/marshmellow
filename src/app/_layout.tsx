import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  useFonts,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from '@expo-google-fonts/space-mono';

import { useColorScheme } from '@/src/components/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '../providers/AuthProvider';
import QueryProvider from '../providers/QueryProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (fontError) throw fontError;
  // }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded && <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#014d94' }}>
            <Stack>
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
              {/* <Stack.Screen name='(user)' options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name='modal' options={{ presentation: 'modal' }} /> */}
            </Stack>
          </SafeAreaView>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
