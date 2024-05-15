import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import {
  useDeleteCheckList,
  useUpdateCheckListItemStatus,
} from '../../../api/check-list';
import { CheckList } from '../../../types';
import * as S from './CheckListItems.styles';
import * as s from '../../common-styles/CommonStyles';

interface CheckListItemsProps {
  items: CheckList[];
  categoryId: string;
  isEditMode: boolean;
  isClearCheckList: boolean;
  setIsClearCheckList: (isClearCheckList: boolean) => void;
}

const CheckListItems = ({
  items,
  isEditMode,
  categoryId,
  isClearCheckList,
  setIsClearCheckList,
}: CheckListItemsProps) => {
  const [checkList, setCheckList] = useState<CheckList[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { mutate: deleteCheckListItem } = useDeleteCheckList();
  const { mutate: updateCheckListItemStatus } = useUpdateCheckListItemStatus();

  useEffect(() => {
    if (items) {
      setCheckList(items);
    }
  }, [items]);

  useEffect(() => {
    if (isClearCheckList) {
      const clearCheckList = items.reduce(
        (acc, item) => ({ ...acc, [item.id]: false }),
        {}
      );
      setCheckedItems(clearCheckList);
      setIsClearCheckList(false);
    }
  }, [isClearCheckList, items]);

  const toggleCheckListItemStatus = ({
    itemId,
    isChecked,
  }: {
    itemId: string;
    isChecked: boolean;
  }) => {
    const newIsChecked = !isChecked;
    setCheckedItems((prev) => ({ ...prev, [itemId]: newIsChecked }));
    updateCheckListItemStatus({ id: itemId, isChecked: !isChecked });
  };

  const handleDelete = (itemId: string) => {
    deleteCheckListItem({ id: itemId });
  };

  return (
    <>
      {checkList.map((item) => (
        <S.Wrapper key={item.id}>
          <S.CheckBoxContainer>
            <CheckBox
              checked={checkedItems[item.id] ?? item.checked}
              onPress={() =>
                toggleCheckListItemStatus({
                  itemId: item.id,
                  isChecked: item.checked,
                })
              }
              containerStyle={{ padding: 2, backgroundColor: 'transparent' }}
            />
            <S.Label>{item.name}</S.Label>
          </S.CheckBoxContainer>
          {isEditMode && (
            <S.DeleteButton onPress={() => handleDelete(item.id)}>
              <Feather name='x' size={24} color='black' />
            </S.DeleteButton>
          )}
        </S.Wrapper>
      ))}
    </>
  );
};

export default CheckListItems;
