import { Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/(user)/shared-site-info/profile')}
            >
              <MaterialIcons name='account-circle' size={24} color='black' />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
      <Stack.Screen
        name='profile'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SharedSiteInfoLayout;
