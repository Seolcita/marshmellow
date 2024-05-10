import { Alert, Modal, Platform, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { useInsertParkPass, useUpdateParkPass } from '../../../api/park-pass';
import { useAuth } from '../../../providers/AuthProvider';
import Input from '../../atomic/input/Input';
import styles from './ParkPassModal.styles';
import { Text, View } from '../../Themed';
import { ParkPass } from '../../../types';
import { InitialValue } from './ParkPass';

interface ParkPassModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  initialValue?: InitialValue;
}

interface ExpiryDate {
  date: string | null;
  error: string;
}

const ParkPassModal = ({
  isOpen,
  setIsOpen,
  isEdit,
  initialValue,
}: ParkPassModalProps) => {
  const [parkPassName, setParkPassName] = useState({
    name: '',
    error: '',
  });
  const [expiryDate, setExpiryDate] = useState<ExpiryDate>({
    date: null,
    error: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { mutate: insertParkPass } = useInsertParkPass(userId);
  const { mutate: updateParkPass } = useUpdateParkPass(userId);

  useEffect(() => {
    if (isEdit && initialValue) {
      setParkPassName({ name: initialValue.name, error: '' });
      setExpiryDate({ date: initialValue.expiryDate.toString(), error: '' });
    }
  }, [isEdit, initialValue]);

  const handleChange = (date: string) => {
    setShowCalendar(Platform.OS === 'ios');
    setExpiryDate({ date: date, error: '' });
  };

  const validateInputs = () => {
    if (parkPassName.name.length === 0) {
      setParkPassName((prev) => ({
        ...prev,
        error: 'Please enter park pass name',
      }));
      return false;
    }

    if (!expiryDate.date) {
      setExpiryDate((prev) => ({
        ...prev,
        error: 'Pleaes provide a valid expiry date',
      }));

      return false;
    } else if (
      expiryDate?.date &&
      new Date(expiryDate.date + 'z') <= new Date()
    ) {
      setExpiryDate((prev) => ({
        ...prev,
        error: 'Expiry date must be in the future',
      }));

      return false;
    }

    return true;
  };

  const initiate = () => {
    setParkPassName({ name: '', error: '' });
    setExpiryDate({ date: null, error: '' });
    setIsOpen(!isOpen);
  };

  const handleSave = async () => {
    const isValid = validateInputs();

    if (
      !isEdit &&
      isValid &&
      parkPassName.name &&
      expiryDate.date &&
      userId &&
      !!!parkPassName.error &&
      !!!expiryDate.error
    ) {
      insertParkPass({
        item: {
          name: parkPassName.name,
          expiryDate: expiryDate.date.toString(),
        },
        userId,
      });
      initiate();
    }
  };

  const handleEdit = (id: string) => {
    const isValid = validateInputs();

    if (
      isEdit &&
      isValid &&
      parkPassName.name &&
      expiryDate.date &&
      userId &&
      !!!parkPassName.error &&
      !!!expiryDate.error
    ) {
      const updateItem: ParkPass = {
        name: parkPassName.name,
        expiryDate: expiryDate.date,
      };

      updateParkPass({ id, updateItem });
      initiate();
    }
  };

  const handleCancel = () => {
    initiate();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.contents}>
            <Text style={styles.title}>
              {isEdit ? 'Edit Park Passes' : 'Add Park Passes'}
            </Text>
            <Input
              label='Park Pass Name'
              isValid={true}
              textInputConfig={{
                value: parkPassName.name.trim(),
                onChangeText: (text: string) =>
                  setParkPassName({ name: text, error: '' }),
                placeholder: 'Discovery Pass',
                keyboardType: 'default',
              }}
              error={parkPassName.error}
            />
            <View style={styles.dateContainer}>
              <Pressable
                onPress={() => setShowCalendar(!showCalendar)}
                style={styles.dateSection}
              >
                <Text style={styles.text}>Park Pass Expiry Date</Text>
                <FontAwesome name='calendar-plus-o' size={24} color='black' />
              </Pressable>
              <Text
                style={[styles.date, !!expiryDate.error && { color: 'red' }]}
              >
                {expiryDate.date ?? '-'}
              </Text>
              {showCalendar && (
                <Calendar
                  onDayPress={(day) => handleChange(day.dateString)}
                  markedDates={{
                    [expiryDate.date]: {
                      selected: true,
                      marked: true,
                      selectedColor: 'skyblue',
                    },
                  }}
                />
              )}

              <Text style={styles.error}>{expiryDate.error}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              title='Cancle'
              onPress={handleCancel}
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
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ParkPassModal;
