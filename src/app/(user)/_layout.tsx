import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import ColorMap from '../../styles/Color';
import TabBarIcon from '../../components/atomic/TabBarIcon/TabBarIcon';

const UserLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ColorMap['blue'].dark,
        tabBarStyle: { paddingBottom: 4 },
      }}
    >
      <Tabs.Screen
        name='shared-site-info'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='check-list'
        options={{
          title: 'Check List',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
        }}
      />
      <Tabs.Screen
        name='reservation'
        options={{
          title: 'Trips',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='calendar-check-o' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='site-info'
        options={{
          title: 'My Sites',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='info-circle' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='account-circle'
              size={24}
              color='grey'
              style={{ marginBottom: -5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default UserLayout;
