import { Stack } from 'expo-router';

const ParkPAssLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default ParkPAssLayout;
