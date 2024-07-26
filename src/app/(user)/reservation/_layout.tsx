import { Stack } from 'expo-router';

const ReservationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          title: 'Camping Trips',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default ReservationLayout;
