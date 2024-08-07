import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import { InvitationStatus } from '../../../types';
import * as S from '../reservation/ReservationDetail.styles';
import { useUpdateInvitation } from '../../../api/invitation';
import { router } from 'expo-router';

interface ResponseInvitationModalProps {
  id: number;
  name: string;
  isModalOpen: boolean;
  sharedCheckListId: number;
  setIsModalOpen: (isOpen: boolean) => void;
  userId: string;
}

export const ResponseInvitationModal = ({
  id,
  name,
  userId,
  sharedCheckListId,
  isModalOpen,
  setIsModalOpen,
}: ResponseInvitationModalProps) => {
  const { mutate: updateInvitation } = useUpdateInvitation({
    id,
    userId,
    sharedCheckListId,
  });

  const handleResponse = (status: InvitationStatus) => {
    updateInvitation({
      status,
    });

    if (status === InvitationStatus.ACCEPTED) {
      router.push('/(user)/check-list/shared');
    }
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <S.ModalTitle>Response Invitation</S.ModalTitle>
      <S.MessageContainer>
        <S.ConfirmMessage
          color={ColorMap['black'].main}
        >{`Please response shared check list invitation for '${name}'`}</S.ConfirmMessage>
      </S.MessageContainer>
      <S.ModalButtonContainer>
        <View style={{ width: '49%' }}>
          <Button
            onPress={() => handleResponse(InvitationStatus.REJECTED)}
            text='Reject'
            borderRadius={5}
            bgColor={ColorMap['red'].dark}
          />
        </View>
        <View style={{ width: '49%' }}>
          <Button
            onPress={() => handleResponse(InvitationStatus.ACCEPTED)}
            text='Accept'
            borderRadius={5}
            bgColor={ColorMap['grey'].dark}
          />
        </View>
      </S.ModalButtonContainer>
    </Modal>
  );
};

export default ResponseInvitationModal;
