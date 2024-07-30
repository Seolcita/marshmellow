import { Skeleton } from '@rneui/themed';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import * as S from './SharedCheckListTileSkeletons.styles';

const SharedCheckListTileSkeletons = () => {
  return (
    <S.Container>
      <S.SkeletonTile>
        <Skeleton height={24} width={200} />
        <SimpleLineIcons name='options-vertical' size={16} color='grey' />
      </S.SkeletonTile>
      <S.SkeletonTile>
        <Skeleton height={24} width={200} />
        <SimpleLineIcons name='options-vertical' size={16} color='grey' />
      </S.SkeletonTile>
      <S.SkeletonTile>
        <Skeleton height={24} width={200} />
        <SimpleLineIcons name='options-vertical' size={16} color='grey' />
      </S.SkeletonTile>
    </S.Container>
  );
};

export default SharedCheckListTileSkeletons;
