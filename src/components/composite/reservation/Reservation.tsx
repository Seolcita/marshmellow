import { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

import { ReservationModal } from '../../composite/reservation/ReservationModal';
import * as S from './Reservation.styles';

export interface InitialValue {
  id: string;
  arrivalDate: string;
  departureDate: Date;
  campgroundName: string;
}

const Reservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <ReservationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default Reservation;
