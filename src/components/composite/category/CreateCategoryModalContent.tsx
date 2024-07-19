import { useState } from 'react';
import * as S from './Categories.styles';

import { View } from '../../Themed';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

interface CreateCategoryModalContentProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  insertCategory: (category: { item: string }) => void;
}

const CreateCategoryModalContent = ({
  setIsModalOpen,
  insertCategory,
}: CreateCategoryModalContentProps) => {
  const [category, setCategory] = useState({
    item: '',
    error: '',
  });

  const handleChange = (text: string) => {
    setCategory({ item: text, error: '' });
  };

  const handleAdd = () => {
    if (!category.item.trim()) {
      setCategory({ ...category, error: 'Please enter a category' });
      return;
    }

    insertCategory({ item: category.item });
    setCategory({ item: '', error: '' });
    setIsModalOpen(false);
  };

  return (
    <>
      <S.ModalTitle>Add Category</S.ModalTitle>
      <Input
        label=''
        isValid={true}
        textInputConfig={{
          value: category.item.trim(),
          onChangeText: (text) => {
            handleChange(text);
          },
          placeholder: '',
          keyboardType: 'default',
        }}
        style={{ flex: 1 }}
        error={category.error}
      />
      <TwoButtonContainer>
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
            onPress={handleAdd}
            text='Add'
            borderRadius={5}
            bgColor={ColorMap['blue'].dark}
          />
        </View>
      </TwoButtonContainer>
    </>
  );
};

export default CreateCategoryModalContent;
