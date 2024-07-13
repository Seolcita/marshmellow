import { Tabs } from 'expo-router';

import ColorMap from '../../styles/Color';
import { useAuth } from '../../providers/AuthProvider';
import TabBarIcon from '../../components/atomic/TabBarIcon/TabBarIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserLayout = () => {
  const { session } = useAuth();

  // const edges = ['left', 'right'];

  // if (headerHeight === 0) edges.push('top');

  console.log('UserLayout- session data', session);
  return (
    // <SafeAreaView
    //   edges={['left', 'right']}
    //   style={{
    //     flex: 1,
    //   }}
    // >
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ColorMap['blue'].dark,
      }}
    >
      <Tabs.Screen
        name='main'
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
        name='shared-site-info'
        options={{
          title: 'Shared info',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='group' color={color} />,
        }}
      />
    </Tabs>
    // </SafeAreaView>
  );
};

export default UserLayout;
