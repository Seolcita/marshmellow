import { router } from 'expo-router';
import { Text, View } from '../../Themed';
import { Pressable } from 'react-native';

interface SharedSiteInfoDetailProps {
  id: string;
}

const SharedCheckListListsScreen = () => {
  const id = '1234'; //temp
  return (
    <Pressable onPress={() => router.push(`/(user)/check-list/shared/${id}`)}>
      <Text>Shared Check List - {id}</Text>
    </Pressable>
  );
};

export default SharedCheckListListsScreen;
