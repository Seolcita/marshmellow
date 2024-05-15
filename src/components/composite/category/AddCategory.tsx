import { useState } from 'react';
import { Text } from '../../Themed';
import * as S from './AddCategory.styles';
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

    // Add category to the list
    console.log('category', category);
    insertCategory({ item: category.item });
    setCategory({ item: '', error: '' });
  };

  return (
    <S.InputContainer>
      <Input
        label='Add Category'
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
        style={{ flex: 1, marginRight: 10 }}
        error={category.error}
      />
      <Button onPress={handleAdd} text='Add' borderRadius={10} />
    </S.InputContainer>
  );
};

export default AddCategory;
