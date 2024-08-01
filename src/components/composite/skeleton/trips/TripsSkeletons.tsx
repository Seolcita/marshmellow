import { Skeleton } from '@rneui/themed';
import { SimpleLineIcons } from '@expo/vector-icons';

import * as S from './TripsSkeletons.styles';

const TripsSkeletons = () => {
  return (
    <S.Container>
      <S.TileContainer>
        <S.Contents>
          <Skeleton width={100} height={20} animation='wave' />
          <Skeleton width={150} height={16} animation='wave' />
          <Skeleton width={200} height={16} animation='wave' />
        </S.Contents>
        <S.IconsContainer>
          <SimpleLineIcons name='options-vertical' size={20} color='grey' />
        </S.IconsContainer>
      </S.TileContainer>
      <S.TileContainer>
        <S.Contents>
          <Skeleton width={100} height={20} animation='wave' />
          <Skeleton width={150} height={16} animation='wave' />
          <Skeleton width={200} height={16} animation='wave' />
        </S.Contents>
        <S.IconsContainer>
          <SimpleLineIcons name='options-vertical' size={20} color='grey' />
        </S.IconsContainer>
      </S.TileContainer>
      <S.TileContainer>
        <S.Contents>
          <Skeleton width={100} height={20} animation='wave' />
          <Skeleton width={150} height={16} animation='wave' />
          <Skeleton width={200} height={16} animation='wave' />
        </S.Contents>
        <S.IconsContainer>
          <SimpleLineIcons name='options-vertical' size={20} color='grey' />
        </S.IconsContainer>
      </S.TileContainer>
    </S.Container>
  );
};

export default TripsSkeletons;
