import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView } from 'react-native';

import { View } from '../../Themed';
import * as S from './Reservation.styles';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import ResevationDetail from './ReservationDetail';
import { useAuth } from '../../../providers/AuthProvider';
import TripsSkeletons from '../skeleton/trips/TripsSkeletons';
import { useReservationsInfo } from '../../../api/reservation';
import { ReservationModal } from '../../composite/reservation/ReservationModal';

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
      <S.TitleContainer>
        <S.TitleImageContainer>
          <S.Image source={require('../../../../assets/images/combi.png')} />
          <S.Title>Camping Trips</S.Title>
        </S.TitleImageContainer>
        <Pressable onPress={() => setIsModalOpen((prev) => !prev)}>
          <Ionicons name='add-circle-outline' size={30} color='black' />
        </Pressable>
      </S.TitleContainer>
      <S.ButtonsContainer>
        <View style={{ width: '33%' }}>
          <Button
            text='All'
            onPress={() => handleTrips(TripType.ALL_TRIPS)}
            borderRadius={5}
            textSize={16}
            bgColor={
              showAllTrips ? ColorMap['blue'].dark : ColorMap['grey'].main
            }
            paddingVertical={8}
          />
        </View>
        <View style={{ width: '33%' }}>
          <Button
            text='Upcoming'
            onPress={() => handleTrips(TripType.UPCOMING_TRIPS)}
            borderRadius={5}
            textSize={16}
            bgColor={
              showUpcomingTrips ? ColorMap['blue'].dark : ColorMap['grey'].main
            }
            paddingVertical={8}
          />
        </View>
        <View style={{ width: '33%' }}>
          <Button
            text='Past'
            onPress={() => handleTrips(TripType.PAST_TRIPS)}
            borderRadius={5}
            textSize={16}
            bgColor={
              showPastTrips ? ColorMap['blue'].dark : ColorMap['grey'].main
            }
            paddingVertical={8}
          />
        </View>
      </S.ButtonsContainer>
      <S.TripsContainer>
        <ScrollView>
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
