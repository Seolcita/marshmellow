import { View } from '../../Themed';
import * as S from './SiteInfoDetail.styles';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetailContents from '../site-info/SiteInfoDetailContents';
import { Stack } from 'expo-router';

interface SharedSiteInfoDetailProps {
  id: string;
}

const SharedSiteInfoDetail = ({ id }: SharedSiteInfoDetailProps) => {
  const { data: siteInfo, error } = useCampSiteInfo(id);

  return (
    <>
      <Stack.Screen
        options={{
          title:
            siteInfo?.campgroundName && siteInfo?.siteNumber
              ? `${siteInfo.campgroundName},  #${siteInfo.siteNumber}`
              : 'Site Info Detail',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <S.Container>
        {siteInfo && <SiteInfoDetailContents siteInfo={siteInfo} />}
      </S.Container>
    </>
  );
};

export default SharedSiteInfoDetail;
