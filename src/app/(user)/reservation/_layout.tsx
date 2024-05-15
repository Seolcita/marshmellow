import { Stack } from 'expo-router';

const ReservationLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default ReservationLayout;
