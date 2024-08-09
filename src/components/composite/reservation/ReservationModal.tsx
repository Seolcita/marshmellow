import { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { eachDayOfInterval, format } from 'date-fns';

import {
  useInsertReservation,
  useUpdateReservation,
} from '../../../api/reservation';
import Modal from '../../atomic/modal/Modal';
import Input from '../../atomic/input/Input';
import { InitialValue } from './Reservation';
import ColorMap from '../../../styles/Color';
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
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  initialValue?: InitialValue;
  userId: string;
}

export const ReservationModal = ({
  isOpen,
  setIsOpen,
  isEdit,
  setIsEdit,
  initialValue,
  userId,
}: ReservationModalProps) => {
  const [arrivalDate, setArrivalDate] = useState<string | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<string | undefined>(
    undefined
  );
  const [dateError, setDateError] = useState<string | undefined>(undefined);
  const [campgroundName, setCampgroundName] = useState({
    name: '',
    error: '',
  });
  const [campgroundSiteNumber, setCampgroundSiteNumber] = useState({
    siteNumber: '',
    error: '',
  });

  const { mutate: insertReservation } = useInsertReservation(userId);
  const { mutate: updateReservation } = useUpdateReservation(userId);

  useEffect(() => {
    if (isEdit && initialValue) {
      setArrivalDate(initialValue.arrivalDate);
      setDepartureDate(initialValue.departureDate);
      setCampgroundName({ name: initialValue.campgroundName, error: '' });
      setCampgroundSiteNumber({
        siteNumber: initialValue.campgroundSiteNumber,
        error: '',
      });
    }
  }, [isEdit, initialValue]);

  useEffect(() => {
    if (arrivalDate && departureDate) {
      setDateError(undefined);
    }
  }, [arrivalDate, departureDate]);

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
      setDepartureDate(undefined);
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
    setArrivalDate(undefined);
    setDepartureDate(undefined);
    setDateError(undefined);
    setCampgroundName({ name: '', error: '' });
    setCampgroundSiteNumber({ siteNumber: '', error: '' });
    setIsEdit(false);
    setIsOpen(!isOpen);
  };

  const isValidInput = () => {
    if (!arrivalDate || !departureDate) {
      setDateError('Please select arrival and departure dates');
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

    if (
      isValid &&
      arrivalDate &&
      departureDate &&
      campgroundName.name !== '' &&
      dateError === undefined
    ) {
      insertReservation({
        arrivalDate,
        departureDate,
        campgroundName: campgroundName.name,
        campgroundSiteNumber: campgroundSiteNumber?.siteNumber,
        userId,
      });
      initiate();
    }
  };

  const handleEdit = (id: string) => {
    const isValid = isValidInput();

    if (isValid) {
      updateReservation({
        id,
        arrivalDate,
        departureDate,
        campgroundName: campgroundName.name,
        campgroundSiteNumber: campgroundSiteNumber?.siteNumber,
      });
      initiate();
    }
  };

  const handleCancel = () => {
    initiate();
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <S.ModalTitle>
          {isEdit ? 'Edit Camping Trip' : 'Add Camping Trip'}
        </S.ModalTitle>
        <Calendar
          onDayPress={(day) => handleDayPress(day)}
          markingType={'period'}
          markedDates={markedDates}
          style={{ marginBottom: 20 }}
        />
        {dateError && <S.DateErrorText>{dateError}</S.DateErrorText>}
        <S.InputContainer>
          <S.Title> Where do you camp?</S.Title>
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
        <S.InputContainer>
          <S.TextWrapper>
            <S.Title> What is site number?</S.Title>
            <S.Span> (If applicable)</S.Span>
          </S.TextWrapper>
          <Input
            label='Campground Site Number'
            isValid={true}
            textInputConfig={{
              value: campgroundSiteNumber.siteNumber,
              onChangeText: (text: string) =>
                setCampgroundSiteNumber({ siteNumber: text.trim(), error: '' }),
              placeholder: 'C-7',
              keyboardType: 'default',
            }}
            error={campgroundSiteNumber.error}
          />
        </S.InputContainer>
        <S.ButtonContainer>
          <Button
            title='Cancel'
            onPress={() => handleCancel()}
            buttonStyle={{
              backgroundColor: ColorMap['grey'].main,
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
              backgroundColor: ColorMap['blue'].dark,
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
