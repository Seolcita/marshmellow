import { Stack } from 'expo-router';

const MainCheckListLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='mine' options={{ headerShown: true }} />
      <Stack.Screen name='shared' options={{ headerShown: true }} />
    </Stack>
  );
};

export default MainCheckListLayout;
