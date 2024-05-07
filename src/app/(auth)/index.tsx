import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { View } from '@/src/components/Themed';
import Colors from '../../constants/Colors';

export default function AuthIndex() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Link href='/sign-in' style={styles.text}>
          Log In
        </Link>
      </Pressable>
      <Pressable style={styles.button}>
        <Link href='/sign-up' style={styles.text}>
          Sign Up
        </Link>
      </Pressable>
      <Pressable style={styles.button}>
        <Link href='/sign-out' style={styles.text}>
          Log Out
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: Colors.light.tint,
    borderRadius: 100,
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
