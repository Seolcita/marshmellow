import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetailContents from './SiteInfoDetailContents';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetail = ({ id }: SiteInfoDetailProps) => {
  const { data: siteInfo, error } = useCampSiteInfo(id);

  return siteInfo && <SiteInfoDetailContents siteInfo={siteInfo} />;
};

export default SiteInfoDetail;
