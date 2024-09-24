import { useState } from 'react';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as S from './InvitationStatusItem.styles';
import ColorMap, { Colors } from '../../../styles/Color';
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
      {invitation.status === InvitationStatus.PENDING && (
        <Pressable onPress={() => handleDelete(invitation)}>
          <MaterialIcons
            name='cancel-schedule-send'
            size={24}
            color={ColorMap['yellow'].main}
          />
        </Pressable>
      )}

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
