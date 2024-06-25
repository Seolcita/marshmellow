import { ReactNode } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Modal as ReactModal, ScrollView } from 'react-native';

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
          <ScrollView
            style={{ padding: 0, margin: 0, width: '100%' }}
            overScrollMode='auto'
            showsVerticalScrollIndicator={false}
          >
            <S.CloseButton onPress={() => setIsOpen(false)}>
              <AntDesign name='close' size={15} color='black' />
            </S.CloseButton>
            {children}
          </ScrollView>
        </S.ModalView>
      </S.Container>
    </ReactModal>
  );
};

export default Modal;
