import {
  CampingType,
  CarAccessType,
  Privacy,
  ReservationType,
  SiteSize,
  ToiletType,
} from '../../../../types';

export const convertBooleanToString = (value: boolean | undefined): string => {
  if (value === undefined) return ' - ';

  return value ? 'Yes' : 'No';
};

export const convertCost = (fee: number | undefined) => {
  if (fee === undefined) return ' - ';

  if (fee <= 0) {
    return 'Free';
  } else {
    return `$ ${fee.toFixed(2)}`;
  }
};

export const CampingTypeMap: Record<CampingType, string> = {
  [CampingType.FRONT]: 'Front County',
  [CampingType.BACK]: 'Back County',
  [CampingType.GLAMPING]: 'Glamping',
  [CampingType.CROWN]: 'Crown Land',
};

export const ReservationTypeMap: Record<ReservationType, string> = {
  [ReservationType.RESERVATION]: 'Reservation',
  [ReservationType.FCFS]: 'First Come First Serve (FCFS)',
  [ReservationType.ANY]: 'Reservation or FCFS',
};

export const CarAccessTypeMap: Record<CarAccessType, string> = {
  [CarAccessType.ON_SITE]: 'On Site',
  [CarAccessType.ON_SITE_THROUGH]: 'On Site Through',
  [CarAccessType.PARKING_LOT]: 'Parking Lot',
};

export const PrivacyMap: Record<Privacy, string> = {
  [Privacy.POOR]: 'Poor',
  [Privacy.BAD]: 'Bad',
  [Privacy.AVERAGE]: 'Average',
  [Privacy.GOOD]: 'Good',
  [Privacy.GREAT]: 'Great',
};

export const SiteSizeMap: Record<SiteSize, string> = {
  [SiteSize.SMALL]: 'Small',
  [SiteSize.MEDIUM]: 'Medium',
  [SiteSize.LARGE]: 'Large',
};

export const ToiletTypeMap: Record<ToiletType, string> = {
  [ToiletType.FLUSH]: 'Flush',
  [ToiletType.VAULT]: 'Vault',
};
