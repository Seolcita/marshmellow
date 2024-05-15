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
}

const CheckListItems = ({ items, categoryId }: CheckListItemsProps) => {
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

  const toggleCheckListItemStatus = ({
    itemId,
    isChecked,
  }: {
    itemId: string;
    isChecked: boolean;
  }) => {
    const newIsChecked = !isChecked;
    setCheckedItems({ ...checkedItems, [itemId]: newIsChecked });
    updateCheckListItemStatus({ id: itemId, isChecked: !isChecked });
  };

  const handleDelete = (itemId: string) => {
    deleteCheckListItem({ id: itemId });
  };

  return (
    <>
      {checkList.map((item) => (
        <s.Row key={item.id}>
          <S.CheckBoxContainer>
            <CheckBox
              checked={checkedItems[item.id] ?? item.checked}
              onPress={() =>
                toggleCheckListItemStatus({
                  itemId: item.id,
                  isChecked: item.checked,
                })
              }
              size={25}
            />
            <S.Label>{item.name}</S.Label>
          </S.CheckBoxContainer>
          <S.DeleteButton onPress={() => handleDelete(item.id)}>
            <Feather name='x' size={24} color='black' />
          </S.DeleteButton>
        </s.Row>
      ))}
    </>
  );
};

export default CheckListItems;
