import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ParkPassItem from './ParkPassItem';
import ParkPassModal from './ParkPassModal';
import ColorMap from '../../../styles/Color';
import { useParkPasses } from '../../../api/park-pass';
import { useAuth } from '../../../providers/AuthProvider';
import ParkPassSkeletons from '../skeleton/park-pass/ParkPassSkeletons';
import IconButton from '../../atomic/icon-button/IconButton';
import { FontAwesome5 } from '@expo/vector-icons';

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

  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const { data, error, isLoading: isParkPassLoading } = useParkPasses(userId);

  if (error) {
    Alert.alert('Fetching park passes failed');
  }

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
              </View>
            )}
            {!isLoading && parkPasses && parkPasses.length > 0 && (
              <View style={styles.listContainer}>
                {parkPasses?.map((item) => (
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
      <ParkPassModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        initialValue={initialValue}
      />
    </View>
  );
};

export default ParkPass;
