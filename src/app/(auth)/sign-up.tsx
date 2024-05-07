import { View, StyleSheet, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';

import Button from '../../components/atomic/button/Button';
import Input from '../../components/atomic/input/Input';
import { supabase } from '../../lib/supabase';
import Colors from '../../constants/Colors';

// TODO: Add Background Image and update UIs

export const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: {
      value: '',
      isValid: true,
      error: '',
    },
    password: {
      value: '',
      isValid: true,
      error: '',
    },
    confirmPassword: {
      value: '',
      isValid: true,
      error: '',
    },
  });

  const handleInputChange = (inputIdentifier: string, enteredValue: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: inputs.email.value,
      password: inputs.password.value,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const handleSubmit = () => {
    const rexec = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmailValid =
      inputs.email.value.length > 0 && rexec.test(inputs.email.value);
    const isPasswordValid = inputs.password.value.length > 6;
    const isConfirmPasswordValid =
      inputs.password.value === inputs.confirmPassword.value;

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      setInputs((prevState) => ({
        email: {
          value: prevState.email.value,
          isValid: isEmailValid,
          error: !isEmailValid ? 'Please enter a valid email address.' : '',
        },
        password: {
          value: prevState.password.value,
          isValid: isPasswordValid,
          error: !isPasswordValid
            ? 'Password must be at least 6 characters long.'
            : '',
        },
        confirmPassword: {
          value: prevState.password.value,
          isValid: isConfirmPasswordValid,
          error: !isConfirmPasswordValid
            ? 'Confirm password does not match with the password.'
            : '',
        },
      }));

      return;
    }

    setInputs((prevState) => ({
      email: {
        value: prevState.email.value,
        isValid: isEmailValid,
        error: '',
      },
      password: {
        value: prevState.password.value,
        isValid: isPasswordValid,
        error: '',
      },
      confirmPassword: {
        value: prevState.password.value,
        isValid: isConfirmPasswordValid,
        error: '',
      },
    }));

    signUpWithEmail();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Input
        label='Email'
        isValid={inputs.email.isValid}
        textInputConfig={{
          value: inputs.email.value.trim(),
          onChangeText: handleInputChange.bind(this, 'email'),
          placeholder: 'john@gmail.com',
          keyboardType: 'email-address',
        }}
        error={inputs.email.error}
      />
      <Input
        label='Password'
        isValid={inputs.password.isValid}
        textInputConfig={{
          value: inputs.password.value,
          onChangeText: handleInputChange.bind(this, 'password'),
          secureTextEntry: true,
          placeholder: '******',
        }}
        error={inputs.password.error}
      />
      <Input
        label='Confirm Password'
        isValid={inputs.confirmPassword.isValid}
        textInputConfig={{
          value: inputs.confirmPassword.value,
          onChangeText: handleInputChange.bind(this, 'confirmPassword'),
          secureTextEntry: true,
          placeholder: '******',
        }}
        error={inputs.confirmPassword.error}
      />
      <Button text='Sign Up' onPress={handleSubmit} disabled={loading} />
    </View>
  );
};

export default SignUpScreen;

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
