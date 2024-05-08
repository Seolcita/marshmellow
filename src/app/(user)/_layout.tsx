import { Text } from '../../components/Themed';
import { useAuth } from '../../providers/AuthProvider';

const UserLayout = () => {
  const { session } = useAuth();

  return <Text>{session?.user.email ?? 'null'}</Text>;
};

export default UserLayout;
