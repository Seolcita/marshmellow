import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View } from '../../Themed';
import Button from '../../atomic/button/Button';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetail from '../../composite/site-info/SiteInfoDetail';
import SiteInfoDetailEdit from '../../composite/site-info/SiteInfoDetailEdit';
import * as S from './SiteInfoDetail.styles';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetailScreen = ({ id }: SiteInfoDetailProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { error, isLoading, data: siteInfo } = useCampSiteInfo(id);
  console.log('SITE INFOINFO⭐️', siteInfo);

  return (
    <>
      <S.ButtonContainer>
        <S.Button onPress={() => setIsEditMode((prev) => !prev)}>
          {isEditMode ? (
            <>
              <Feather name='toggle-left' size={24} color='black' />
              <Text>View</Text>
            </>
          ) : (
            <>
              <Feather name='toggle-right' size={24} color='black' />
              <Text> Edit</Text>
            </>
          )}
        </S.Button>
      </S.ButtonContainer>
      <S.Container>
        <S.HeaderContainer>
          <S.Title>{siteInfo?.campgroundName}</S.Title>
          <S.SubTitle>{siteInfo?.siteNumber}</S.SubTitle>
        </S.HeaderContainer>
        <S.MainContainer>
          {isEditMode ? (
            <SiteInfoDetailEdit id={id} />
          ) : (
            <SiteInfoDetail id={id} />
          )}
        </S.MainContainer>
      </S.Container>
    </>
  );
};

export default SiteInfoDetailScreen;
