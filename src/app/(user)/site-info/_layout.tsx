import { Stack } from 'expo-router';

const SiteInfoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default SiteInfoLayout;
