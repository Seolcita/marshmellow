import { CampSiteInfo } from '../../../../types';
import { SiteInfoDetail } from '../SiteInfoDetailEdit';

export const convertStringToBoolean = (siteInfo: SiteInfoDetail) => {
  const convertedSiteInfo: { [key: string]: string | boolean | undefined } = {};

  for (const key in siteInfo) {
    const value = siteInfo[key];
    if (value === 'true') {
      convertedSiteInfo[key] = true;
    } else if (value === 'false') {
      convertedSiteInfo[key] = false;
    } else {
      convertedSiteInfo[key] = value;
    }
  }

  return convertedSiteInfo;
};

export const convertType = (siteInfo: SiteInfoDetail): CampSiteInfo => {
  const convertedBooleanSiteInfo = convertStringToBoolean(siteInfo);

  const convertedSiteInfo = {
    ...convertedBooleanSiteInfo,
    firewood_price: Number(siteInfo.firewoodPrice),
    reservationFee: Number(siteInfo.reservationFee),
    sewerServiceFee: Number(siteInfo.sewerServiceFee),
    showerCost: Number(siteInfo.showerCost),
    siteFee: Number(siteInfo.siteFee),
    rating: Number(siteInfo.rating),
  };

  return convertedSiteInfo;
};
