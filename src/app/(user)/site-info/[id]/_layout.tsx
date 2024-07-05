import { Stack } from 'expo-router';

const SharedSiteInfoDetailLayout = () => {
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

export default SharedSiteInfoDetailLayout;
