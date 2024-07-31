import { Skeleton } from '@rneui/themed';

import * as S from './TileSkeletons.styles';

const TileSkeletons = () => {
  return (
    <S.Container>
      <S.SkeletonTile>
        <Skeleton height={24} width={200} />
        <Skeleton height={24} width={24} />
      </S.SkeletonTile>
      <S.SkeletonTile>
        <Skeleton height={24} width={200} />
        <Skeleton height={24} width={24} />
      </S.SkeletonTile>
    </S.Container>
  );
};

export default TileSkeletons;
