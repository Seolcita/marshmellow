import { View, StyleSheet, Alert } from 'react-native';
import { Stack, router } from 'expo-router';

import Button from '../../components/atomic/button/Button';
import { supabase } from '../../lib/supabase';
import Colors from '../../constants/Colors';

// TODO: Delete this screen. It is temporary screen

export const SignOutScreen = () => {
  const handleSubmit = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error logging out:', error.message);
    }
    Alert.alert('Logged out');
    router.push('/(auth)');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Log out' }} />
      <Button text='Log out' onPress={handleSubmit} />
    </View>
  );
};

export default SignOutScreen;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  inputRow: { flex: 1 },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
