import { Text, View } from '../../Themed';
import styles from './ParkPass.styles';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Alert, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import ParkPassModal from './ParkPassModal';
import { useParkPasses } from '../../../api/park-pass';
import { useAuth } from '../../../providers/AuthProvider';

export const ParkPass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const { data, error, isLoading } = useParkPasses(userId);
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

  const handleEdit = () => {
    console.log('Delete');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Park Passes</Text>
        <Pressable onPress={() => setIsOpen(true)}>
          <Ionicons name='add-circle-outline' size={30} color='black' />
        </Pressable>
      </View>
      <View>
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
                        onPress={handleEdit}
                      />
                    </Pressable>
                    <Pressable>
                      <MaterialIcons
                        name='delete-outline'
                        size={20}
                        color='black'
                        onPress={handleDelete}
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
          }}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <ParkPassModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </View>
  );
};

export default ParkPass;
