import { FlatList, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Text } from '../../Themed';
import * as S from './Categories.styles';
import { Category } from '../../../types';
import AddCheckList from '../check-list/AddCheckList';
import { UpdateCategory, userUpdateCategory } from '../../../api/category';

interface CategoriesProps {
  categories: Category[];
  userId: string;
}

const Categories = ({ categories, userId }: CategoriesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    categoryId: '',
    name: '',
  });

  const { mutate: updateCategory } = userUpdateCategory(userId);

  const handleVisibility = (index: number) => {
    if (activeButtonIndex === index) {
      setIsVisible(!isVisible);
    } else {
      setActiveButtonIndex(index);
      setIsVisible(true);
    }
  };

  const handleExpand = (index: number) => {
    if (activeCategoryIndex === index) {
      setIsExpanded(!isExpanded);
    } else {
      setActiveCategoryIndex(index);
      setIsExpanded(true);
    }
  };

  const handleEdit = ({ id, item }: UpdateCategory) => {
    console.log('EDIT CLICKED', id, item);
    setEditModal({
      isOpen: true,
      categoryId: id,
      name: item,
    });

    // TODO: Create Modal
    // Use below in modal
    updateCategory({ id, item });
  };

  const handleDelete = () => {
    //TODO: Implement delete category
  };

  return categories?.length <= 0 ? (
    <Text>No categories found. Add Categories and check list items</Text>
  ) : (
    <FlatList
      data={categories}
      keyExtractor={(item: Category) => item.id}
      renderItem={({ item, index }) => (
        <S.Wrapper>
          <S.CategoryContainer>
            <Text>{item.name}</Text>
            <S.CategoryButtons>
              <Pressable onPress={() => handleExpand(index)}>
                {isExpanded && activeCategoryIndex === index ? (
                  <FontAwesome6 name='caret-up' size={24} color='black' />
                ) : (
                  <FontAwesome6 name='caret-down' size={24} color='black' />
                )}
              </Pressable>
              <Pressable onPress={() => handleVisibility(index)}>
                {isVisible && activeButtonIndex === index ? (
                  <FontAwesome6 name='text-slash' size={17} color='black' />
                ) : (
                  <Octicons name='diff-added' size={24} color='black' />
                )}
              </Pressable>
              <Pressable
                onPress={() => handleEdit({ id: item.id, item: item.name })}
              >
                <AntDesign name='edit' size={24} color='black' />
              </Pressable>
            </S.CategoryButtons>
          </S.CategoryContainer>

          <AddCheckList
            categoryId={item.id}
            isExpanded={isExpanded && activeCategoryIndex === index}
            isInputVisible={isVisible && activeButtonIndex === index}
          />
        </S.Wrapper>
      )}
    />
  );
};

export default Categories;
