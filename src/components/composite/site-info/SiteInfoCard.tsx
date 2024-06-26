import { router } from 'expo-router';
import { Pressable } from 'react-native';

import * as S from './SiteInfoCard.styles';
import { View } from '../../Themed';

interface SiteInfoCardProps {
  id: string;
  userId: string;
  campgroundName: string;
  campgroundSiteNumber: string;
  favourite: boolean;
}

const SiteInfoCard = ({
  id,
  userId,
  campgroundName,
  campgroundSiteNumber,
  favourite,
}: SiteInfoCardProps) => {
  return (
    <Pressable onPress={() => router.push(`/(user)/site-info/${id}`)}>
      <S.SiteInfoCardContainer>
        <S.Text>{campgroundName}</S.Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <S.Text>{campgroundSiteNumber}</S.Text>
          {favourite ? (
            <S.FavouriteIcon
              source={require('../../../../assets/images/like.png')}
            />
          ) : (
            <View style={{ width: 22, height: 20 }}></View>
          )}
        </View>
      </S.SiteInfoCardContainer>
    </Pressable>
  );
};

export default SiteInfoCard;
