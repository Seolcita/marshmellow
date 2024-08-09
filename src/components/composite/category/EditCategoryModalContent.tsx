import { useEffect, useState } from 'react';
import * as S from './Categories.styles';

import { View } from '../../Themed';
import { EditCategory } from './Categories';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

interface EditCategoryModalContentProps {
  setIsEditModalOpen: (isModalOpen: boolean) => void;
  updateCategory: (category: { id: string; item: string }) => void;
  editCategory: EditCategory;
}

const EditCategoryModalContent = ({
  setIsEditModalOpen,
  updateCategory,
  editCategory,
}: EditCategoryModalContentProps) => {
  const [category, setCategory] = useState({
    item: '',
    error: '',
  });

  useEffect(() => {
    setCategory({ item: editCategory.name, error: '' });
  }, [editCategory.name]);

  const handleChange = (text: string) => {
    setCategory({ item: text.trim(), error: '' });
  };

  const handleEdit = () => {
    if (category.item === '') {
      setCategory({ ...category, error: 'Please enter a category' });
      return;
    }

    updateCategory({ id: editCategory.categoryId, item: category.item });
    setCategory({ item: '', error: '' });
    setIsEditModalOpen(false);
  };

  return (
    <>
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
          <View style={{ width: '49%' }}>
            <Button
              onPress={() => setIsEditModalOpen(false)}
              text='Cancel'
              borderRadius={5}
              bgColor={ColorMap['grey'].main}
            />
          </View>
          <View style={{ width: '49%' }}>
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
    </>
  );
};

export default EditCategoryModalContent;
