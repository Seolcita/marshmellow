import { Stack } from 'expo-router';

const SharedCheckListIdLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Shared Check List Details',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default SharedCheckListIdLayout;
