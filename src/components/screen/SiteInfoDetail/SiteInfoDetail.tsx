import { useState } from 'react';
import { Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import ColorMap from '../../../styles/Color';
import * as S from './SiteInfoDetail.styles';
import Button from '../../atomic/button/Button';
import { useCampSiteInfo } from '../../../api/site-info';
import { useAuth } from '../../../providers/AuthProvider';
import SiteInfoDetail from '../../composite/site-info/SiteInfoDetail';
import SiteInfoDetailEdit from '../../composite/site-info/SiteInfoDetailEdit';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetailScreen = ({ id }: SiteInfoDetailProps) => {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [isEditMode, setIsEditMode] = useState(false);

  const { error, isLoading, data: siteInfo } = useCampSiteInfo(id);

  const navigation = useNavigation();

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
