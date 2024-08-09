import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
