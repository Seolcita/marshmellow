import { Skeleton } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as S from './TripsSkeletons.styles';

const TripsSkeletons = () => {
  return (
    <S.Container>
      <S.TileContainer>
        <S.TripsNameContainer>
          <Skeleton width={100} height={20} animation='wave' />
          <S.IconsContainer>
            <AntDesign name='edit' size={20} color='grey' />
            <MaterialIcons name='delete-outline' size={20} color='grey' />
          </S.IconsContainer>
        </S.TripsNameContainer>
        <Skeleton width={150} height={16} animation='wave' />
        <Skeleton width={200} height={16} animation='wave' />
      </S.TileContainer>
      <S.TileContainer>
        <S.TripsNameContainer>
          <Skeleton width={100} height={20} animation='wave' />
          <S.IconsContainer>
            <AntDesign name='edit' size={20} color='grey' />
            <MaterialIcons name='delete-outline' size={20} color='grey' />
          </S.IconsContainer>
        </S.TripsNameContainer>
        <Skeleton width={150} height={16} animation='wave' />
        <Skeleton width={200} height={16} animation='wave' />
      </S.TileContainer>
      <S.TileContainer>
        <S.TripsNameContainer>
          <Skeleton width={100} height={20} animation='wave' />
          <S.IconsContainer>
            <AntDesign name='edit' size={20} color='grey' />
            <MaterialIcons name='delete-outline' size={20} color='grey' />
          </S.IconsContainer>
        </S.TripsNameContainer>
        <Skeleton width={150} height={16} animation='wave' />
        <Skeleton width={200} height={16} animation='wave' />
      </S.TileContainer>
    </S.Container>
  );
};

export default TripsSkeletons;
