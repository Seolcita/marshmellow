import { useEffect, useState } from 'react';
import * as S from './AddCheckListModal.styles';
import Input from '../../atomic/input/Input';
import { Text, View } from '../../Themed';
import Button from '../../atomic/button/Button';
import { AntDesign } from '@expo/vector-icons';
import {
  useCheckList,
  useInsertCheckList,
  useUpdateCheckList,
} from '../../../api/check-list';
import { useAuth } from '../../../providers/AuthProvider';
import { Alert } from 'react-native';
import { router } from 'expo-router';

interface AddCheckListModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const AddCheckListModal = ({ setIsOpen }: AddCheckListModalProps) => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [existingItems, setExistingItems] = useState<string[]>([]);
  const [error, setError] = useState('');

  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { mutate: insertCheckList } = useInsertCheckList(userId);
  const { mutate: updateCheckList } = useUpdateCheckList(userId);
  const { data, isLoading } = useCheckList(userId);

  useEffect(() => {
    if (data && data[0] !== undefined && data[0].items.length > 0) {
      setExistingItems([...data[0].items]);
    } else {
      setExistingItems([]);
    }
  }, [data]);

  const handleChange = (text: string) => {
    setItem(text);
  };

  const handleAdd = () => {
    if (item === '') {
      setError('Check List Item is required');
      return;
    }

    const newItems = [...items, item];
    setItems(newItems);
    console.log('items🧪', newItems);
    setItem('');
  };

  const handleDelete = (item: string) => {
    console.log('item⭐️', item);
    const newItems = items.filter((i) => i !== item);
    setItems(newItems);
  };

  const handleSave = async () => {
    console.log('save clicekd 🚨', items);
    if (items.length === 0) {
      setError('Check List Item is required');
      return;
    }

    console.log('USER HAS DATA?', existingItems);

    const formattedItems = items.map((checkListItem) => ({
      item: checkListItem,
      isChecked: false,
    }));

    console.log('formattedItems🧪🧪🧪🧪', formattedItems);

    // insertCheckList({ items });

    // if (existingItems.length === 0) {
    //   console.log('INSERT🫠');
    //   setIsOpen(false);
    //   insertCheckList({ items });
    // } else {
    //   console.log('UPDATE🥶');
    //   const currentCheckList = data?.[0].items;
    //   const newCheckList = [...currentCheckList, ...items];
    //   setIsOpen(false);
    //   updateCheckList({ id: data?.[0].id, items: newCheckList });
    // }
  };

  return (
    <S.Content>
      <S.Title>Add Check List</S.Title>
      <S.InputContainer>
        <Input
          label='Check List Item'
          isValid={true}
          textInputConfig={{
            value: item.trim(),
            onChangeText: (text) => {
              handleChange(text);
            },
            placeholder: '',
            keyboardType: 'default',
            autoFocus: true,
          }}
          style={{ flex: 1, marginRight: 10 }}
          error={error}
        />
        <Button onPress={handleAdd} text='Add' borderRadius={10} />
      </S.InputContainer>
      <S.ListContainer>
        {items.map((item) => (
          <S.ListItem key={item} onPress={() => handleDelete(item)}>
            <Text>{item}</Text>
            <AntDesign name='close' size={15} color='black' />
          </S.ListItem>
        ))}
      </S.ListContainer>
      <Button text='Save' borderRadius={10} onPress={handleSave} />
    </S.Content>
  );
};

export default AddCheckListModal;
