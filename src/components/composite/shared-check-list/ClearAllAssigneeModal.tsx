import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from '../reservation/ReservationDetail.styles';
import { useClearSharedCheckListAssignees } from '../../../api/shared-check-list-item';

interface ClearAllAssigneeModalProps {
  sharedCheckListid: number;
  isClearAllAssigneeModalOpen: boolean;
  setIsClearAllCheckBoxModalOpen: (isClearAllAssignee: boolean) => void;
}

export const ClearAllAssigneeModal = ({
  sharedCheckListid,
  isClearAllAssigneeModalOpen,
  setIsClearAllCheckBoxModalOpen,
}: ClearAllAssigneeModalProps) => {
  const { mutate: clearCheckListAssignees } =
    useClearSharedCheckListAssignees();

  const handleClearAllAssignee = () => {
    clearCheckListAssignees(sharedCheckListid);
    setIsClearAllCheckBoxModalOpen(false);
  };

  return (
    <Modal
      isOpen={isClearAllAssigneeModalOpen}
      setIsOpen={setIsClearAllCheckBoxModalOpen}
    >
      <S.ModalTitle>Clear All Assignee</S.ModalTitle>
      <S.MessageContainer>
        <S.ConfirmMessage color={ColorMap['black'].main}>
          {'Are you sure that you want to clear all assignee?'}
        </S.ConfirmMessage>
      </S.MessageContainer>
      <S.ModalButtonContainer>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => setIsClearAllCheckBoxModalOpen(false)}
            text='Cancel'
            borderRadius={5}
            bgColor={ColorMap['grey'].main}
          />
        </View>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => handleClearAllAssignee()}
            text='Clear'
            borderRadius={5}
            bgColor={ColorMap['red'].dark}
          />
        </View>
      </S.ModalButtonContainer>
    </Modal>
  );
};

export default ClearAllAssigneeModal;
