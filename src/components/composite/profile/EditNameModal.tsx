import { useEffect, useState } from 'react';

import {
  TwoButtonContainer,
  ModalTitle,
} from '../../common-styles/CommonStyles';
import { View } from '../../Themed';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Modal from '../../atomic/modal/Modal';
import Button from '../../atomic/button/Button';
import { useUpdateUserName } from '../../../api/profile';

interface EditNameModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  userId: string;
  initialValue?: string;
}

const EditNameModal = ({
  isModalOpen,
  setIsModalOpen,
  userId,
  initialValue,
}: EditNameModalProps) => {
  const [name, setName] = useState<string | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    initialValue && setName(initialValue);
  }, [initialValue]);

  const { mutate: updateUserName } = useUpdateUserName(userId);

  const handleChange = (text: string) => {
    if (text.length > 0) {
      setError('');
    }
    setName(text);
  };

  const handleCancel = () => {
    setName(initialValue);
    setError('');
    setIsModalOpen(false);
  };

  const handleEditName = () => {
    if (name === '' || name === undefined) {
      setError('Please enter your name');
      return;
    }

    !error && updateUserName(name);

    setName(initialValue);
    setError('');
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <ModalTitle>Edit User Name</ModalTitle>
      <Input
        label=''
        isValid={true}
        textInputConfig={{
          value: name,
          onChangeText: (text) => handleChange(text),
          placeholder: '',
          keyboardType: 'default',
          autoFocus: true,
        }}
        error={error}
        style={{ marginBottom: 24 }}
      />
      <TwoButtonContainer>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => handleCancel()}
            text='Cancel'
            borderRadius={5}
            bgColor={ColorMap['grey'].main}
          />
        </View>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => handleEditName()}
            text='Edit'
            borderRadius={5}
            bgColor={ColorMap['blue'].dark}
          />
        </View>
      </TwoButtonContainer>
    </Modal>
  );
};

export default EditNameModal;
