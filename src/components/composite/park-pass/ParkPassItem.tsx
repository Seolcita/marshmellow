import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './ParkPass.styles';
import { Pressable } from 'react-native';
import { Text, View } from '../../Themed';
import { useDeleteParkPass } from '../../../api/park-pass';

interface ParkPassItemProps {
  item: any;
  userId: string;
  handleEdit: (initialValue: any) => void;
}

const ParkPassItem = ({ item, userId, handleEdit }: ParkPassItemProps) => {
  const [expiryDate, setExpiryDate] = useState('');
  const [warningMessage, setWarningMessage] = useState<null | string>(null);
  const [isAboutToExpire, setIsAboutToExpire] = useState(false);

  const { mutate: deleteParkPass } = useDeleteParkPass(userId);
  const warningDate = 10;

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

  const handleDelete = (id: string) => {
    deleteParkPass(id);
  };

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
          <Pressable>
            <MaterialIcons
              name='delete-outline'
              size={20}
              color='black'
              onPress={() => handleDelete(item.id)}
            />
          </Pressable>
        </View>
      </View>
      <View>
        <Text>{`Expiry Date: ${item.expiry_date}`}</Text>
        {isAboutToExpire && (
          <View style={styles.warningContainer}>
            <Ionicons name='warning-outline' size={15} color='red' />
            <Text style={styles.warning}>{warningMessage}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ParkPassItem;
