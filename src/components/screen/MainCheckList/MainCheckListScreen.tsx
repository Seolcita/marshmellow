import { Link } from 'expo-router';
import { Text, View } from '../../Themed';

export const MainCheckListScreen = () => {
  return (
    <View>
      <Link href='/(user)/check-list/mine'>
        <Text>My Check List</Text>
      </Link>
      <Link href='/(user)/check-list/shared'>
        <Text>Shared Check List</Text>
      </Link>
    </View>
  );
};

export default MainCheckListScreen;
