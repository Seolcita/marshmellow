import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { View } from '../../Themed';
import * as S from './AddCheckList.styles';
import Input from '../../atomic/input/Input';
import CheckListItems from './CheckListItems';
import Button from '../../atomic/button/Button';
import * as s from '../../common-styles/CommonStyles';
import { useAuth } from '../../../providers/AuthProvider';
import { useCheckList, useInsertCheckList } from '../../../api/check-list';

interface AddCheckListProps {
  categoryId: string;
  isInputVisible?: boolean;
  isEditMode: boolean;
  isClearCheckList: boolean;
  setIsClearCheckList: (isClearCheckList: boolean) => void;
}

const AddCheckList = ({
  categoryId,
  isInputVisible,
  isEditMode,
  isClearCheckList,
  setIsClearCheckList,
}: AddCheckListProps) => {
  const [item, setItem] = useState({
    name: '',
    error: '',
  });

  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { mutate: insertCheckListItem } = useInsertCheckList({
    userId,
    categoryId,
  });

  const { error, data: checkList } = useCheckList(categoryId);

  const handleChange = (text: string) => {
    setItem({ name: text, error: '' });
    console.log(item.name);
  };

  const handleAdd = () => {
    console.log('ADD CLICKED');
    if (item.name === '') {
      setItem({ ...item, error: 'Check List Item is required' });
      return;
    }

    insertCheckListItem({ name: item.name, categoryId });
    setItem({ name: '', error: '' });
  };

  return (
    <View>
      {isInputVisible && (
        <S.InputContainer>
          <s.Row>
            <Input
              label=''
              isValid={true}
              textInputConfig={{
                value: item.name.trim(),
                onChangeText: (text) => {
                  handleChange(text);
                },
                placeholder: '',
                keyboardType: 'default',
                autoFocus: true,
              }}
              style={{ flex: 1, marginRight: 10 }}
              error={item.error}
            />
            <Button onPress={handleAdd} text='Add' borderRadius={10} />
          </s.Row>
        </S.InputContainer>
      )}

      {checkList && (
        <CheckListItems
          items={checkList}
          categoryId={categoryId}
          isEditMode={isEditMode}
          isClearCheckList={isClearCheckList}
          setIsClearCheckList={setIsClearCheckList}
        />
      )}
    </View>
  );
};

export default AddCheckList;
