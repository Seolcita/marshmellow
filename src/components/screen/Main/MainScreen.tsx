import { Alert } from 'react-native';
import { View } from '../../../components/Themed';
import CheckListCard from '../../../components/composite/check-list/CheckListCard';
import ParkPass from '../../../components/composite/park-pass/ParkPass';
import { useAuth } from '../../../providers/AuthProvider';
import { router } from 'expo-router';

const MainScreen = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  return (
    <View>
      <ParkPass />
      <CheckListCard />
    </View>
  );
};

export default MainScreen;
