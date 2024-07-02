import { Rating } from 'react-native-ratings';

import {
  CampingTypeMap,
  CarAccessTypeMap,
  PrivacyMap,
  ReservationTypeMap,
  SiteSizeMap,
  ToiletTypeMap,
  convertBooleanToString,
  convertCost,
} from './lib/site-info-map';
import { ScrollView } from 'react-native';
import * as S from './SiteInfoDetail.styles';
import SiteInfoDetailItem from './SiteInfoDetailItem';
import { useCampSiteInfo } from '../../../api/site-info';
import RemoteImage from '../../atomic/remote-Image/RemoteImage';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetail = ({ id }: SiteInfoDetailProps) => {
  const { data: siteInfo, error } = useCampSiteInfo(id);

  return (
    <ScrollView>
      {siteInfo?.imageUrl && (
        <S.ImageContainer>
          <RemoteImage path={siteInfo.imageUrl} />
        </S.ImageContainer>
      )}
      <S.SectionTitle>Review</S.SectionTitle>
      <S.ReviewContainer style={{ alignSelf: 'flex-start', paddingLeft: 10 }}>
        <Rating
          imageSize={25}
          readonly
          startingValue={siteInfo?.rating}
          style={{ marginBottom: 15 }}
        />
      </S.ReviewContainer>

      <S.SectionTitle>Campsite Info</S.SectionTitle>

      <SiteInfoDetailItem
        question='Campsite Type'
        answer={
          siteInfo?.campingType ? CampingTypeMap[siteInfo.campingType] : ' - '
        }
      />

      <SiteInfoDetailItem
        question='Campsite Size'
        answer={siteInfo?.siteSize ? SiteSizeMap[siteInfo.siteSize] : ' - '}
      />

      <SiteInfoDetailItem
        question='Campsite Privacy'
        answer={siteInfo?.privacy ? PrivacyMap[siteInfo.privacy] : ' - '}
      />

      <SiteInfoDetailItem
        question='Car Access Type'
        answer={
          siteInfo?.carAccess ? CarAccessTypeMap[siteInfo.carAccess] : ' - '
        }
      />

      <SiteInfoDetailItem
        question='Has Fire Pit'
        answer={convertBooleanToString(siteInfo?.hasFirePit)}
      />

      <SiteInfoDetailItem
        question='Waterfront Site'
        answer={convertBooleanToString(siteInfo?.isWaterfront)}
      />

      <SiteInfoDetailItem
        question='Has phone signal'
        answer={convertBooleanToString(siteInfo?.hasSignal)}
      />

      <SiteInfoDetailItem
        question='Has Electricity Hookup'
        answer={convertBooleanToString(siteInfo?.hasElectricity)}
      />

      <SiteInfoDetailItem
        question='Has Water Hookup'
        answer={convertBooleanToString(siteInfo?.hasWaterHookup)}
      />

      <S.SectionTitle>Campsite Reservation</S.SectionTitle>
      <SiteInfoDetailItem
        question='Booking Method'
        answer={
          siteInfo?.reservation
            ? ReservationTypeMap[siteInfo.reservation]
            : ' - '
        }
      />

      {siteInfo?.reservation !== 'FCFS' && (
        <SiteInfoDetailItem
          question='Reservation Fee'
          answer={convertCost(siteInfo?.reservationFee)}
        />
      )}

      <SiteInfoDetailItem
        question='Campsite Fee Per Night'
        answer={convertCost(siteInfo?.siteFee)}
      />

      <S.SectionTitle>Campground Facilities</S.SectionTitle>
      <SiteInfoDetailItem
        question='Can Purchase Fire Wood'
        answer={convertBooleanToString(siteInfo?.canPurchaseFirewood)}
      />

      {siteInfo?.canPurchaseFirewood !== false && (
        <SiteInfoDetailItem
          question='Fire Wood Provided Unlimitedly'
          answer={convertBooleanToString(siteInfo?.isFirewoodUnlimited)}
        />
      )}

      {siteInfo?.isFirewoodUnlimited !== true && (
        <SiteInfoDetailItem
          question='Fire Wood Price Per Bag'
          answer={convertCost(siteInfo?.firewoodPrice)}
        />
      )}

      <SiteInfoDetailItem
        question='Has Water pumps'
        answer={convertBooleanToString(siteInfo?.hasWater)}
      />

      <SiteInfoDetailItem
        question='Has drinkable water pumps'
        answer={convertBooleanToString(siteInfo?.hasDrinkableWater)}
      />

      <SiteInfoDetailItem
        question='Has Dish Sink'
        answer={convertBooleanToString(siteInfo?.hasSink)}
      />

      <SiteInfoDetailItem
        question='Toilet Type'
        answer={siteInfo?.toilet ? ToiletTypeMap[siteInfo.toilet] : ' - '}
      />

      <SiteInfoDetailItem
        question='Has Shower Facility'
        answer={convertBooleanToString(siteInfo?.hasShower)}
      />

      {siteInfo?.hasShower !== false && (
        <SiteInfoDetailItem
          question='Shower Token Price'
          answer={convertCost(siteInfo?.showerCost)}
        />
      )}

      <SiteInfoDetailItem
        question='Has Shelter'
        answer={convertBooleanToString(siteInfo?.hasShelter)}
      />

      <SiteInfoDetailItem
        question='Has Store'
        answer={convertBooleanToString(siteInfo?.hasStores)}
      />

      <SiteInfoDetailItem
        question='Has Sewer Service'
        answer={convertBooleanToString(siteInfo?.hasSewerService)}
      />

      {siteInfo?.hasSewerService !== false && (
        <SiteInfoDetailItem
          question='Sewer Service Fee'
          answer={convertCost(siteInfo?.sewerServiceFee)}
        />
      )}

      <S.SectionTitle>Park Pass</S.SectionTitle>
      <SiteInfoDetailItem
        question='Need Park Pass'
        answer={convertBooleanToString(siteInfo?.needParkPass)}
      />

      {siteInfo?.needParkPass !== false && (
        <SiteInfoDetailItem
          question='Park Pass Name'
          answer={siteInfo?.parkPassName ?? ' - '}
        />
      )}

      <S.SectionTitle>Additional Information</S.SectionTitle>
      <SiteInfoDetailItem
        question='Additional Notes'
        answer={siteInfo?.note ?? ' - '}
      />
    </ScrollView>
  );
};

export default SiteInfoDetail;
