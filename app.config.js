import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    expo: {
      name: 'marshmallow',
      slug: 'marshmallow',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/images/icon.png',
      scheme: 'myapp',
      userInterfaceStyle: 'automatic',
      backgroundColor: '#1849A9',
      splash: {
        image: './assets/images/mm.png',
        resizeMode: 'contain',
        backgroundColor: '#1849A9',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/images/mm_square.png',
          backgroundColor: '#1849A9',
        },
        softwareKeyboardLayoutMode: 'pan',
        package: 'com.seolcita.marshmallow',
      },
      web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/images/favicon.png',
      },
      plugins: ['expo-router', 'expo-secure-store', 'expo-font'],
      experiments: {
        typedRoutes: true,
      },
      extra: {
        router: {
          origin: false,
        },
        eas: {
          projectId: 'b756b1d7-7f07-41a0-b57b-1cbca3f2d569',
        },
        expoPublicSupabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
        expoPublicSupabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
        previewSupabaseUrl: process.env.PREVIEW_SUPABASE_URL,
        previewSupabaseAnonKey: process.env.PREVIEW_SUPABASE_ANON_KEY,
        appEnv: process.env.APP_ENV ?? 'development',
      },
      owner: 'seolcita',
      runtimeVersion: {
        policy: 'appVersion',
      },
      updates: {
        url: 'https://u.expo.dev/b756b1d7-7f07-41a0-b57b-1cbca3f2d569',
      },
    },
  };
};
