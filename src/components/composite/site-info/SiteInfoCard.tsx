import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';

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
        <S.TextContainer>
          <S.Text>{campgroundName}</S.Text>
          <S.SiteNumberContainer>
            <Fontisto name='tent' size={14} color={ColorMap['grey'].main} />
            <S.SiteNumberText>
              {campgroundSiteNumber ? campgroundSiteNumber : 'N/A'}
            </S.SiteNumberText>
          </S.SiteNumberContainer>
        </S.TextContainer>
        <View
          style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}
        >
          {share ? (
            <FontAwesome name='group' size={18} color={ColorMap['blue'].dark} />
          ) : (
            <View style={{ width: 18, height: 18 }}></View>
          )}
          {favourite ? (
            <Ionicons
              name='heart-sharp'
              size={20}
              color={ColorMap['red'].main}
            />
          ) : (
            <View style={{ width: 20, height: 20 }}></View>
          )}
        </View>
      </S.SiteInfoCardContainer>
    </Pressable>
  );
};

export default SiteInfoCard;
