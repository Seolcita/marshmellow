import { Skeleton } from '@rneui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import * as S from './CheckListItemSkeleton.styles';

const CheckListItemSkeleton = () => {
  return (
    <S.Container>
      <FontAwesome name='check-square-o' size={24} color='grey' />
      <S.ItemContainer>
        <Skeleton animation='wave' width={200} height={25} />
      </S.ItemContainer>
    </S.Container>
  );
};

export default CheckListItemSkeleton;
