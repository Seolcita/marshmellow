import { useState } from 'react';
import { Alert, Modal, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

import Input from '../../atomic/input/Input';
import styles from './ParkPassModal.styles';
import { Text, View } from '../../Themed';
import { Button } from 'react-native-elements';
import { useInsertParkPass } from '../../../park-pass';
import { useAuth } from '../../../providers/AuthProvider';
import { router } from 'expo-router';

interface ParkPassModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface ExpiryDate {
  date: Date | null;
  error: string;
}

const ParkPassModal = ({ isOpen, setIsOpen }: ParkPassModalProps) => {
  const [parkPassName, setParkPassName] = useState({
    name: '',
    error: '',
  });
  const [expiryDate, setExpiryDate] = useState<ExpiryDate>({
    date: null,
    error: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { mutate: insertParkPass } = useInsertParkPass(userId);

  const handleChange = (_event: any, selectedDate: any) => {
    setShowDatePicker(Platform.OS === 'ios');
    setExpiryDate((prev) => ({ date: selectedDate, error: '' }));
  };

  const handleSave = async () => {
    if (parkPassName.name.length === 0) {
      setParkPassName((prev) => ({
        ...prev,
        error: 'Please enter park pass name',
      }));
    }

    if (!expiryDate.date) {
      setExpiryDate((prev) => ({
        ...prev,
        error: 'Pleaes provide a valid expiry date',
      }));

      return;
    } else if (expiryDate?.date && expiryDate.date <= new Date()) {
      setExpiryDate((prev) => ({
        ...prev,
        error: 'Expiry date must be in the future',
      }));

      return;
    }

    //Save Park Pass Info to database

    if (parkPassName.name && expiryDate.date && userId) {
      insertParkPass({
        item: {
          name: parkPassName.name,
          expiryDate: expiryDate.date?.toISOString(),
        },
        userId,
      });
    }

    if (!!!parkPassName.error && !!!expiryDate.error) setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setIsOpen(!isOpen);
    setParkPassName({ name: '', error: '' });
    setExpiryDate({ date: null, error: '' });
  };

  const formattedDate =
    expiryDate.date &&
    expiryDate.date.toDateString().split(' ').slice(1).join(' ');

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
            <Text style={styles.title}>Add Park Passes</Text>
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
                onPress={() => setShowDatePicker(!showDatePicker)}
                style={styles.dateSection}
              >
                <Text style={styles.text}>Park Pass Expiry Date</Text>
                <FontAwesome name='calendar-plus-o' size={24} color='black' />
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={expiryDate.date || new Date()}
                  mode='date'
                  display='default'
                  onChange={handleChange}
                />
              )}
              <Text
                style={[styles.date, !!expiryDate.error && { color: 'red' }]}
              >
                {formattedDate ?? '-'}
              </Text>

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
              onPress={handleSave}
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
