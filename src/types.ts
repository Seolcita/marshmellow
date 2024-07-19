import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export interface ParkPass {
  name: string;
  expiryDate: string;
}

export interface Category {
  name: string;
  id: string;
}

export interface CheckList {
  name: string;
  id: string;
  categoryId: string;
  checked: boolean;
}

export enum CampingType {
  FRONT = 'FRONT',
  BACK = 'BACK',
  GLAMPING = 'GLAMPING',
  CROWN = 'CROWN',
}

export enum ReservationType {
  RESERVATION = 'RESERVATION',
  FCFS = 'FCFS',
  ANY = 'ANY',
}

export enum CarAccessType {
  ON_SITE = 'ON_SITE',
  ON_SITE_THROUGH = 'ON_SITE_THROUGH',
  PARKING_LOT = 'PARKING_LOT',
}

export enum Privacy {
  POOR = 'POOR',
  BAD = 'BAD',
  AVERAGE = 'AVERAGE',
  GOOD = 'GOOD',
  GREAT = 'GREAT',
}

export enum SiteSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum ToiletType {
  FLUSH = 'FLUSH',
  VAULT = 'VAULT',
}

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface CampSiteInfo {
  id?: string;
  arrivalDate?: string;
  campgroundName?: string;
  campingType?: CampingType;
  canPurchaseFirewood?: boolean;
  carAccess?: CarAccessType;
  departureDate?: string;
  favourite?: boolean;
  firewoodPrice?: number;
  hasDrinkableWater?: boolean;
  hasElectricity?: boolean;
  hasFirePit?: boolean;
  hasSewerService?: boolean;
  hasShower?: boolean;
  hasSignal?: boolean;
  hasSink?: boolean;
  hasStores?: boolean;
  hasShelter?: boolean;
  isFirewoodUnlimited?: boolean;
  isWaterfront?: boolean;
  imageUrl?: string;
  needParkPass?: boolean;
  note?: string;
  parkPassName?: string;
  privacy?: Privacy;
  rating?: number;
  reservationFee?: number;
  showerCost?: number;
  siteFee?: number;
  siteNumber?: number;
  siteSize?: SiteSize;
  share?: boolean;
  toilet?: ToiletType;
  userId?: string;
  hasWater?: boolean;
  hasWaterHookup?: boolean;
  reservation?: ReservationType;
  sewerServiceFee?: number;
}

export interface Invitation {
  id?: number;
  inviterId: string;
  inviteeEmail: string;
  inviteeName: string;
  sharedCheckListId: number;
  sharedCheckListName: string;
  status?: InvitationStatus;
  isHidden?: boolean;
}
