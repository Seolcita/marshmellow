import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';

import * as S from './SharedSiteInfoCard.styles';
import { ReservationType } from '../../../types';
import { useUpdateWish } from '../../../api/wish';
import { FilteredSharedSiteInfo } from './SharedSiteInfo';
import RemoteImage from '../../atomic/remote-Image/RemoteImage';

interface SharedSiteInfoCardProps extends FilteredSharedSiteInfo {
  isWish: boolean;
}

interface ReservationTypeInfo {
  bgColor: string;
  text: string;
}

const ReservationTypeInfoMap: Record<ReservationType, ReservationTypeInfo> = {
  [ReservationType.FCFS]: {
    bgColor: '#BED7DC',
    text: 'FCFS',
  },
  [ReservationType.RESERVATION]: {
    bgColor: '#D9EDBF',
    text: 'Reservation',
  },
  [ReservationType.ANY]: {
    bgColor: '#F7E7DC',
    text: 'Any',
  },
};

const SharedSiteInfoCard = ({
  id,
  campgroundName,
  campgroundSiteNumber,
  rate,
  reservationType,
  imageUrl,
  userId,
  isWish,
}: SharedSiteInfoCardProps) => {
  const { mutate: updateWish } = useUpdateWish(userId);

  const handleWish = (id: string) => {
    console.log('wish id:', id);
    updateWish(id);
  };

  return (
    <Pressable onPress={() => router.push(`/(user)/shared-site-info/${id}`)}>
      <S.SiteInfoCardContainer>
        <S.ImageContainer>
          {imageUrl ? (
            <RemoteImage
              path={imageUrl}
              width={150}
              height={100}
              borderRadius={5}
            />
          ) : (
            <S.DefaultImage
              source={require('../../../../assets/images/default-image.png')}
            />
          )}
        </S.ImageContainer>
        <S.DetailContainer>
          <S.SiteNameText>{campgroundName}</S.SiteNameText>
          {campgroundSiteNumber ? (
            <S.SiteNumberText>Site# {campgroundSiteNumber}</S.SiteNumberText>
          ) : (
            <S.EmptyView />
          )}
          {rate ? (
            <Rating
              imageSize={14}
              readonly
              startingValue={rate}
              style={{ marginBottom: 3, alignSelf: 'flex-start' }}
            />
          ) : (
            <S.EmptyView />
          )}
          {reservationType ? (
            <S.ReservationTypeText
              bgColor={
                ReservationTypeInfoMap[reservationType as ReservationType]
                  .bgColor
              }
            >
              {ReservationTypeInfoMap[reservationType as ReservationType].text}
            </S.ReservationTypeText>
          ) : (
            <S.EmptyView />
          )}
        </S.DetailContainer>
        <S.WishIconButton onPress={() => handleWish(id)}>
          <Ionicons
            name={isWish ? 'heart-sharp' : 'heart-outline'}
            size={24}
            color={isWish ? 'red' : 'black'}
          />
        </S.WishIconButton>
      </S.SiteInfoCardContainer>
    </Pressable>
  );
};

export default SharedSiteInfoCard;
