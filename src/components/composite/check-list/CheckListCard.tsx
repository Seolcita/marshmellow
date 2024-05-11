import { Pressable } from 'react-native';
import { Text, View } from '../../Themed';
import { router } from 'expo-router';

const CheckListCard = () => {
  const handlePress = () => {
    router.push('/(user)/check-list');
  };
  return (
    <View>
      <Pressable onPress={handlePress}>
        <Text>Go Check List</Text>
      </Pressable>
    </View>
  );
};

export default CheckListCard;
