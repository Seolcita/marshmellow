import { Alert } from 'react-native';
import { router } from 'expo-router';
import { Switch } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import { Category } from '../../../types';
import ColorMap from '../../../styles/Color';
import * as S from './CheckListScreen.styles';
import Button from '../../atomic/button/Button';
import { useCategories } from '../../../api/category';
import { useAuth } from '../../../providers/AuthProvider';
import { useClearCheckList } from '../../../api/check-list';
import IconButton from '../../atomic/icon-button/IconButton';
import Categories from '../../composite/category/Categories';
import CreateCategoryModal from '../../composite/category/CreateCategoryModal';
import CheckListSkeleton from '../../composite/skeleton/check-list/CheckListSkeleton';

const CheckListScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isClearCheckList, setIsClearCheckList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const {
    error,
    data: existCategories,
    isLoading: isCategoriesLoading,
  } = useCategories(userId);

  const { mutate: clearCheckList } = useClearCheckList();

  useEffect(() => {
    if (existCategories) {
      const formattedCategories = existCategories.map((category) => ({
        name: category.name,
        id: category.id,
      }));
      setCategories(formattedCategories);
    }
    if (!isCategoriesLoading) {
      setIsLoading(false);
    }
  }, [existCategories]);

  const handleClearCheckList = () => {
    clearCheckList(userId);
  };

  return (
    <>
      {userId && (
        <>
          <S.ScrollViewContainer>
            <S.ContentsContainer>
              <S.ButtonsContainer>
                <S.ClearButtonContainer>
                  <Button
                    text='Clear all Checkbox'
                    onPress={() => {
                      setIsClearCheckList((prev) => !prev);
                      handleClearCheckList();
                    }}
                    borderRadius={5}
                    bgColor={ColorMap['blue'].dark}
                    textColor={ColorMap['white'].main}
                    paddingVertical={13}
                  />
                </S.ClearButtonContainer>

                <S.ToggleContainer>
                  <S.ToggleText>Check Mode</S.ToggleText>
                  <Switch
                    trackColor={{
                      false: ColorMap['grey'].light,
                      true: ColorMap['yellow'].extraLight,
                    }}
                    thumbColor={
                      !isEditMode
                        ? ColorMap['yellow'].dark
                        : ColorMap['grey'].extraLight
                    }
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={() => setIsEditMode((prev) => !prev)}
                    value={!isEditMode}
                  />
                </S.ToggleContainer>
              </S.ButtonsContainer>
              {isLoading ? (
                <CheckListSkeleton />
              ) : (
                <Categories
                  categories={categories}
                  userId={userId}
                  isEditMode={isEditMode}
                  isClearCheckList={isClearCheckList}
                  setIsClearCheckList={setIsClearCheckList}
                />
              )}
            </S.ContentsContainer>
          </S.ScrollViewContainer>
          <IconButton
            icon={
              <FontAwesome5
                name='plus'
                size={16}
                color={ColorMap['grey'].dark}
              />
            }
            text='Add Category'
            hasShadow
            onPress={() => setIsModalOpen(true)}
          />
          <CreateCategoryModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            userId={userId}
          />
        </>
      )}
    </>
  );
};

export default CheckListScreen;
