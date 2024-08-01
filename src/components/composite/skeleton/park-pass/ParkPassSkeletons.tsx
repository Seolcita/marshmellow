import { Skeleton } from '@rneui/themed';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import * as S from './ParkPassSkeletons.styles';

const ParkPassSkeletons = () => {
  return (
    <S.Container>
      <S.TileContainer>
        <S.ParkPassContents>
          <Skeleton width={100} height={20} animation='wave' />
          <Skeleton width={200} height={20} animation='wave' />
        </S.ParkPassContents>
        <S.IconsContainer>
          <SimpleLineIcons name='options-vertical' size={20} color='grey' />
        </S.IconsContainer>
      </S.TileContainer>
    </S.Container>
  );
};

export default ParkPassSkeletons;
