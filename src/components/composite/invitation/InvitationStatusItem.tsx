import { useState } from 'react';
import { Pressable } from 'react-native';

import * as S from './InvitationStatusItem.styles';
import ColorMap, { Colors } from '../../../styles/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Invitation, InvitationStatus } from '../../../types';
import { CancelInvitationModal } from './CancelInvitationModal';

interface InvitationStatusItemProps {
  invitation: Invitation;
}

const StatusColorMap: Record<InvitationStatus, Colors> = {
  [InvitationStatus.PENDING]: 'yellow',
  [InvitationStatus.ACCEPTED]: 'blue',
  [InvitationStatus.REJECTED]: 'red',
};

const InvitationStatusItem = ({ invitation }: InvitationStatusItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (invitation: Invitation) => {
    setIsModalOpen(true);
  };

  return (
    <S.InvitationStatusContainer>
      <S.InviteeInfo>
        <S.View>
          <S.Name>{invitation.inviteeName}</S.Name>
          {invitation.status && (
            <S.Status $bgColor={StatusColorMap[invitation.status]}>
              {invitation.status}
            </S.Status>
          )}
        </S.View>

        <S.Email>{invitation.inviteeEmail}</S.Email>
      </S.InviteeInfo>
      <Pressable onPress={() => handleDelete(invitation)}>
        <MaterialCommunityIcons
          name='delete-forever-outline'
          size={24}
          color={ColorMap['red'].main}
        />
      </Pressable>
      {invitation.id && (
        <CancelInvitationModal
          id={invitation.id}
          sharedCheckListId={invitation.sharedCheckListId}
          name={invitation.inviteeName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </S.InvitationStatusContainer>
  );
};

export default InvitationStatusItem;
