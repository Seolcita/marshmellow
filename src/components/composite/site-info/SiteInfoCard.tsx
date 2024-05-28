import { router } from 'expo-router';
import { Pressable } from 'react-native';

import * as S from './SiteInfoCard.styles';

interface SiteInfoCardProps {
  id: string;
  userId: string;
  campgroundName: string;
  campgroundSiteNumber: string;
}

// TODO: Display Favorite Icon
// TODO: Display Rating
const SiteInfoCard = ({
  id,
  userId,
  campgroundName,
  campgroundSiteNumber,
}: SiteInfoCardProps) => {
  return (
    <Pressable onPress={() => router.push(`/(user)/site-info/${id}`)}>
      <S.SiteInfoCardContainer>
        <S.Text>{campgroundName}</S.Text>
        <S.Text>{campgroundSiteNumber}</S.Text>
      </S.SiteInfoCardContainer>
    </Pressable>
  );
};

export default SiteInfoCard;
