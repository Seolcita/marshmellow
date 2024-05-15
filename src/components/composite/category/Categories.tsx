import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';

import * as S from './Categories.styles';
import { Text, View } from '../../Themed';
import { Category } from '../../../types';
import EditCategoryModal from './EditCategoryModal';
import AddCheckList from '../check-list/AddCheckList';
import DeleteCategoryModal from './DeleteCategoryModal';

interface CategoriesProps {
  categories: Category[];
  userId: string;
  isEditMode: boolean;
}

export interface EditCategory {
  categoryId: string;
  name: string;
}

export interface DeleteCategory extends EditCategory {}

const Categories = ({ categories, userId, isEditMode }: CategoriesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<EditCategory>({
    categoryId: '',
    name: '',
  });
  const [deleteCategory, setDeleteCategory] = useState<DeleteCategory>({
    categoryId: '',
    name: '',
  });

  const handleVisibility = (index: number) => {
    if (activeButtonIndex === index) {
      setIsVisible(!isVisible);
    } else {
      setActiveButtonIndex(index);
      setIsVisible(true);
    }
  };

  const handleEdit = ({ categoryId, name }: EditCategory) => {
    setIsEditModalOpen(true);
    setEditCategory({
      categoryId,
      name,
    });
  };

  const handleDelete = ({ categoryId, name }: DeleteCategory) => {
    setIsDeleteModalOpen(true);
    setDeleteCategory({
      categoryId,
      name,
    });
  };

  return categories?.length <= 0 ? (
    <Text>No categories found. Add Categories and check list items</Text>
  ) : (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item: Category) => item.id}
        renderItem={({ item, index }) => (
          <S.Wrapper>
            <S.CategoryContainer>
              <S.CategoryName>{item.name}</S.CategoryName>
              {isEditMode && (
                <S.CategoryButtons>
                  <Pressable onPress={() => handleVisibility(index)}>
                    {isVisible && activeButtonIndex === index ? (
                      <FontAwesome6 name='text-slash' size={17} color='black' />
                    ) : (
                      <Octicons name='diff-added' size={24} color='black' />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleEdit({ categoryId: item.id, name: item.name })
                    }
                  >
                    <AntDesign name='edit' size={24} color='black' />
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      handleDelete({ categoryId: item.id, name: item.name })
                    }
                  >
                    <MaterialCommunityIcons
                      name='delete-outline'
                      size={24}
                      color='black'
                    />
                  </Pressable>
                </S.CategoryButtons>
              )}
            </S.CategoryContainer>

            <AddCheckList
              categoryId={item.id}
              isInputVisible={isVisible && activeButtonIndex === index}
              isEditMode={isEditMode}
            />
          </S.Wrapper>
        )}
      />

      <EditCategoryModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        eidtCategory={editCategory}
        userId={userId}
      />

      <DeleteCategoryModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        userId={userId}
        deleteCategory={deleteCategory}
      />
    </View>
  );
};

export default Categories;
