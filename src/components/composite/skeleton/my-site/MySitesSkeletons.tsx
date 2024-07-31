import { Skeleton } from '@rneui/themed';
import * as S from './MySitesSkeletons.styles';

const MySitesSkeletons = () => {
  return (
    <S.Container>
      <S.TileContainer>
        <Skeleton width={120} height={20} animation='wave' />
        <S.IconsContainer>
          <Skeleton width={60} height={20} animation='wave' />
          <Skeleton width={20} height={20} animation='pulse' />
          <Skeleton width={20} height={20} animation='pulse' />
        </S.IconsContainer>
      </S.TileContainer>
      <S.TileContainer>
        <Skeleton width={120} height={20} animation='wave' />
        <S.IconsContainer>
          <Skeleton width={60} height={20} animation='wave' />
          <Skeleton width={20} height={20} animation='pulse' />
          <Skeleton width={20} height={20} animation='pulse' />
        </S.IconsContainer>
      </S.TileContainer>
      <S.TileContainer>
        <Skeleton width={120} height={20} animation='wave' />
        <S.IconsContainer>
          <Skeleton width={60} height={20} animation='wave' />
          <Skeleton width={20} height={20} animation='pulse' />
          <Skeleton width={20} height={20} animation='pulse' />
        </S.IconsContainer>
      </S.TileContainer>
    </S.Container>
  );
};

export default MySitesSkeletons;
