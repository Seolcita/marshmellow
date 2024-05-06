import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import Button from '../../components/atomic/button/Button';
import Input from '../../components/atomic/input/Input';

// TODO: Add Background Image and update UIs

export const SignInScreen = () => {
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
  });

  const handleInputChange = (inputIdentifier: string, enteredValue: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const handleSubmit = () => {
    const rexec = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmailValid =
      inputs.email.value.length > 0 && rexec.test(inputs.email.value);
    const isPasswordValid = inputs.password.value.length > 6;

    if (!isEmailValid || !isPasswordValid) {
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
    }));
    // SUPABASE: Add login logic here
    console.log('email', inputs.email.value);
    console.log('PW', inputs.password.value);
  };

  const isFormValid = inputs.email.isValid && inputs.password.isValid;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Log in' }} />

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
          placeholder: '*****',
        }}
        error={inputs.password.error}
      />
      <Button text='Log In' onPress={handleSubmit}>
        <Text>Sign In</Text>
      </Button>
    </View>
  );
};

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

export default SignInScreen;
