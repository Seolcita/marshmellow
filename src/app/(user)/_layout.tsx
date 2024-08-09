import { Tabs } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ColorMap from '../../styles/Color';

const UserLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ColorMap['blue'].dark,
        tabBarStyle: {
          paddingBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name='shared-site-info'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name='tents'
              size={20}
              color={color}
              style={{
                marginBottom: -5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='check-list'
        options={{
          title: 'Check List',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='checklist'
              size={20}
              color={color}
              style={{ marginBottom: -5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='reservation'
        options={{
          title: 'Trips',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='hiking'
              size={20}
              color={color}
              style={{ marginBottom: -5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='site-info'
        options={{
          title: 'My Sites',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Fontisto
              name='tent'
              size={20}
              color={color}
              style={{ marginBottom: -5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default UserLayout;
