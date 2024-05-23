import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, FlatList } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import * as S from './Reservation.styles';
import ResevationDetail from './ReservationDetail';
import { useAuth } from '../../../providers/AuthProvider';
import { useReservationsInfo } from '../../../api/reservation';
import { ReservationModal } from '../../composite/reservation/ReservationModal';

export interface InitialValue {
  id: string;
  arrivalDate: string;
  departureDate: string;
  campgroundName: string;
  campgroundSiteNumber: string;
}

const Reservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValue, setInitialValue] = useState<InitialValue>();

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }
  const { data, error, isLoading } = useReservationsInfo(userId);

  console.log('DATA🥶🥶🥶🥶🥶', data);
  console.log('INITIAL VALUE🥶', initialValue);

  const handleEdit = (item: InitialValue) => {
    console.log('item 🚙🚙🚙', item); // Add a comma between 'item' and 'item' variable
    setIsEdit(true);
    setInitialValue(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <S.StyledBackground
        source={require('../../../../assets/images/addCamping.png')}
      >
        <S.AddCampinButton onPress={() => setIsModalOpen((prev) => !prev)}>
          <S.AddCampingTripText>
            Add Camping Trip &nbsp;
            <FontAwesome6 name='add' size={18} color='#e1f7f5' />
          </S.AddCampingTripText>
        </S.AddCampinButton>
      </S.StyledBackground>

      <S.TripsContainer>
        <S.Title>Camping Trips</S.Title>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ResevationDetail item={item} handleEdit={handleEdit} />
          )}
        />
      </S.TripsContainer>

      <ReservationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        userId={userId}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        initialValue={initialValue}
      />
    </>
  );
};

export default Reservation;
