import { Text, View } from '../../Themed';
import styles from './ParkPass.styles';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useState } from 'react';
import ParkPassModal from './ParkPassModal';

export const ParkPass = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Park Passes</Text>
        <Pressable style={styles.icon} onPress={() => setIsOpen(true)}>
          <Ionicons name='add-circle-outline' size={30} color='black' />
        </Pressable>
      </View>
      <ParkPassModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </View>
  );
};

export default ParkPass;
