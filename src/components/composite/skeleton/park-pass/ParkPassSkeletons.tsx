import { Skeleton } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as S from './ParkPassSkeletons.styles';

const ParkPassSkeletons = () => {
  return (
    <S.Container>
      <S.TileContainer>
        <S.ParkPassNameContainer>
          <Skeleton width={100} height={20} animation='wave' />
          <S.IconsContainer>
            <AntDesign name='edit' size={20} color='grey' />
            <MaterialIcons name='delete-outline' size={20} color='grey' />
          </S.IconsContainer>
        </S.ParkPassNameContainer>
        <Skeleton width={200} height={20} animation='wave' />
      </S.TileContainer>
      <S.TileContainer>
        <S.ParkPassNameContainer>
          <Skeleton width={100} height={20} animation='wave' />
          <S.IconsContainer>
            <AntDesign name='edit' size={20} color='grey' />
            <MaterialIcons name='delete-outline' size={20} color='grey' />
          </S.IconsContainer>
        </S.ParkPassNameContainer>
        <Skeleton width={200} height={20} animation='wave' />
      </S.TileContainer>
      <S.TileContainer>
        <S.ParkPassNameContainer>
          <Skeleton width={100} height={20} animation='wave' />
          <S.IconsContainer>
            <AntDesign name='edit' size={20} color='grey' />
            <MaterialIcons name='delete-outline' size={20} color='grey' />
          </S.IconsContainer>
        </S.ParkPassNameContainer>
        <Skeleton width={200} height={20} animation='wave' />
      </S.TileContainer>
    </S.Container>
  );
};

export default ParkPassSkeletons;
