import { useState } from 'react';

import { Text } from '../../Themed';
import Reservation from '../../composite/reservation/Reservation';

const ReservationScreen = () => {
  return (
    <>
      <Text>Reservation Screen</Text>
      <Reservation />
    </>
  );
};

export default ReservationScreen;
