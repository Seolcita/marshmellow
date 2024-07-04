import * as Linking from 'expo-linking';
import { useAuth } from '../providers/AuthProvider';

global.Buffer = global.Buffer || require('buffer').Buffer;

const { loginWithToken } = useAuth();

const parseSupabaseUrl = (url: string) => {
  let parsedUrl = url;
  if (url.includes('#')) {
    parsedUrl = url.replace('#', '?');
  }

  return parsedUrl;
};

const subscribe = (listener: (url: string) => void) => {
  const onReceiveURL = ({ url }: { url: string }) => {
    const transformedUrl = parseSupabaseUrl(url);
    const parsedUrl = Linking.parse(transformedUrl);

    const access_token = parsedUrl.queryParams?.access_token;
    const refresh_token = parsedUrl.queryParams?.refresh_token;

    if (typeof access_token === 'string' && typeof refresh_token === 'string') {
      void loginWithToken({ access_token, refresh_token });
    }

    // Call the listener to let React Navigation handle the URL
    listener(transformedUrl);
  };

  const subscription = Linking.addEventListener('url', onReceiveURL);

  // Cleanup
  return () => {
    subscription.remove();
  };
};
