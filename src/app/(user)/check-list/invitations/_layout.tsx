import { Stack } from 'expo-router';

const InvitationsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default InvitationsLayout;
