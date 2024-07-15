import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import * as S from '../category/Categories.styles';
import { Text, View } from '../../Themed';
import { Category } from '../../../types';
import AddCheckList from '../check-list/AddCheckList';
import DeleteSharedCategoryModal from './DeleteSharedCategoryModal';
import ColorMap from '../../../styles/Color';
import EditSharedCategoryModal from './EditSharedCategoryModal';

interface CategoriesProps {
  categories: Category[];
  userId: string;
  isEditMode: boolean;
  isClearCheckList: boolean;
  setIsClearCheckList: (isClearCheckList: boolean) => void;
}

export interface Accordion {
  [key: string]: AccordionContent;
}

export interface AccordionContent {
  index: number;
  isOpen: boolean;
}

export interface EditSharedCategory {
  categoryId: string;
  name: string;
}

export interface DeleteSharedCategory extends EditSharedCategory {}

const IconSize = 20;

const SharedCategories = ({
  categories,
  userId,
  isEditMode,
  isClearCheckList,
  setIsClearCheckList,
}: CategoriesProps) => {
  const [activeAccordion, setActiveAccordion] = useState<Accordion>();
  const [isVisible, setIsVisible] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<EditSharedCategory>({
    categoryId: '',
    name: '',
  });
  const [deleteCategory, setDeleteCategory] = useState<DeleteSharedCategory>({
    categoryId: '',
    name: '',
  });

  useEffect(() => {
    if (categories.length > 0) {
      const initalValue = categories.map((category, index) => {
        return {
          [category.name]: {
            index,
            isOpen: true,
          },
        };
      });
      setActiveAccordion(Object.assign({}, ...initalValue));
    }
  }, [categories]);

  const handleAccordion = ({
    categoryName,
    index,
  }: {
    categoryName: string;
    index: number;
  }) => {
    activeAccordion &&
      setActiveAccordion((prev) => {
        if (prev) {
          return {
            ...prev,
            [categoryName]: {
              index,
              isOpen: !prev[categoryName].isOpen,
            },
          };
        }
        return prev;
      });
  };

  const openAccordion = ({
    categoryName,
    index,
  }: {
    categoryName: string;
    index: number;
  }) => {
    activeAccordion &&
      setActiveAccordion((prev) => {
        if (prev) {
          return {
            ...prev,
            [categoryName]: {
              index,
              isOpen: true,
            },
          };
        }
        return prev;
      });
  };

  const handleVisibility = ({
    categoryName,
    index,
  }: {
    categoryName: string;
    index: number;
  }) => {
    if (activeButtonIndex === index) {
      setIsVisible(!isVisible);
    } else {
      setActiveButtonIndex(index);
      setIsVisible(true);
    }
    openAccordion({ categoryName, index });
  };

  const handleEdit = ({ categoryId, name }: EditSharedCategory) => {
    setIsEditModalOpen(true);
    setEditCategory({
      categoryId,
      name,
    });
  };

  const handleDelete = ({ categoryId, name }: DeleteSharedCategory) => {
    setIsDeleteModalOpen(true);
    setDeleteCategory({
      categoryId,
      name,
    });
  };

  return categories?.length <= 0 ? (
    <S.NoCategoryContainer>
      <S.NoCategoryText>Add Categories and check list items!!</S.NoCategoryText>
    </S.NoCategoryContainer>
  ) : (
    <View>
      {categories.map((item, index) => (
        <S.Wrapper key={item.id}>
          <S.CategoryContainer>
            <S.CategoryNameContainer
              onPress={() =>
                handleAccordion({ categoryName: item.name, index })
              }
            >
              {activeAccordion && activeAccordion[item.name] && (
                <FontAwesome6
                  name={
                    activeAccordion[item.name].isOpen
                      ? 'caret-up'
                      : 'caret-down'
                  }
                  size={IconSize}
                  color={ColorMap['white'].main}
                />
              )}

              <S.CategoryName>{item.name}</S.CategoryName>
            </S.CategoryNameContainer>
            {isEditMode && (
              <S.CategoryButtons>
                <Pressable
                  onPress={() =>
                    handleVisibility({ index, categoryName: item.name })
                  }
                >
                  {isVisible && activeButtonIndex === index ? (
                    <FontAwesome6
                      name='text-slash'
                      size={16}
                      color={ColorMap['white'].main}
                    />
                  ) : (
                    <Octicons
                      name='diff-added'
                      size={IconSize}
                      color={ColorMap['white'].main}
                    />
                  )}
                </Pressable>
                <Pressable
                  onPress={() =>
                    handleEdit({ categoryId: item.id, name: item.name })
                  }
                >
                  <AntDesign
                    name='edit'
                    size={IconSize}
                    color={ColorMap['white'].main}
                  />
                </Pressable>

                <Pressable
                  onPress={() =>
                    handleDelete({ categoryId: item.id, name: item.name })
                  }
                >
                  <MaterialCommunityIcons
                    name='delete-outline'
                    size={IconSize}
                    color={ColorMap['white'].main}
                  />
                </Pressable>
              </S.CategoryButtons>
            )}
          </S.CategoryContainer>
          {activeAccordion &&
            activeAccordion[item.name] &&
            activeAccordion[item.name].isOpen && (
              <AddCheckList
                categoryId={item.id}
                isInputVisible={isVisible && activeButtonIndex === index}
                isEditMode={isEditMode}
                isClearCheckList={isClearCheckList}
                setIsClearCheckList={setIsClearCheckList}
              />
            )}
        </S.Wrapper>
      ))}

      <EditSharedCategoryModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        eidtCategory={editCategory}
        userId={userId}
      />

      <DeleteSharedCategoryModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        userId={userId}
        deleteCategory={deleteCategory}
      />
    </View>
  );
};

export default SharedCategories;
