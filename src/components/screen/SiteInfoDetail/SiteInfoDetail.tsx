import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { View } from '../../Themed';
import ColorMap from '../../../styles/Color';
import * as S from './SiteInfoDetail.styles';
import Button from '../../atomic/button/Button';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetail from '../../composite/site-info/SiteInfoDetail';
import SiteInfoDetailEdit from '../../composite/site-info/SiteInfoDetailEdit';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetailScreen = ({ id }: SiteInfoDetailProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { error, isLoading, data: siteInfo } = useCampSiteInfo(id);

  const navigation = useNavigation();

  return (
    <>
      <S.TopHeaderContainer>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Ionicons
            name='arrow-back-sharp'
            size={18}
            color={ColorMap['white'].main}
          />
          <S.BackButtonText>Back</S.BackButtonText>
        </S.BackButton>
        <S.ButtonContainer>
          <Button
            onPress={() => setIsEditMode((prev) => !prev)}
            text={isEditMode ? 'View' : 'Edit'}
            borderRadius={5}
            paddingHorizontal={8}
            paddingVertical={4}
            bgColor={ColorMap['white'].main}
            textColor={ColorMap['blue'].dark}
            width={60}
          />
        </S.ButtonContainer>
      </S.TopHeaderContainer>

      <S.Container>
        <S.SiteInfoCardContainer>
          <S.Text>{siteInfo?.campgroundName}</S.Text>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            <S.Text>{siteInfo?.siteNumber}</S.Text>
            {siteInfo?.favourite && (
              <S.FavouriteIcon
                source={require('../../../../assets/images/like.png')}
              />
            )}
          </View>
        </S.SiteInfoCardContainer>
        {isEditMode ? (
          <SiteInfoDetailEdit id={id} setIsEditMode={setIsEditMode} />
        ) : (
          <SiteInfoDetail id={id} />
        )}
      </S.Container>
    </>
  );
};

export default SiteInfoDetailScreen;
