import { Stack } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import styles from './sign-in.styles';
import { useState } from 'react';
import Button from '../../components/atomic/Button';

// TODO: Add Background Image and update UIs

export const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Log in' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='jon@gmail.com'
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='*****'
        style={styles.input}
        secureTextEntry
      />
      <Button text='Log In' onPress={() => console.log('clicked')}>
        <Text>Sign In</Text>
      </Button>
    </View>
  );
};

export default SignInScreen;
