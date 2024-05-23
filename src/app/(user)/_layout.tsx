import { Tabs } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import TabBarIcon from '../../components/atomic/TabBarIcon/TabBarIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserLayout = () => {
  const { session } = useAuth();

  console.log('UserLayout- session data', session);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
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
            title: 'Site Info',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name='info-circle' color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default UserLayout;
