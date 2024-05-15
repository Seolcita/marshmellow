import { useState } from 'react';
import * as S from './Categories.styles';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import { useInsertCategory } from '../../../api/category';

interface AddCategoryProps {
  userId: string;
}

const AddCategory = ({ userId }: AddCategoryProps) => {
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
            autoFocus: true,
          }}
          style={{ flex: 1 }}
          error={category.error}
        />
        <Button onPress={handleAdd} text='Add' borderRadius={10} />
      </S.AddInputContainer>
    </S.AddCategoryContainer>
  );
};

export default AddCategory;
