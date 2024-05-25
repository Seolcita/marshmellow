import { useLocalSearchParams } from 'expo-router';

import SiteInfoDetailScreen from '../../../../components/screen/SiteInfoDetail/SiteInfoDetail';

const SiteInfoDetailIndex = () => {
  const { id } = useLocalSearchParams();
  let siteInfoId: string;

  if (typeof id !== 'string') {
    siteInfoId = id[0];
  } else {
    siteInfoId = id;
  }

  return <SiteInfoDetailScreen id={siteInfoId} />;
};

export default SiteInfoDetailIndex;
