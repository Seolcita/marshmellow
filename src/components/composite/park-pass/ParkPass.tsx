import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ParkPassItem from './ParkPassItem';
import ParkPassModal from './ParkPassModal';
import ColorMap from '../../../styles/Color';
import { useParkPasses } from '../../../api/park-pass';
import { useAuth } from '../../../providers/AuthProvider';
import ParkPassSkeletons from '../skeleton/park-pass/ParkPassSkeletons';
import IconButton from '../../atomic/icon-button/IconButton';

export interface InitialValue {
  id: string;
  name: string;
  expiryDate: Date;
}

export const ParkPass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValue, setInitialValue] = useState<InitialValue>();
  const [parkPasses, setParkPasses] = useState<InitialValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      const userId = session?.user.id;

      if (!userId) {
        router.push('/(auth)/sign-in');
      } else if (userId) {
        setUserId(userId);
      }
    }
  }, [session]);

  const { data, isLoading: isParkPassLoading } = useParkPasses(userId);

  useEffect(() => {
    if (data) {
      setParkPasses(data);
    }

    if (!isParkPassLoading) {
      setIsLoading(false);
    }
  }, [data, isParkPassLoading]);

  const handleEdit = (item: InitialValue) => {
    console.log('Edit');
    setIsEdit(true);
    setInitialValue(item);
    setIsOpen(true);
  };

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        backgroundColor: ColorMap['grey'].extraLight,
      }}
    >
      <View style={styles.container}>
        <ScrollView
          overScrollMode='auto'
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'transparent' }}
        >
          <View style={{ paddingBottom: 80, backgroundColor: 'transparent' }}>
            {isLoading && <ParkPassSkeletons />}
            {!isLoading && parkPasses && parkPasses.length <= 0 && (
              <View style={styles.noParkPassContainer}>
                <Text style={styles.noParkPass}>Please add Park Passes</Text>
                <Text style={styles.noParkPassDescription}>
                  You can add park passes by clicking Add Park Pass button at
                  the bottom right conner.
                </Text>
              </View>
            )}
            {!isLoading && parkPasses && parkPasses.length > 0 && (
              <View style={styles.listContainer}>
                {userId &&
                  parkPasses?.map((item) => (
                    <ParkPassItem
                      key={item.id}
                      item={item}
                      handleEdit={handleEdit}
                      userId={userId}
                    />
                  ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <IconButton
        icon={
          <FontAwesome5 name='plus' size={16} color={ColorMap['grey'].dark} />
        }
        text='Add Park Pass'
        hasShadow
        onPress={() => {
          setIsEdit(false), setIsOpen(true);
        }}
      />
      {userId && (
        <ParkPassModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={isEdit}
          initialValue={initialValue}
          userId={userId}
        />
      )}
    </View>
  );
};

export default ParkPass;
