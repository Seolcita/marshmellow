import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from '../reservation/ReservationDetail.styles';
import { useClearSharedCheckList } from '../../../api/shared-check-list-item';

interface ClearAllCheckBoxModalProps {
  sharedCheckListid: number;
  isClearAllCheckBoxModalOpen: boolean;
  setIsClearAllCheckBoxModalOpen: (isOpen: boolean) => void;
  isClearCheckList: boolean;
  setIsClearCheckList: (isClearCheckList: boolean) => void;
}

export const ClearAllCheckBoxModal = ({
  sharedCheckListid,
  isClearAllCheckBoxModalOpen,
  setIsClearAllCheckBoxModalOpen,
  setIsClearCheckList,
  isClearCheckList,
}: ClearAllCheckBoxModalProps) => {
  const { mutate: clearCheckList } = useClearSharedCheckList();

  const handleClearCheckList = () => {
    setIsClearCheckList(!isClearCheckList);
    clearCheckList(sharedCheckListid);
    setIsClearAllCheckBoxModalOpen(false);
  };

  return (
    <Modal
      isOpen={isClearAllCheckBoxModalOpen}
      setIsOpen={setIsClearAllCheckBoxModalOpen}
    >
      <S.ModalTitle>Clear All CheckBox</S.ModalTitle>
      <S.MessageContainer>
        <S.ConfirmMessage color={ColorMap['black'].main}>
          {'Are you sure that you want to clear all checkboxes?'}
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
            onPress={() => handleClearCheckList()}
            text='Cleaer'
            borderRadius={5}
            bgColor={ColorMap['red'].dark}
          />
        </View>
      </S.ModalButtonContainer>
    </Modal>
  );
};

export default ClearAllCheckBoxModal;
