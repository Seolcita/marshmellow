import { useLocalSearchParams } from 'expo-router';

import SharedSiteInfoDetail from '../../../../components/composite/shared-site-info/SharedSiteInfoDetail';

const SiteInfoDetailIndex = () => {
  const { id } = useLocalSearchParams();
  let siteInfoId: string;

  if (typeof id !== 'string') {
    siteInfoId = id[0];
  } else {
    siteInfoId = id;
  }

  return <SharedSiteInfoDetail id={siteInfoId} />;
};

export default SiteInfoDetailIndex;
