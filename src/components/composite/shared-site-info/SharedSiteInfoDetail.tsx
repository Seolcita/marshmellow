import { View } from '../../Themed';
import * as S from './SiteInfoDetail.styles';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetail from '../site-info/SiteInfoDetail';

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
      <SiteInfoDetail id={id} />
    </S.Container>
  );
};

export default SharedSiteInfoDetail;
