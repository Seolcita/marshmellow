import { Skeleton } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

import * as S from './SharedSiteTileSkeleton.styled';
import { View } from '../../../Themed';

const SharedSiteTileSkeleton = () => {
  return (
    <View>
      <S.SiteInfoCardContainer>
        <S.ImageContainer>
          <Skeleton animation='wave' width={150} height={100} />
        </S.ImageContainer>
        <S.DetailContainer>
          <Skeleton animation='wave' width={100} height={20} />
          <Skeleton animation='wave' width={80} height={16} />
          <Skeleton animation='wave' width={80} height={16} />
          <Skeleton animation='wave' width={80} height={16} />
        </S.DetailContainer>
        <Ionicons name={'heart-outline'} size={24} color='lightgrey' />
      </S.SiteInfoCardContainer>
    </View>
  );
};

export default SharedSiteTileSkeleton;
