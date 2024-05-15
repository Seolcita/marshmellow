import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { Category } from '../../../types';
import { Text, View } from '../../Themed';
import * as S from './CheckListScreen.styles';
import { useCategories } from '../../../api/category';
import { useAuth } from '../../../providers/AuthProvider';
import Categories from '../../composite/category/Categories';
import AddCategory from '../../composite/category/AddCategory';
import { useClearCheckList } from '../../../api/check-list';

const CheckListScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);

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
    <View>
      {userId && (
        <View>
          <AddCategory userId={userId} />
          <S.ButtonsContainer>
            <S.Button
              onPress={() => {
                handleClearCheckList();
              }}
            >
              <Feather name='check-square' size={24} color='black' />
              <Text>Clear all Checkbox</Text>
            </S.Button>
            <S.Button onPress={() => setIsEditMode((prev) => !prev)}>
              {isEditMode ? (
                <>
                  <Feather name='toggle-left' size={24} color='black' />
                  <Text>Check Mode</Text>
                </>
              ) : (
                <>
                  <Feather name='toggle-right' size={24} color='black' />
                  <Text> Manage Mode</Text>
                </>
              )}
            </S.Button>
          </S.ButtonsContainer>
          <Categories
            categories={categories}
            userId={userId}
            isEditMode={isEditMode}
          />
        </View>
      )}
    </View>
  );
};

export default CheckListScreen;
