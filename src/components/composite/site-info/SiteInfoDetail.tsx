import { Rating } from 'react-native-ratings';

import { Text, View } from '../../Themed';
import * as S from './SiteInfoDetail.styles';
import { useCampSiteInfo } from '../../../api/site-info';
import SiteInfoDetailItem from './SiteInfoDetailItem';
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

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetail = ({ id }: SiteInfoDetailProps) => {
  const { data: siteInfo, error } = useCampSiteInfo(id);

  return (
    <>
      <View>
        <Rating
          imageSize={30}
          readonly
          startingValue={siteInfo?.rating}
          style={{ margin: 15 }}
        />
        <S.SectionTitle>Campsite Info</S.SectionTitle>

        <SiteInfoDetailItem
          question='1. What is the campsite type?'
          answer={
            siteInfo?.campingType ? CampingTypeMap[siteInfo.campingType] : ' - '
          }
        />

        <SiteInfoDetailItem
          question='2. What is the campsite size?'
          answer={siteInfo?.siteSize ? SiteSizeMap[siteInfo.siteSize] : ' - '}
        />

        <SiteInfoDetailItem
          question='3. How is the campsite privacy?'
          answer={siteInfo?.privacy ? PrivacyMap[siteInfo.privacy] : ' - '}
        />

        <SiteInfoDetailItem
          question='4. What is the car access type?'
          answer={
            siteInfo?.carAccess ? CarAccessTypeMap[siteInfo.carAccess] : ' - '
          }
        />

        <SiteInfoDetailItem
          question='5. Is there a fire pit?'
          answer={convertBooleanToString(siteInfo?.hasFirePit)}
        />

        <SiteInfoDetailItem
          question='6. Is the camp site waterfront?'
          answer={convertBooleanToString(siteInfo?.isWaterfront)}
        />

        <SiteInfoDetailItem
          question='7. Is there phone signal?'
          answer={convertBooleanToString(siteInfo?.hasSignal)}
        />

        <SiteInfoDetailItem
          question='8. Is there a electricity hookup?'
          answer={convertBooleanToString(siteInfo?.hasElectricity)}
        />

        <SiteInfoDetailItem
          question='9. Is there a water hookup?'
          answer={convertBooleanToString(siteInfo?.hasWaterHookup)}
        />

        <S.SectionTitle>Campsite Reservation</S.SectionTitle>
        <SiteInfoDetailItem
          question='10. What is the booking method?'
          answer={
            siteInfo?.reservation
              ? ReservationTypeMap[siteInfo.reservation]
              : ' - '
          }
        />

        {siteInfo?.reservation !== 'FCFS' && (
          <SiteInfoDetailItem
            question='10-1. How much is reservation fee?'
            answer={`$ ${siteInfo?.reservationFee?.toFixed(2)}` ?? ' - '}
          />
        )}

        <SiteInfoDetailItem
          question='11. How much is campsite fee?'
          answer={`$ ${siteInfo?.siteFee?.toFixed(2)}` ?? ' - '}
        />

        <S.SectionTitle>Campground Facilities</S.SectionTitle>
        <SiteInfoDetailItem
          question='12. Can I purchase fire wood??'
          answer={convertBooleanToString(siteInfo?.canPurchaseFirewood)}
        />

        {siteInfo?.canPurchaseFirewood !== false && (
          <SiteInfoDetailItem
            question='12-1. Is fire wood provided unlimitedly?'
            answer={convertBooleanToString(siteInfo?.isFirewoodUnlimited)}
          />
        )}

        {siteInfo?.isFirewoodUnlimited !== true && (
          <SiteInfoDetailItem
            question='12-2. How much is fire wood per bag?'
            answer={convertCost(siteInfo?.firewoodPrice)}
          />
        )}

        <SiteInfoDetailItem
          question='13. Are there water pumps'
          answer={convertBooleanToString(siteInfo?.hasWater)}
        />

        <SiteInfoDetailItem
          question='14. Are there drinkable water pumps?'
          answer={convertBooleanToString(siteInfo?.hasDrinkableWater)}
        />

        <SiteInfoDetailItem
          question='15. Is there dish sink?'
          answer={convertBooleanToString(siteInfo?.hasSink)}
        />

        <SiteInfoDetailItem
          question='16. What is toilet type?'
          answer={siteInfo?.toilet ? ToiletTypeMap[siteInfo.toilet] : ' - '}
        />

        <SiteInfoDetailItem
          question='17. Is there shower facility?'
          answer={convertBooleanToString(siteInfo?.hasShower)}
        />

        {siteInfo?.hasShower !== false && (
          <SiteInfoDetailItem
            question='17-1. How much is shower token?'
            answer={convertCost(siteInfo?.showerCost)}
          />
        )}

        <SiteInfoDetailItem
          question='18. Is there shelter?'
          answer={convertBooleanToString(siteInfo?.hasShelter)}
        />

        <SiteInfoDetailItem
          question='19. Is there store?'
          answer={convertBooleanToString(siteInfo?.hasStores)}
        />

        <SiteInfoDetailItem
          question='20. Is there sewer service?'
          answer={convertBooleanToString(siteInfo?.hasSewerService)}
        />

        {siteInfo?.hasSewerService !== false && (
          <SiteInfoDetailItem
            question='20-1. How much is sewer service fee?'
            answer={convertCost(siteInfo?.sewerServiceFee)}
          />
        )}

        <S.SectionTitle>Park Pass</S.SectionTitle>
        <SiteInfoDetailItem
          question='21. Does campground need a park pass?'
          answer={convertBooleanToString(siteInfo?.needParkPass)}
        />

        {siteInfo?.needParkPass !== false && (
          <SiteInfoDetailItem
            question='21-1. What is the name of park pass?'
            answer={siteInfo?.parkPassName ?? ' - '}
          />
        )}

        <S.SectionTitle>Additional Information</S.SectionTitle>
        <SiteInfoDetailItem
          question='22. Any additional notes?'
          answer={siteInfo?.note ?? ' - '}
        />
      </View>
    </>
  );
};

export default SiteInfoDetail;
