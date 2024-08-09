import { useState } from 'react';

import { Invitation } from '../../../types';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from './PendingInvitationTile.styles';
import ResponseInvitationModal from './ResponseInvitationModal';

interface PendingInvitationTileProps {
  invitation: Invitation;
  userId: string;
}

const PendingInvitationTile = ({
  invitation,
  userId,
}: PendingInvitationTileProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <S.PendingInvitationTile>
        <S.Title>{invitation.sharedCheckListName}</S.Title>
        <Button
          text='Response'
          onPress={handleModal}
          paddingHorizontal={16}
          paddingVertical={8}
          textSize={14}
          borderRadius={5}
          bgColor={ColorMap['green'].dark}
        />
      </S.PendingInvitationTile>
      {isModalOpen && invitation.id && (
        <ResponseInvitationModal
          id={invitation.id}
          name={invitation.sharedCheckListName}
          sharedCheckListId={invitation.sharedCheckListId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userId={userId}
        />
      )}
    </>
  );
};

export default PendingInvitationTile;
