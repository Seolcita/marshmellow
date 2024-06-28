import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable } from 'react-native';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ParkPassItem from './ParkPassItem';
import ParkPassModal from './ParkPassModal';
import { useParkPasses } from '../../../api/park-pass';
import { useAuth } from '../../../providers/AuthProvider';

export interface InitialValue {
  id: string;
  name: string;
  expiryDate: Date;
}

export const ParkPass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValue, setInitialValue] = useState<InitialValue>();

  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const { data, error, isLoading } = useParkPasses(userId);

  if (error) {
    Alert.alert('Fetching park passes failed');
  }

  const handleEdit = (item: InitialValue) => {
    console.log('Edit');
    setIsEdit(true);
    setInitialValue(item);
    setIsOpen(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Image
            source={require('../../../../assets/images/park.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Park Passes</Text>
        </View>
        <Pressable
          onPress={() => {
            setIsEdit(false), setIsOpen(true);
          }}
        >
          <Ionicons name='add-circle-outline' size={30} color='black' />
        </Pressable>
      </View>
      <View>
        {data && data.length <= 0 ? (
          <View style={styles.noParkPassContainer}>
            <Text style={styles.noParkPass}>* Please add Park Passes!</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {data?.map((item) => (
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
