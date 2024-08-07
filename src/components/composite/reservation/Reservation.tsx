import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { View } from '../../Themed';
import * as S from './Reservation.styles';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import ResevationDetail from './ReservationDetail';
import { useAuth } from '../../../providers/AuthProvider';
import TripsSkeletons from '../skeleton/trips/TripsSkeletons';
import { useReservationsInfo } from '../../../api/reservation';
import { ReservationModal } from '../../composite/reservation/ReservationModal';
import { FontAwesome5 } from '@expo/vector-icons';
import IconButton from '../../atomic/icon-button/IconButton';

export interface InitialValue {
  id: string;
  arrivalDate: string;
  departureDate: string;
  campgroundName: string;
  campgroundSiteNumber: string;
  userId: string;
}

export enum TripType {
  ALL_TRIPS = 'ALL_TRIPS',
  UPCOMING_TRIPS = 'UPCOMING_TRIPS',
  PAST_TRIPS = 'PAST_TRIPS',
}

const Reservation = () => {
  const [reservations, setReservations] = useState<InitialValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValue, setInitialValue] = useState<InitialValue>();
  const [showAllTrips, setShowAllTrips] = useState(true);
  const [showUpcomingTrips, setShowUpcomingTrips] = useState(false);
  const [showPastTrips, setShowPastTrips] = useState(false);

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const {
    data,
    error,
    isLoading: isReservationsLoading,
  } = useReservationsInfo(userId);
  useEffect(() => {
    if (data) {
      setReservations(data);
    }
    if (!isReservationsLoading) {
      setIsLoading(false);
    }
  }, [data, isReservationsLoading]);

  const handleEdit = (item: InitialValue) => {
    setIsEdit(true);
    setInitialValue(item);
    setIsModalOpen(true);
  };

  const initaializeState = () => {
    setShowAllTrips(false);
    setShowUpcomingTrips(false);
    setShowPastTrips(false);
  };

  const handleTrips = (tripType: TripType) => {
    initaializeState();

    if (tripType === TripType.ALL_TRIPS) {
      setShowAllTrips(true);
      data && setReservations(data);
    } else if (tripType === TripType.UPCOMING_TRIPS) {
      setShowUpcomingTrips(true);
      const upComingTrips = data?.filter(
        (item) => new Date(item.arrivalDate) >= new Date()
      );
      upComingTrips && setReservations(upComingTrips);
    } else if (tripType === TripType.PAST_TRIPS) {
      setShowPastTrips(true);
      const pastTrips = data?.filter(
        (item) => new Date(item.departureDate) < new Date()
      );
      pastTrips && setReservations(pastTrips);
    } else {
      return;
    }
  };

  return (
    <S.Container>
      <IconButton
        icon={
          <FontAwesome5 name='plus' size={16} color={ColorMap['grey'].dark} />
        }
        text='Add Trip'
        hasShadow
        onPress={() => setIsModalOpen((prev) => !prev)}
      />

      <S.ButtonsContainer>
        <View style={{ width: '33.3%' }}>
          <Button
            text='All'
            onPress={() => handleTrips(TripType.ALL_TRIPS)}
            borderRadius={5}
            textSize={16}
            paddingVertical={16}
            isTab={showAllTrips}
            textColor={
              showAllTrips ? ColorMap['blue'].dark : ColorMap['grey'].main
            }
            bgColor='white'
          />
        </View>
        <View style={{ width: '33.4%' }}>
          <Button
            text='Upcoming'
            onPress={() => handleTrips(TripType.UPCOMING_TRIPS)}
            borderRadius={5}
            textSize={16}
            paddingVertical={16}
            isTab={showUpcomingTrips}
            textColor={
              showUpcomingTrips ? ColorMap['blue'].dark : ColorMap['grey'].main
            }
            bgColor='white'
          />
        </View>
        <View style={{ width: '33.3%' }}>
          <Button
            text='Past'
            onPress={() => handleTrips(TripType.PAST_TRIPS)}
            borderRadius={5}
            textSize={16}
            paddingVertical={16}
            isTab={showPastTrips}
            textColor={
              showPastTrips ? ColorMap['blue'].dark : ColorMap['grey'].main
            }
            bgColor='white'
          />
        </View>
      </S.ButtonsContainer>
      <S.TripsContainer>
        <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
          {isLoading && <TripsSkeletons />}
          {!isLoading && reservations.length === 0 && (
            <S.NoTripsContainer>
              <S.NoTripsText>Please add Trips</S.NoTripsText>
            </S.NoTripsContainer>
          )}
          {!isLoading &&
            reservations.length > 0 &&
            reservations?.map((item) => (
              <ResevationDetail
                item={item}
                handleEdit={handleEdit}
                key={item.id}
              />
            ))}
          <S.Space />
        </ScrollView>
      </S.TripsContainer>

      <ReservationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        userId={userId}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        initialValue={initialValue}
      />
    </S.Container>
  );
};

export default Reservation;
