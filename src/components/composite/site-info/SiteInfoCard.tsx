import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { View } from '../../Themed';
import * as S from './SiteInfoCard.styles';
import ColorMap from '../../../styles/Color';

interface SiteInfoCardProps {
  id: string;
  campgroundName: string;
  campgroundSiteNumber?: string;
  favourite?: boolean;
  share?: boolean;
}

const SiteInfoCard = ({
  id,
  campgroundName,
  campgroundSiteNumber,
  favourite,
  share,
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
          {share ? (
            <FontAwesome name='group' size={20} color={ColorMap['blue'].dark} />
          ) : (
            <View style={{ width: 22, height: 20 }}></View>
          )}
        </View>
      </S.SiteInfoCardContainer>
    </Pressable>
  );
};

export default SiteInfoCard;
