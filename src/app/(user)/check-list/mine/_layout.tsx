import { Stack } from 'expo-router';

const MyCheckListLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default MyCheckListLayout;
