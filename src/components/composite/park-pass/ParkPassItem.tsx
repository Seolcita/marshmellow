import { format } from 'date-fns';
import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ColorMap from '../../../styles/Color';
import { ParkPassDeleteModal } from './ParkPassDeleteModal';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const slideAnim = useSharedValue(240);

  useEffect(() => {
    slideAnim.value = withTiming(isMenuOpen ? 0 : 240, { duration: 300 });
  }, [isMenuOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value }],
    };
  });

  return (
    <View style={styles.list}>
      <View style={styles.contents}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.expiryDateContainer}>
          <FontAwesome5
            name='calendar-alt'
            size={14}
            color={ColorMap['grey'].main}
          />
          <Text
            style={styles.expiryDateText}
          >{`Expires: ${formattedExpiryDate}`}</Text>
        </View>
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
      <View style={styles.iconContainer}>
        <Animated.View
          style={[{ height: '100%', flexDirection: 'row' }, animatedStyle]}
        >
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonEdit}>
              <AntDesign
                name='edit'
                size={20}
                color='white'
                onPress={() =>
                  handleEdit({
                    id: item.id,
                    name: item.name,
                    expiryDate: item.expiry_date,
                  })
                }
              />
            </Pressable>
            <Pressable
              onPress={() => setIsModalOpen((prev) => !prev)}
              style={styles.buttonDelete}
            >
              <MaterialIcons name='delete-outline' size={20} color='white' />
            </Pressable>
          </View>
        </Animated.View>
        <View style={styles.menuContainer}>
          <Pressable onPress={() => setIsMenuOpen((prev) => !prev)}>
            <SimpleLineIcons name='options-vertical' size={20} color='black' />
          </Pressable>
        </View>
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
