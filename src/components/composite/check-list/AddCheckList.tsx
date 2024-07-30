import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { CheckList } from '../../../types';
import * as S from './AddCheckList.styles';
import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import CheckListItems from './CheckListItems';
import Button from '../../atomic/button/Button';
import * as s from '../../common-styles/CommonStyles';
import { useAuth } from '../../../providers/AuthProvider';
import { useCheckList, useInsertCheckList } from '../../../api/check-list';
import CheckListItemSkeleton from '../skeleton/check-list/CheckListItemSkeleton';

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
  const [checkList, setCheckList] = useState<CheckList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const {
    error,
    data: checkListInfo,
    isLoading: isCheckListItemLoading,
  } = useCheckList(categoryId);

  useEffect(() => {
    if (checkListInfo) {
      setCheckList(checkListInfo);
    }
    if (!isCheckListItemLoading) {
      setIsLoading(false);
    }
  }, [checkListInfo, checkList]);

  const handleChange = (text: string) => {
    setItem({ name: text, error: '' });
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
            />
            <S.ButtonContainer $error={!!item.error}>
              <Button
                onPress={handleAdd}
                text='Add'
                borderRadius={5}
                bgColor={ColorMap['blue'].dark}
              />
            </S.ButtonContainer>
          </s.Row>
        </S.InputContainer>
      )}

      {checkList && !isLoading ? (
        <CheckListItems
          items={checkList}
          categoryId={categoryId}
          isEditMode={isEditMode}
          isClearCheckList={isClearCheckList}
          setIsClearCheckList={setIsClearCheckList}
        />
      ) : (
        <>
          <CheckListItemSkeleton />
          <CheckListItemSkeleton />
          <CheckListItemSkeleton />
        </>
      )}
    </>
  );
};

export default AddCheckList;
