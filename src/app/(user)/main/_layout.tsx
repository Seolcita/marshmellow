import { Stack } from 'expo-router';

const MainLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default MainLayout;
