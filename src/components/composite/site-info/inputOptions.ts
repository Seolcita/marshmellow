import {
  CampingType,
  CarAccessType,
  Privacy,
  ReservationType,
  SiteSize,
  ToiletType,
} from '../../../types';

export const campingTypesSelectItems = [
  { id: 1, label: 'Front County', value: CampingType.FRONT },
  { id: 2, label: 'Back County', value: CampingType.BACK },
  { id: 3, label: 'Glamping', value: CampingType.GLAMPING },
  { id: 4, label: 'Crown', value: CampingType.CROWN },
];

export const reservationTypesSelectItems = [
  { id: 1, label: 'Reservation', value: ReservationType.RESERVATION },
  {
    id: 2,
    label: 'First Come First Serve (FCFS)',
    value: ReservationType.FCFS,
  },
  { id: 3, label: 'Any', value: ReservationType.ANY },
];

export const carAccessTypesSelectItems = [
  { id: 1, label: 'On Site', value: CarAccessType.ON_SITE },
  { id: 2, label: 'On Site Through', value: CarAccessType.ON_SITE_THROUGH },
  { id: 3, label: 'Parking Lot', value: CarAccessType.PARKING_LOT },
];

export const privacySelectItems = [
  { id: 1, label: 'Poor', value: Privacy.POOR },
  { id: 2, label: 'Bad', value: Privacy.BAD },
  { id: 3, label: 'Average', value: Privacy.AVERAGE },
  { id: 4, label: 'Good', value: Privacy.GOOD },
  { id: 5, label: 'Great', value: Privacy.GREAT },
];

export const siteSizeSelectItems = [
  { id: 1, label: 'Small', value: SiteSize.SMALL },
  { id: 2, label: 'Medium', value: SiteSize.MEDIUM },
  { id: 3, label: 'Large', value: SiteSize.LARGE },
];

export const toiletTypesSelectItems = [
  { id: 1, label: 'Flush', value: ToiletType.FLUSH },
  { id: 2, label: 'Vault', value: ToiletType.VAULT },
];

export const booleanRadioButtonItems = [
  { id: 1, label: 'Yes', value: 'true' },
  { id: 2, label: 'No', value: 'false' },
];
