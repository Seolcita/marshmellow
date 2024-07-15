import { router } from 'expo-router';
import { Text, View } from '../../Themed';
import { Pressable } from 'react-native';

interface SharedSiteInfoDetailProps {
  id: string;
}

const SharedCheckListListsScreen = () => {
  const id = '1234'; //temp
  return (
    <>
      {/* // TODO: Add Create Shared Check List Button */}
      <Pressable
        onPress={() => router.push(`/(user)/check-list/shared/create`)}
      >
        <Text>Create Shared Check List</Text>
      </Pressable>
      <Pressable onPress={() => router.push(`/(user)/check-list/shared/${id}`)}>
        <Text>Shared Check List - {id}</Text>
      </Pressable>
    </>
  );
};

export default SharedCheckListListsScreen;
