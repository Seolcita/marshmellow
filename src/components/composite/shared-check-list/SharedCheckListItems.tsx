import { router } from 'expo-router';
import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable } from 'react-native';
import { Text, View } from '../../Themed';
import { FontAwesome6 } from '@expo/vector-icons';

import {
  useDeleteSharedCheckList,
  useUpdateSharedCheckListAssignedItemStatus,
  useUpdateSharedCheckListItemStatus,
} from '../../../api/shared-check-list-item';
import * as S from '../check-list/CheckListItems.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { Invitation, SharedCheckList } from '../../../types';
import { useInvitationWithSharedCheckListId } from '../../../api/invitation';
import { useMySharedCheckListForAdmin } from '../../../api/my-shared-check-list';

interface SharedCheckListItemsProps {
  items: SharedCheckList[];
  categoryId: string;
  isEditMode: boolean;
  isClearCheckList: boolean;
  setIsClearCheckList: (isClearCheckList: boolean) => void;
  sharedCheckListId: number;
}

const SharedCheckListItems = ({
  items,
  isEditMode,
  categoryId,
  isClearCheckList,
  setIsClearCheckList,
  sharedCheckListId,
}: SharedCheckListItemsProps) => {
  const { session } = useAuth();
  const userEmail = session?.user.email;
  const userId = session?.user.id;

  if (!userEmail || !userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [checkList, setCheckList] = useState<SharedCheckList[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const { mutate: deleteSharedCheckListItem } = useDeleteSharedCheckList();
  const { mutate: updateSharedCheckListItemStatus } =
    useUpdateSharedCheckListItemStatus();
  const { mutate: updateSharedCheckListAssignedItemStatus } =
    useUpdateSharedCheckListAssignedItemStatus();
  const { data: invitationsInfo, error: inviationError } =
    useInvitationWithSharedCheckListId(sharedCheckListId);

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

  useEffect(() => {
    if (invitationsInfo) {
      setInvitations(invitationsInfo);
    }
  }, [invitations]);

  const toggleCheckListItemStatus = ({
    itemId,
    isChecked,
  }: {
    itemId: string;
    isChecked: boolean;
  }) => {
    const newIsChecked = !isChecked;
    setCheckedItems((prev) => ({ ...prev, [itemId]: newIsChecked }));
    updateSharedCheckListItemStatus({ id: itemId, isChecked: !isChecked });
  };

  const toggleCheckListAssignedItemStatus = ({
    itemId,
    isAssigned,
  }: {
    itemId: string;
    isAssigned: boolean;
  }) => {
    const newIsAssigned = !isAssigned;
    updateSharedCheckListAssignedItemStatus({
      id: itemId,
      isAssigned: newIsAssigned,
      assignedTo: newIsAssigned ? userEmail : null,
    });
  };

  const handleDelete = (itemId: string) => {
    deleteSharedCheckListItem({ id: itemId });
  };

  const findInviteeName = (assignedUser?: string) => {
    if (!assignedUser) return null;

    console.log('assignedUser🐶', assignedUser);
    const invitation = invitations.find(
      (invitation) => invitation.inviteeEmail === assignedUser
    );

    return invitation?.inviteeName;
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

            {/* Hand Icon & Assigend User UI update */}
            {(userEmail === item.assignedTo || !item.isAssigned) && (
              <Pressable
                onPress={() =>
                  toggleCheckListAssignedItemStatus({
                    itemId: item.id,
                    isAssigned: item.isAssigned,
                  })
                }
              >
                <FontAwesome6 name='hand' size={18} color='black' />
              </Pressable>
            )}
            {item.isAssigned && (
              <View>
                <Text> {findInviteeName(item.assignedTo)}</Text>
              </View>
            )}
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

export default SharedCheckListItems;
