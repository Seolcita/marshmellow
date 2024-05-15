import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { Category } from '../../../types';
import { Text, View } from '../../Themed';
import { useCategories } from '../../../api/category';
import { useAuth } from '../../../providers/AuthProvider';
import Categories from '../../composite/category/Categories';
import AddCategory from '../../composite/category/AddCategory';

const CheckListScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { error, data: existCategories } = useCategories(userId);

  useEffect(() => {
    if (existCategories) {
      const formattedCategories = existCategories.map((category) => ({
        name: category.name,
        id: category.id,
      }));
      setCategories(formattedCategories);
    }
  }, [existCategories]);

  return (
    <View>
      {userId && (
        <View>
          <Text>Check List Screen</Text>

          <AddCategory userId={userId} />
          <Categories categories={categories} userId={userId} />
          {/*  Clear checkbox */}
        </View>
      )}
    </View>
  );
};

export default CheckListScreen;
