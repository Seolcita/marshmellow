import { router } from 'expo-router';
import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  useDeleteSharedCheckList,
  useUpdateSharedCheckListAssignedItemStatus,
  useUpdateSharedCheckListItemStatus,
} from '../../../api/shared-check-list-item';
import * as S from '../check-list/CheckListItems.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { Invitation, SharedCheckList } from '../../../types';
import { useInvitationWithSharedCheckListId } from '../../../api/invitation';
import ColorMap from '../../../styles/Color';

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

    const invitation = invitations.find(
      (invitation) => invitation.inviteeEmail === assignedUser
    );

    return invitation?.inviteeName;
  };

  const findMyAssignedItems = (assignedUser?: string) => {
    if (!assignedUser) return null;

    const invitation = invitations.find(
      (invitation) => invitation.inviteeEmail === assignedUser
    );

    return invitation?.inviteeName;
  };

  return (
    <>
      {checkList.map((item, idx) => (
        <S.Wrapper key={item.id} $isLastItem={checkList.length === idx + 1}>
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
            {isEditMode &&
              (userEmail === item.assignedTo || !item.isAssigned) && (
                <Pressable
                  onPress={() =>
                    toggleCheckListAssignedItemStatus({
                      itemId: item.id,
                      isAssigned: item.isAssigned,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name={
                      item.isAssigned
                        ? 'hand-front-right'
                        : 'hand-front-right-outline'
                    }
                    size={18}
                    color={ColorMap['blue'].dark}
                    style={{ marginRight: 10 }}
                  />
                </Pressable>
              )}
            {isEditMode && item.isAssigned && (
              <S.AssignedUser>
                {findInviteeName(item.assignedTo)}
              </S.AssignedUser>
            )}
            {!isEditMode &&
              item.isAssigned &&
              item.assignedTo === userEmail && (
                <S.View>
                  <S.AssignedUser>
                    {findMyAssignedItems(item.assignedTo)}
                  </S.AssignedUser>
                </S.View>
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
