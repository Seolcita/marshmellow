import { useState } from 'react';

import * as S from '../category/Categories.styles';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import { useInsertCategory } from '../../../api/category';

interface AddSharedCategoryProps {
  userId: string;
}

const AddSharedCategory = ({ userId }: AddSharedCategoryProps) => {
  const [category, setCategory] = useState({
    item: '',
    error: '',
  });

  const { mutate: insertCategory } = useInsertCategory(userId);

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
  };

  return (
    <S.AddCategoryContainer>
      <S.Title>Add Category</S.Title>
      <S.AddInputContainer>
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
        <S.ButtonContainer error={!!category.error}>
          <Button
            onPress={handleAdd}
            text='Add'
            borderRadius={5}
            bgColor={ColorMap['grey'].dark}
          />
        </S.ButtonContainer>
      </S.AddInputContainer>
    </S.AddCategoryContainer>
  );
};

export default AddSharedCategory;
