import { useEffect, useState } from 'react';

import { View } from '../../Themed';
import * as S from '../category/Categories.styles';
import { EditSharedCategory } from './SharedCategories';
import Modal from '../../atomic/modal/Modal';
import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import { useUpdateCategory } from '../../../api/category';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

interface EditSharedCategoryModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isEditModalOpen: boolean) => void;
  eidtCategory: EditSharedCategory;
  userId: string;
}

const EditSharedCategoryModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  eidtCategory,
  userId,
}: EditSharedCategoryModalProps) => {
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

        <TwoButtonContainer>
          <View style={{ width: '48%' }}>
            <Button
              onPress={() => setIsEditModalOpen(false)}
              text='Cancel'
              borderRadius={5}
              bgColor={ColorMap['grey'].main}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Button
              onPress={handleEdit}
              text='Save'
              borderRadius={5}
              fullWidth
              bgColor={ColorMap['blue'].dark}
            />
          </View>
        </TwoButtonContainer>
      </S.EditInputContainer>
    </Modal>
  );
};

export default EditSharedCategoryModal;
