import { Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

const SharedSiteInfoLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          title: 'Shared Sites Info',
          headerTitleAlign: 'center',
          headerLeft: () => <Entypo name='menu' size={24} color='black' />,
        }}
      />
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  );
};

export default SharedSiteInfoLayout;
