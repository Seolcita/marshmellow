import { useEffect, useState } from 'react';
import { Text, View } from '../../Themed';
import Button from '../../atomic/button/Button';
import Modal from '../../atomic/modal/Modal';
import AddCheckListModal from '../../composite/check-list/AddCheckListModal';
import { useCheckList } from '../../../api/check-list';
import { useAuth } from '../../../providers/AuthProvider';
import { Alert, FlatList } from 'react-native';
import { router } from 'expo-router';

const CheckListScreen = () => {
  const [isAddModalOpen, setAddModalIsOpen] = useState(false);
  const [checkList, setCheckList] = useState<string[] | []>([]);

  const { session } = useAuth();
  const userId = session?.user.id ?? '';

  // if (!userId) {
  //   Alert.alert('Session is not valid, please login again');
  //   console.log('User not found');
  //   router.push('/(auth)/sign-in');
  //   return;
  // }

  const { data, error, isLoading } = useCheckList(userId);
  console.log('data', data);

  useEffect(() => {
    if (data && data[0] !== undefined && data[0].items.length > 0) {
      setCheckList([...data[0].items]);
    }
  }, [data]);

  return (
    <View>
      <Text>Check List Screen</Text>

      <Button text='Add' onPress={() => setAddModalIsOpen(!isAddModalOpen)} />

      {/* TODO: Display Check List */}
      {
        <FlatList
          data={checkList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      }
      {/* TODO: Edit button in the Check List */}
      {/* TODO: Delete button in the Check List */}
      <Modal isOpen={isAddModalOpen} setIsOpen={setAddModalIsOpen}>
        <AddCheckListModal setIsOpen={setAddModalIsOpen} />
      </Modal>
    </View>
  );
};

export default CheckListScreen;
