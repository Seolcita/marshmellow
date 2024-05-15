import { ReactNode } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Modal as ReactModal } from 'react-native';

import * as S from './Modal.styles';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  return (
    <ReactModal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <S.Container>
        <S.ModalView>
          <S.CloseButton onPress={() => setIsOpen(false)}>
            <FontAwesome name='close' size={24} color='black' />
          </S.CloseButton>
          {children}
        </S.ModalView>
      </S.Container>
    </ReactModal>
  );
};

export default Modal;
