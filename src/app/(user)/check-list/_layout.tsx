import { Stack } from 'expo-router';

const MainCheckListLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          title: 'Check List',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='mine'
        options={{
          headerShown: true,
          title: 'My Check List',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='shared'
        options={{
          headerShown: false,
          title: 'Shared Check List',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='invitations'
        options={{
          headerShown: true,
          title: 'Invitations',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='park-pass'
        options={{
          headerShown: true,
          title: 'Park Passes',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default MainCheckListLayout;
