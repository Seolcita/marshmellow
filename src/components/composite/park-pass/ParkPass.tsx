import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, FlatList, Pressable } from 'react-native';

import styles from './ParkPass.styles';
import { Text, View } from '../../Themed';
import ParkPassModal from './ParkPassModal';
import { useAuth } from '../../../providers/AuthProvider';
import { useDeleteParkPass, useParkPasses } from '../../../api/park-pass';

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

  const { mutate: deleteParkPass } = useDeleteParkPass(userId);
  const warningDate = 10;

  if (error) {
    Alert.alert('Fetching park passes failed');
  }

  const remainingDateToExpire = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      isAboutToExpire: diffDays <= warningDate,
      remainingDate: diffDays,
    };
  };

  const handleEdit = (item: InitialValue) => {
    console.log('Edit');
    setIsEdit(true);
    setInitialValue(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete');
    deleteParkPass(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Park Passes</Text>
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
          <Text style={styles.noParkPass}>- Please add Park Passes</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const { isAboutToExpire, remainingDate } = remainingDateToExpire(
                item.expiry_date
              );
              const warningMessage =
                isAboutToExpire && remainingDate < 0
                  ? 'Expired'
                  : `Park pass will be expired within ${remainingDate} days`;

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
                        <Ionicons
                          name='warning-outline'
                          size={15}
                          color='red'
                        />
                        <Text style={styles.warning}>{warningMessage}</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
            contentContainerStyle={styles.listContainer}
          />
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
