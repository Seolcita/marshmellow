import { View } from '../../../components/Themed';
import CheckListCard from '../../../components/composite/check-list/CheckListCard';
import ParkPass from '../../../components/composite/park-pass/ParkPass';

const MainScreen = () => {
  return (
    <View>
      <ParkPass />
      <CheckListCard />
    </View>
  );
};

export default MainScreen;
