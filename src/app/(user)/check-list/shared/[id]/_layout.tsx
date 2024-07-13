import { Stack } from 'expo-router';

const SharedCheckListIdLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SharedCheckListIdLayout;
