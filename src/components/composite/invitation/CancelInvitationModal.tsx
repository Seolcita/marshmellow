import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from '../reservation/ReservationDetail.styles';
import { useDeleteInvitation } from '../../../api/invitation';

interface CanCelInvitationModalProps {
  id: number;
  sharedCheckListId: number;
  name: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const CancelInvitationModal = ({
  id,
  sharedCheckListId,
  name,
  isModalOpen,
  setIsModalOpen,
}: CanCelInvitationModalProps) => {
  const { mutate: deleteInvitation } = useDeleteInvitation(sharedCheckListId);

  const handleDelete = (id: number) => {
    deleteInvitation(id);
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <S.ModalTitle>Cancel Invitation</S.ModalTitle>
      <S.MessageContainer>
        <S.ConfirmMessage>{`Are you sure that you want to cancel invitation for ${name}?`}</S.ConfirmMessage>
      </S.MessageContainer>
      <S.ModalButtonContainer>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => setIsModalOpen(false)}
            text='Cancel'
            borderRadius={5}
            bgColor={ColorMap['grey'].main}
          />
        </View>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => handleDelete(id)}
            text='Delete'
            borderRadius={5}
            bgColor={ColorMap['red'].dark}
          />
        </View>
      </S.ModalButtonContainer>
    </Modal>
  );
};
