import { useState } from 'react';
import { Button } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { eachDayOfInterval, format } from 'date-fns';

import Modal from '../../atomic/modal/Modal';
import Input from '../../atomic/input/Input';
import { InitialValue } from './Reservation';
import * as S from './ReservationModal.styles';

type Day = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

interface ReservationModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  initialValue?: InitialValue;
}

export const ReservationModal = ({
  isOpen,
  setIsOpen,
  isEdit,
  initialValue,
}: ReservationModalProps) => {
  const [arrivalDate, setArrivalDate] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [campgroundName, setCampgroundName] = useState({
    name: '',
    error: '',
  });

  const getDatesBetween = (start: string, end: string) => {
    let dates = eachDayOfInterval({
      start: new Date(start + 'T00:00:00'),
      end: new Date(end),
    });

    return dates.map((date) => format(date, 'yyyy-MM-dd'));
  };

  const handleDayPress = (day: Day) => {
    if (!arrivalDate || (arrivalDate && departureDate)) {
      setArrivalDate(day.dateString);
      setDepartureDate(null);
    } else if (!departureDate) {
      setDepartureDate(day.dateString);
    }
  };

  let markedDates = {};

  if (arrivalDate && departureDate) {
    const datesBetween = getDatesBetween(arrivalDate, departureDate);

    datesBetween.forEach((date) => {
      markedDates = {
        ...markedDates,
        [date]: { color: 'skyblue', textColor: 'white' },
      };
    });

    markedDates = {
      ...markedDates,
      [arrivalDate]: {
        startingDay: true,
        color: 'skyblue',
        textColor: 'white',
      },
      [departureDate]: {
        endingDay: true,
        color: 'skyblue',
        textColor: 'white',
      },
    };
  } else if (arrivalDate) {
    markedDates = {
      [arrivalDate]: { selected: true, color: 'skyblue', textColor: 'white' },
    };
  }

  const initiate = () => {
    setArrivalDate(null);
    setDepartureDate(null);
    setCampgroundName({ name: '', error: '' });
    setIsOpen(!isOpen);
  };

  const isValidInput = () => {
    if (!arrivalDate || !departureDate) {
      setCampgroundName({
        ...campgroundName,
        error: 'Please select arrival and departure dates',
      });
      return false;
    }

    if (campgroundName.name === '') {
      setCampgroundName({
        ...campgroundName,
        error: 'Please enter a campground name',
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    const isValid = isValidInput();

    console.log('Arrival Date:', arrivalDate);
    console.log('Departure Date:', departureDate);
    console.log('Campground Name:', campgroundName.name);

    if (isValid) {
      // SAVE TO DB
      initiate();
    }
  };

  const handleEdit = (id: string) => {
    const isValid = isValidInput();

    console.log('Arrival Date:', arrivalDate);
    console.log('Departure Date:', departureDate);
    console.log('Campground Name:', campgroundName.name);

    if (isValid) {
      // Edit TO DB
      initiate();
    }
  };

  const handleCancel = () => {
    initiate();
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <S.ModalTitle>Add Camping Trip</S.ModalTitle>
        <Calendar
          onDayPress={(day) => handleDayPress(day)}
          markingType={'period'}
          markedDates={markedDates}
        />
        <S.InputContainer>
          <S.Title> Q. What do you camp?</S.Title>
          <Input
            label='Campground Name'
            isValid={true}
            textInputConfig={{
              value: campgroundName.name,
              onChangeText: (text: string) =>
                setCampgroundName({ name: text.trim(), error: '' }),
              placeholder: 'Two Jack Lakeside',
              keyboardType: 'default',
            }}
            error={campgroundName.error}
          />
        </S.InputContainer>
        <S.ButtonContainer>
          <Button
            title='Cancel'
            onPress={() => handleCancel()}
            buttonStyle={{
              backgroundColor: 'grey',
              borderRadius: 5,
              padding: 10,
            }}
            containerStyle={{ flex: 1, marginRight: 2 }}
          />
          <Button
            title='Save'
            onPress={
              isEdit && initialValue
                ? () => handleEdit(initialValue.id)
                : handleSave
            }
            buttonStyle={{
              backgroundColor: 'black',
              borderRadius: 5,
              marginBottom: 10,
              padding: 10,
            }}
            containerStyle={{ flex: 1, marginLeft: 2 }}
          />
        </S.ButtonContainer>
      </Modal>
    </>
  );
};
