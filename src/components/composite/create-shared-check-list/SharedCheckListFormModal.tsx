import { useState } from 'react';

import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import * as S from './SharedCheckListFormModal.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { useInsertSharedCheckList } from '../../../api/shared-check-list';
import { Alert } from 'react-native';
import { router } from 'expo-router';

interface SharedCheckListFormModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SharedCheckListFormModal = ({
  isModalOpen,
  setIsModalOpen,
}: SharedCheckListFormModalProps) => {
  const { session, profile } = useAuth();
  const userEmail = session?.user.email;
  const userId = session?.user.id;
  const userName = profile?.name;

  if (!userEmail || !userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { mutate: insertSharedCheckList } = useInsertSharedCheckList(userId);

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const initiate = () => {
    setName('');
    setError('');
    setIsModalOpen(false);
  };

  const handleChange = (text: string) => {
    setName(text);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Please enter a shared check list name');
      return;
    }

    userEmail &&
      insertSharedCheckList({
        name,
        adminEmail: userEmail,
        adminName: userName,
      });
    initiate();
  };

  const handleCancel = () => {
    initiate();
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <S.ModalTitle>Create Check List</S.ModalTitle>
      <S.Container>
        <Input
          label='Shared Check List Name'
          isValid={true}
          textInputConfig={{
            value: name.trim(),
            onChangeText: (text) => {
              handleChange(text);
            },
            placeholder: 'Family Camping Trip',
            keyboardType: 'default',
            placeholderTextColor: ColorMap['grey'].light,
          }}
          style={{
            width: '100%',
            marginTop: -10,
          }}
          error={error}
        />
      </S.Container>
      <S.Buttons>
        <View style={{ width: '48%' }}>
          <Button
            text='Cancel'
            onPress={handleCancel}
            bgColor={ColorMap['grey'].main}
            paddingHorizontal={10}
            paddingVertical={10}
            borderRadius={5}
          />
        </View>
        <View style={{ width: '48%' }}>
          <Button
            text='Create'
            onPress={handleSubmit}
            bgColor={ColorMap['blue'].main}
            paddingHorizontal={10}
            paddingVertical={10}
            borderRadius={5}
          />
        </View>
      </S.Buttons>
    </Modal>
  );
};

export default SharedCheckListFormModal;
