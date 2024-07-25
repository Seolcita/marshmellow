import ColorMap from '../../../../styles/Color';

export interface FilteredSiteInfo {
  id: string;
  userId: string;
  campgroundName: string;
  campgroundSiteNumber?: string;
  rate?: number;
  reservationType?: string;
  share?: boolean;
  imageUrl?: string;
}

export enum FilterType {
  ALL = 'ALL',
  REVIEW1 = 'REVIEW1',
  REVIEW2 = 'REVIEW2',
  REVIEW3 = 'REVIEW3',
  REVIEW4 = 'REVIEW4',
  REVIEW5 = 'REVIEW5',
  RESERVATION = 'RESERVATION',
  FCFS = 'FCFS',
  ANY = 'ANY',
  WISH = 'WISH',
  FAVOURITE = 'FAVOURITE',
  SHARED = 'SHARED',
}

export const reviewFilters = [
  FilterType.REVIEW1,
  FilterType.REVIEW2,
  FilterType.REVIEW3,
  FilterType.REVIEW4,
  FilterType.REVIEW5,
];

export interface ShowReviewed {
  review1: boolean;
  review2: boolean;
  review3: boolean;
  review4: boolean;
  review5: boolean;
}

export const reviewedInitialState: ShowReviewed = {
  review1: false,
  review2: false,
  review3: false,
  review4: false,
  review5: false,
};

export const ReviewMap = (filterType: FilterType) => {
  if (filterType === FilterType.REVIEW1) {
    return 'review1';
  } else if (filterType === FilterType.REVIEW2) {
    return 'review2';
  } else if (filterType === FilterType.REVIEW3) {
    return 'review3';
  } else if (filterType === FilterType.REVIEW4) {
    return 'review4';
  } else {
    return 'review5';
  }
};

export interface HandleReview {
  filterType: FilterType;
  rateValue: number;
}

export const defaultButtonBgColor = ColorMap['grey'].dark;
export const selectedButtonBgColor = ColorMap['yellow'].dark;
