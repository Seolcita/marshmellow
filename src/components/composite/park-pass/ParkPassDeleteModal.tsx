import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import { useDeleteParkPass } from '../../../api/park-pass';
import * as S from '../reservation/ReservationDetail.styles';

interface ParkPassDeleteModalProps {
  id: string;
  userId: string;
  name: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const ParkPassDeleteModal = ({
  id,
  userId,
  name,
  isModalOpen,
  setIsModalOpen,
}: ParkPassDeleteModalProps) => {
  const { mutate: deleteParkPass } = useDeleteParkPass(userId);

  const handleDelete = (id: string) => {
    deleteParkPass(id);
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <S.ModalTitle>Delete Park Pass</S.ModalTitle>
      <S.MessageContainer>
        <S.ConfirmMessage
          color={ColorMap['black'].main}
        >{`Are you sure that you want to delete ${name} Park Pass?`}</S.ConfirmMessage>
      </S.MessageContainer>
      <S.ModalButtonContainer>
        <View style={{ width: '49%' }}>
          <Button
            onPress={() => setIsModalOpen(false)}
            text='Cancel'
            borderRadius={5}
            bgColor={ColorMap['grey'].main}
          />
        </View>
        <View style={{ width: '49%' }}>
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
