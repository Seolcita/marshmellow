import { Stack } from 'expo-router';
import { Text } from '../../components/Themed';
import { useAuth } from '../../providers/AuthProvider';

const UserLayout = () => {
  const { session } = useAuth();

  console.log('UserLayout- session data', session);
  return <Stack />;
};

export default UserLayout;
