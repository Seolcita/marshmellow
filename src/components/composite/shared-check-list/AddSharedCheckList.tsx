import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as s from '../../common-styles/CommonStyles';
import { useAuth } from '../../../providers/AuthProvider';
import {
  useInsertSharedCheckListItem,
  useSharedCheckList,
} from '../../../api/shared-check-list-item';
import * as S from '../check-list/AddCheckList.styles';
import SharedCheckListItems from './SharedCheckListItems';

interface AddSharedCheckListProps {
  categoryId: string;
  isInputVisible?: boolean;
  isEditMode: boolean;
  isClearCheckList: boolean;
  setIsClearCheckList: (isClearCheckList: boolean) => void;
  sharedCheckListId: number;
}

const AddSharedCheckList = ({
  categoryId,
  isInputVisible,
  isEditMode,
  isClearCheckList,
  setIsClearCheckList,
  sharedCheckListId,
}: AddSharedCheckListProps) => {
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

  const { mutate: insertSharedCheckListItem } =
    useInsertSharedCheckListItem(categoryId);

  const { error, data: sharedCheckList } = useSharedCheckList(categoryId);

  const handleChange = (text: string) => {
    setItem({ name: text, error: '' });
  };

  const handleAdd = () => {
    if (item.name === '') {
      setItem({ ...item, error: 'Check List Item is required' });
      return;
    }

    insertSharedCheckListItem({
      name: item.name,
      categoryId,
      sharedCheckListId,
    });

    setItem({ name: '', error: '' });
  };

  return (
    <>
      {isInputVisible && isEditMode && (
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
              borderColor={ColorMap['grey'].dark}
            />
            <S.ButtonContainer $error={!!item.error}>
              <Button
                onPress={handleAdd}
                text='Add'
                borderRadius={5}
                bgColor={ColorMap['grey'].dark}
              />
            </S.ButtonContainer>
          </s.Row>
        </S.InputContainer>
      )}

      {sharedCheckList && (
        <SharedCheckListItems
          items={sharedCheckList}
          categoryId={categoryId}
          isEditMode={isEditMode}
          isClearCheckList={isClearCheckList}
          setIsClearCheckList={setIsClearCheckList}
          sharedCheckListId={sharedCheckListId}
        />
      )}
    </>
  );
};

export default AddSharedCheckList;
