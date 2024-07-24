import { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ParkPassItem from './ParkPassItem';
import ParkPassModal from './ParkPassModal';
import Button from '../../atomic/button/Button';
import { useParkPasses } from '../../../api/park-pass';
import { useAuth } from '../../../providers/AuthProvider';
import { StickyButton } from '../../common-styles/CommonStyles';

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
    <View style={{ position: 'relative', flex: 1 }}>
      <View style={styles.container}>
        <ScrollView overScrollMode='auto' showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 80 }}>
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
        </ScrollView>
      </View>
      <StickyButton>
        <Button
          text='+ Add Park Pass'
          onPress={() => {
            setIsEdit(false), setIsOpen(true);
          }}
          paddingVertical={16}
          paddingHorizontal={24}
        />
      </StickyButton>
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
