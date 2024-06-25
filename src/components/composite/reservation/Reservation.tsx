import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView } from 'react-native';

import { View } from '../../Themed';
import * as S from './Reservation.styles';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
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

export enum TripType {
  ALL_TRIPS = 'ALL_TRIPS',
  UPCOMING_TRIPS = 'UPCOMING_TRIPS',
  PAST_TRIPS = 'PAST_TRIPS',
}

const Reservation = () => {
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
  const { data, error, isLoading } = useReservationsInfo(userId);

  const handleEdit = (item: InitialValue) => {
    setIsEdit(true);
    setInitialValue(item);
    setIsModalOpen(true);
  };

  const handleTrips = (tripType: TripType) => {
    if (tripType === TripType.ALL_TRIPS) {
      setShowAllTrips(true);
      setShowUpcomingTrips(false);
      setShowPastTrips(false);
    } else if (tripType === TripType.UPCOMING_TRIPS) {
      setShowAllTrips(false);
      setShowUpcomingTrips(true);
      setShowPastTrips(false);
    } else if (tripType === TripType.PAST_TRIPS) {
      setShowAllTrips(false);
      setShowUpcomingTrips(false);
      setShowPastTrips(true);
    } else {
      return;
    }
  };

  const upComingTrips = data?.filter(
    (item) => new Date(item.arrivalDate) >= new Date()
  );

  const pastTrips = data?.filter(
    (item) => new Date(item.departureDate) < new Date()
  );

  return (
    <S.Container>
      <S.ImageBackgroundContainer>
        <S.ImageBackground
          source={require('../../../../assets/images/trips.png')}
          resizeMode='cover'
        />
      </S.ImageBackgroundContainer>

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
          {showAllTrips &&
            data?.map((item) => (
              <ResevationDetail
                item={item}
                handleEdit={handleEdit}
                key={item.id}
              />
            ))}
          {showUpcomingTrips &&
            upComingTrips?.map((item) => (
              <ResevationDetail
                item={item}
                handleEdit={handleEdit}
                key={item.id}
              />
            ))}
          {showPastTrips &&
            pastTrips?.map((item) => (
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
