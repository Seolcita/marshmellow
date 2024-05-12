import { Stack, Tabs } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';
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
      </Tabs>
    </SafeAreaView>
  );
};

export default UserLayout;
