import { ScrollView } from 'react-native';

import SiteInfoDetailItem from './SiteInfoDetailItem';
import { useCampSiteInfo } from '../../../api/site-info';
import RemoteImage from '../../atomic/remote-Image/RemoteImage';
import SiteInfoDetailContents from './SiteInfoDetailContents';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetail = ({ id }: SiteInfoDetailProps) => {
  const { data: siteInfo, error } = useCampSiteInfo(id);

  return siteInfo && <SiteInfoDetailContents siteInfo={siteInfo} />;
};

export default SiteInfoDetail;
