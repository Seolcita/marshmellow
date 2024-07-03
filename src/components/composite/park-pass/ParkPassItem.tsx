import { format } from 'date-fns';
import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ColorMap from '../../../styles/Color';
import { ParkPassDeleteModal } from './ParkPassDeleteModal';

interface ParkPassItemProps {
  item: any;
  userId: string;
  handleEdit: (initialValue: any) => void;
}

const ParkPassItem = ({ item, userId, handleEdit }: ParkPassItemProps) => {
  const [expiryDate, setExpiryDate] = useState('');
  const [warningMessage, setWarningMessage] = useState<null | string>(null);
  const [isAboutToExpire, setIsAboutToExpire] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const warningDate = 10;

  const expiry = new Date(item.expiry_date + 'T00:00:00');
  const formattedExpiryDate = format(expiry, 'MMMM d, yyyy');

  const remainingDateToExpire = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    const diffTime = Math.ceil(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      isAboutToExpire: diffDays <= warningDate,
      remainingDate: diffDays,
    };
  };

  useEffect(() => {
    setExpiryDate(item.expiry_date);

    const checkExpiry = () => {
      const { isAboutToExpire, remainingDate } =
        remainingDateToExpire(expiryDate);

      if (!isAboutToExpire) {
        setIsAboutToExpire(false);
      } else if (isAboutToExpire) {
        const newWarningMessage =
          remainingDate <= 0
            ? 'Expired'
            : `Park pass will be expired within ${remainingDate} days`;
        setIsAboutToExpire(true);
        setWarningMessage(newWarningMessage);
      }
    };

    checkExpiry();

    const intervalId = setInterval(checkExpiry, 1000 * 60 * 15);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  return (
    <View style={styles.list}>
      <View style={styles.titleContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.iconContainer}>
          <Pressable>
            <AntDesign
              name='edit'
              size={20}
              color='black'
              onPress={() =>
                handleEdit({
                  id: item.id,
                  name: item.name,
                  expiryDate: item.expiry_date,
                })
              }
            />
          </Pressable>
          <Pressable onPress={() => setIsModalOpen((prev) => !prev)}>
            <MaterialIcons name='delete-outline' size={20} color='black' />
          </Pressable>
        </View>
      </View>
      <View>
        <Text>{`Expiry Date: ${formattedExpiryDate}`}</Text>
        {isAboutToExpire && (
          <View style={styles.warningContainer}>
            <Ionicons
              name='warning-outline'
              size={15}
              color={ColorMap['red'].main}
            />
            <Text style={styles.warning}>{warningMessage}</Text>
          </View>
        )}
      </View>
      <ParkPassDeleteModal
        id={item.id}
        userId={userId}
        name={item.name}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </View>
  );
};

export default ParkPassItem;
