import { Text, View } from '../../components/Themed';
import ParkPass from '../../components/composite/park-pass/ParkPass';
import { useAuth } from '../../providers/AuthProvider';

const UserIndex = () => {
  return (
    <View>
      <ParkPass />
    </View>
  );
};

export default UserIndex;
