import { useEffect, useState } from 'react';

import * as S from './Categories.styles';
import { EditCategory } from './Categories';
import Modal from '../../atomic/modal/Modal';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import { useUpdateCategory } from '../../../api/category';

interface EditCategoryModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isEditModalOpen: boolean) => void;
  eidtCategory: EditCategory;
  userId: string;
}

const EditCategoryModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  eidtCategory,
  userId,
}: EditCategoryModalProps) => {
  const [category, setCategory] = useState({
    item: '',
    error: '',
  });

  useEffect(() => {
    setCategory({ item: eidtCategory.name, error: '' });
  }, [eidtCategory.name]);

  const { mutate: updateCategory } = useUpdateCategory(userId);

  const handleChange = (text: string) => {
    setCategory({ item: text.trim(), error: '' });
  };

  const handleEdit = () => {
    if (category.item === '') {
      setCategory({ ...category, error: 'Please enter a category' });
      return;
    }

    updateCategory({ id: eidtCategory.categoryId, item: category.item });
    setCategory({ item: '', error: '' });
    setIsEditModalOpen(false);
  };

  return (
    <Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen}>
      <S.ModalTitle>Edit Category</S.ModalTitle>
      <S.EditInputContainer>
        <Input
          label=''
          isValid={true}
          textInputConfig={{
            value: category.item,
            onChangeText: (text) => {
              handleChange(text);
            },
            placeholder: '',
            keyboardType: 'default',
            autoFocus: true,
          }}
          error={category.error}
        />
        <Button onPress={handleEdit} text='Save' borderRadius={10} fullWidth />
      </S.EditInputContainer>
    </Modal>
  );
};

export default EditCategoryModal;
