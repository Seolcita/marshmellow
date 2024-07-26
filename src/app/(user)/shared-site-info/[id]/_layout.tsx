import { Stack } from 'expo-router';

const SiteInfoDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Site Info Detail',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
};

export default SiteInfoDetailLayout;
