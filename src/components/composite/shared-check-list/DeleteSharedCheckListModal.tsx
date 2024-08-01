import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from '../reservation/ReservationDetail.styles';
import { useDeleteMySharedCheckList } from '../../../api/my-shared-check-list';

interface DeleteSharedCheckListModalProps {
  userId: string;
  sharedCheckListName: string;
  sharedCheckListId: number;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const DeleteSharedCheckListModal = ({
  userId,
  sharedCheckListName,
  sharedCheckListId,
  isModalOpen,
  setIsModalOpen,
}: DeleteSharedCheckListModalProps) => {
  const { mutate: deleteMySharedCheckList } =
    useDeleteMySharedCheckList(userId);

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <S.ModalTitle>Delete Shared Check List</S.ModalTitle>
      <S.MessageContainer>
        <S.ConfirmMessage color={ColorMap['red'].main}>
          {`Are you sure that you want to delete '${sharedCheckListName}' shared check list?`}
        </S.ConfirmMessage>
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
            onPress={() => deleteMySharedCheckList(sharedCheckListId)}
            text='Delete'
            borderRadius={5}
            bgColor={ColorMap['red'].dark}
          />
        </View>
      </S.ModalButtonContainer>
    </Modal>
  );
};

export default DeleteSharedCheckListModal;
