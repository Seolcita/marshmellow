import { format } from 'date-fns';
import { Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { View } from '../../Themed';
import * as S from './ReservationDetail.styles';
import * as s from '../../common-styles/CommonStyles';
import { useDeleteSiteInfo } from '../../../api/site-info';

interface ReservationDetail {
  id: string;
  userId: string;
  arrivalDate: string;
  departureDate: string;
  campgroundName: string;
  campgroundSiteNumber: string;
}

interface ReservationDetailProps {
  item: ReservationDetail;
  handleEdit: (initialValue: any) => void;
}

const ResevationDetail = ({
  item: {
    id,
    userId,
    arrivalDate,
    departureDate,
    campgroundName,
    campgroundSiteNumber,
  },
  handleEdit,
}: ReservationDetailProps) => {
  const { mutate: deleteReservation } = useDeleteSiteInfo(userId);

  const handleDelete = (id: string) => {
    deleteReservation(id);
  };

  const arrival = new Date(arrivalDate + 'T00:00:00');
  const departure = new Date(departureDate + 'T00:00:00');
  const dateOfArrival = format(arrival, 'MMMM d');
  const dateOfArrivalWithYeaer = format(arrival, 'MMMM d, yyyy');
  const dateOfDeparture = format(departure, 'MMMM d, yyyy');
  const arrivalYeaer = arrival.getFullYear();
  const departureYear = departure.getFullYear();
  const isSameYear = arrivalYeaer === departureYear;
  const formattedCampingDate = `${
    isSameYear ? dateOfArrival : dateOfArrivalWithYeaer
  }   ~   ${dateOfDeparture}`;

  return (
    <s.Tile>
      <S.Header>
        <S.CampgroundName>{campgroundName}</S.CampgroundName>
        <S.ButtonContainer>
          <Pressable>
            <AntDesign
              name='edit'
              size={20}
              color='black'
              onPress={() =>
                handleEdit({
                  id,
                  arrivalDate,
                  departureDate,
                  campgroundName,
                  campgroundSiteNumber,
                })
              }
            />
          </Pressable>
          <Pressable>
            <MaterialIcons
              name='delete-outline'
              size={20}
              color='black'
              onPress={() => handleDelete(id)}
            />
          </Pressable>
        </S.ButtonContainer>
      </S.Header>
      <View>
        <S.Text>
          Site: {campgroundSiteNumber ? campgroundSiteNumber : 'N/A'}
        </S.Text>
        <S.Text>{formattedCampingDate}</S.Text>
      </View>
    </s.Tile>
  );
};

export default ResevationDetail;
