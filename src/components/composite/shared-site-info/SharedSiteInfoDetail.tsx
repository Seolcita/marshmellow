import { View } from '../../Themed';
import * as S from './SiteInfoDetail.styles';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetail from '../site-info/SiteInfoDetail';
import SiteInfoDetailContents from '../site-info/SiteInfoDetailContents';

interface SharedSiteInfoDetailProps {
  id: string;
}

const SharedSiteInfoDetail = ({ id }: SharedSiteInfoDetailProps) => {
  const { data: siteInfo, error } = useCampSiteInfo(id);

  return (
    <S.Container>
      <S.SiteInfoCardContainer>
        <S.Text>{siteInfo?.campgroundName}</S.Text>
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          <S.Text>{siteInfo?.siteNumber}</S.Text>
        </View>
      </S.SiteInfoCardContainer>
      {siteInfo && <SiteInfoDetailContents siteInfo={siteInfo} />}
    </S.Container>
  );
};

export default SharedSiteInfoDetail;
