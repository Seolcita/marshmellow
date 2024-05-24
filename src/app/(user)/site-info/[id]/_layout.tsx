import { Stack } from 'expo-router';

const SiteInfoDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default SiteInfoDetailLayout;
