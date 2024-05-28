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

export const convertBooleanToString = (siteInfo: CampSiteInfo) => {
  const convertedSiteInfo: { [key: string]: string | number | undefined } = {};

  for (const key in siteInfo) {
    const value = siteInfo[key as keyof CampSiteInfo];
    if (value === true) {
      convertedSiteInfo[key] = 'true';
    } else if (value === false) {
      convertedSiteInfo[key] = 'false';
    } else {
      convertedSiteInfo[key] = value;
    }
  }

  return convertedSiteInfo;
};

export const convertTypeForInitialValues = (
  siteInfo: CampSiteInfo
): SiteInfoDetail => {
  const convertedBooleanSiteInfo = convertBooleanToString(siteInfo);
  const convertedSiteInfo: SiteInfoDetail = {
    ...convertedBooleanSiteInfo,
    firewoodPrice: siteInfo?.firewoodPrice?.toString(),
    reservationFee: siteInfo?.reservationFee?.toString(),
    sewerServiceFee: siteInfo?.sewerServiceFee?.toString(),
    showerCost: siteInfo?.showerCost?.toString(),
    siteFee: siteInfo?.siteFee?.toString(),
    rating: siteInfo?.rating?.toString(),
  };

  return convertedSiteInfo;
};
