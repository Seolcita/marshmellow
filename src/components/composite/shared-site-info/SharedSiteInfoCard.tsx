import { router } from 'expo-router';
import { Rating } from 'react-native-ratings';
import { Entypo, Ionicons } from '@expo/vector-icons';

import ColorMap from '../../../styles/Color';
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
  country,
  province,
  city,
}: SharedSiteInfoCardProps) => {
  const { mutate: updateWish } = useUpdateWish(userId);

  const cityAndProvince =
    city && province ? `${city}, ${province}` : city ?? '';
  const location = cityAndProvince ? `${cityAndProvince}, ` + country : country;

  const handleWish = (id: string) => {
    updateWish(id);
  };

  return (
    <S.Pressable onPress={() => router.push(`/(user)/shared-site-info/${id}`)}>
      <S.SiteInfoCardContainer>
        <S.ImageContainer>
          {imageUrl ? (
            <RemoteImage
              path={imageUrl}
              width={160}
              height={140}
              borderRadius={0}
            />
          ) : (
            <S.DefaultImageContainer>
              <S.DefaultImage
                source={require('../../../../assets/images/default-image.png')}
              />
            </S.DefaultImageContainer>
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
          <S.Location>
            <Entypo
              name='location-pin'
              size={12}
              color={ColorMap['grey'].main}
              style={{ paddingTop: 2.5 }}
            />
            <S.LocationText>{location}</S.LocationText>
          </S.Location>
        </S.DetailContainer>
        <S.WishIconButton onPress={() => handleWish(id)}>
          <Ionicons
            name={isWish ? 'heart-sharp' : 'heart-outline'}
            size={20}
            color={isWish ? 'red' : 'black'}
          />
        </S.WishIconButton>
      </S.SiteInfoCardContainer>
    </S.Pressable>
  );
};

export default SharedSiteInfoCard;
