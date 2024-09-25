import { useState } from 'react';
import { Stack } from 'expo-router';

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

  const { isLoading, data: siteInfo } = useCampSiteInfo(id);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: `${siteInfo?.campgroundName},  #${siteInfo?.siteNumber}`,
          headerTitleAlign: 'left',
          headerRight: () => (
            <S.ButtonContainer>
              <Button
                onPress={() => setIsEditMode((prev) => !prev)}
                text={isEditMode ? 'View' : 'Edit'}
                borderRadius={5}
                paddingHorizontal={8}
                paddingVertical={4}
                bgColor={ColorMap['blue'].dark}
                textColor={ColorMap['white'].main}
                width={60}
              />
            </S.ButtonContainer>
          ),
        }}
      />

      <S.Container>
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
