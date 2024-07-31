import { useEffect, useState } from 'react';

import { CampSiteInfo } from '../../../types';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetailContents from './SiteInfoDetailContents';
import SiteDetailsSkeleton from '../skeleton/site-detail/SiteDetailsSkeleton';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetail = ({ id }: SiteInfoDetailProps) => {
  const [siteInfo, setSiteInfo] = useState<CampSiteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: siteInfoDetails,
    error,
    isLoading: isSiteInfoLoading,
  } = useCampSiteInfo(id);

  useEffect(() => {
    if (siteInfoDetails) {
      setSiteInfo(siteInfoDetails);
    }
    if (!isSiteInfoLoading) {
      setIsLoading(false);
    }
  }, [siteInfoDetails, isSiteInfoLoading]);

  return !isLoading && siteInfo ? (
    <SiteInfoDetailContents siteInfo={siteInfo} />
  ) : (
    <SiteDetailsSkeleton />
  );
};

export default SiteInfoDetail;
