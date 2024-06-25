import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { Category } from '../../../types';
import { Text, View } from '../../Themed';
import ColorMap from '../../../styles/Color';
import * as S from './CheckListScreen.styles';
import Button from '../../atomic/button/Button';
import { useCategories } from '../../../api/category';
import { useAuth } from '../../../providers/AuthProvider';
import Categories from '../../composite/category/Categories';
import AddCategory from '../../composite/category/AddCategory';
import { useClearCheckList } from '../../../api/check-list';

const CheckListScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isClearCheckList, setIsClearCheckList] = useState(false);

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { error, data: existCategories } = useCategories(userId);
  const { mutate: clearCheckList } = useClearCheckList();

  useEffect(() => {
    if (existCategories) {
      const formattedCategories = existCategories.map((category) => ({
        name: category.name,
        id: category.id,
      }));
      setCategories(formattedCategories);
    }
  }, [existCategories]);

  const handleClearCheckList = () => {
    clearCheckList(userId);
  };

  return (
    <>
      {userId && (
        <S.ScrollViewContainer>
          <S.ImageBackgroundContainer>
            <S.ImageBackground
              source={require('../../../../assets/images/camping-gears.png')}
            />
          </S.ImageBackgroundContainer>
          <S.ContentsContainer>
            <AddCategory userId={userId} />
            <S.ButtonsContainer>
              <View style={{ width: '49%' }}>
                <Button
                  text='Clear all Checkbox'
                  onPress={() => {
                    setIsClearCheckList((prev) => !prev);
                    handleClearCheckList();
                  }}
                  borderRadius={5}
                  bgColor={ColorMap['blue'].dark}
                  textColor={ColorMap['white'].main}
                />
              </View>
              <View style={{ width: '49%' }}>
                {isEditMode ? (
                  <Button
                    text='Check Mode'
                    onPress={() => setIsEditMode((prev) => !prev)}
                    borderRadius={5}
                    bgColor={ColorMap['blue'].dark}
                  />
                ) : (
                  <Button
                    text='Manage Mode'
                    onPress={() => setIsEditMode((prev) => !prev)}
                    borderRadius={5}
                    bgColor={ColorMap['blue'].main}
                  />
                )}
              </View>
            </S.ButtonsContainer>
            <Categories
              categories={categories}
              userId={userId}
              isEditMode={isEditMode}
              isClearCheckList={isClearCheckList}
              setIsClearCheckList={setIsClearCheckList}
            />
          </S.ContentsContainer>
        </S.ScrollViewContainer>
      )}
    </>
  );
};

export default CheckListScreen;
