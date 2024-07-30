import { Skeleton } from '@rneui/themed';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import * as S from './CategorySkeleton.styles';

const CategorySkeleton = () => {
  return (
    <S.Container>
      <FontAwesome6 name='caret-up' size={24} color='white' />
      <S.CategoryTitle>
        <Skeleton animation='wave' width={150} height={20} />
      </S.CategoryTitle>
    </S.Container>
  );
};

export default CategorySkeleton;
