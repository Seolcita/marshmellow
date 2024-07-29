import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

import Button from '../../components/atomic/button/Button';
import Input from '../../components/atomic/input/Input';
import { signUpWithEmailAndPW } from '../../api/auth';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import ColorMap from '../../styles/Color';

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
    name: {
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

  async function handleSignUpWithEmailAndPW() {
    setLoading(true);

    signUpWithEmailAndPW({
      email: inputs.email.value,
      password: inputs.password.value,
      name: inputs.name.value,
    });

    setLoading(false);
  }

  const handleSubmit = () => {
    const rexec = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmailValid =
      inputs.email.value.length > 0 && rexec.test(inputs.email.value);
    const isPasswordValid = inputs.password.value.length > 6;
    const isConfirmPasswordValid =
      inputs.password.value === inputs.confirmPassword.value;
    const isNameValid = inputs.name.value.length > 0;

    if (
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isNameValid
    ) {
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
        name: {
          value: prevState.name.value,
          isValid: isNameValid,
          error: !isNameValid ? 'Please enter your name.' : '',
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
      name: {
        value: prevState.name.value,
        isValid: isNameValid,
        error: '',
      },
    }));

    handleSignUpWithEmailAndPW();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: ColorMap['blue'].dark }}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/signup-screen.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Create Account</Text>
        <Input
          label='Name'
          isValid={inputs.name.isValid}
          textInputConfig={{
            value: inputs.name.value.trim(),
            onChangeText: handleInputChange.bind(this, 'name'),
            placeholder: 'john',
            placeholderTextColor: ColorMap['grey'].light,
            keyboardType: 'default',
          }}
          error={inputs.name.error}
          borderColor={ColorMap['white'].main}
          labelColor={ColorMap['white'].main}
          errorColor={ColorMap['red'].light}
        />
        <Input
          label='Email'
          isValid={inputs.email.isValid}
          textInputConfig={{
            value: inputs.email.value.trim(),
            onChangeText: handleInputChange.bind(this, 'email'),
            placeholder: 'john@gmail.com',
            placeholderTextColor: ColorMap['grey'].light,
            keyboardType: 'email-address',
          }}
          error={inputs.email.error}
          borderColor={ColorMap['white'].main}
          labelColor={ColorMap['white'].main}
          errorColor={ColorMap['red'].light}
        />
        <Input
          label='Password'
          isValid={inputs.password.isValid}
          textInputConfig={{
            value: inputs.password.value,
            onChangeText: handleInputChange.bind(this, 'password'),
            secureTextEntry: true,
            placeholder: '******',
            placeholderTextColor: ColorMap['grey'].light,
          }}
          error={inputs.password.error}
          borderColor={ColorMap['white'].main}
          labelColor={ColorMap['white'].main}
          errorColor={ColorMap['red'].light}
        />
        <Input
          label='Confirm Password'
          isValid={inputs.confirmPassword.isValid}
          textInputConfig={{
            value: inputs.confirmPassword.value,
            onChangeText: handleInputChange.bind(this, 'confirmPassword'),
            secureTextEntry: true,
            placeholder: '******',
            placeholderTextColor: ColorMap['grey'].light,
          }}
          error={inputs.confirmPassword.error}
          borderColor={ColorMap['white'].main}
          labelColor={ColorMap['white'].main}
          errorColor={ColorMap['red'].light}
        />
        <Button
          text='Sign Up'
          onPress={handleSubmit}
          disabled={loading}
          bgColor={ColorMap['red'].main}
          borderRadius={5}
          marginVertical={8}
          fullWidth
        />
        <View style={styles.textBox}>
          <Text style={styles.text}>Already have an account?</Text>
          <Link href='/sign-in'>
            <Text style={styles.loginText}>Login</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: ColorMap['blue'].dark,
  },
  image: {
    width: 225,
    height: 225,
    marginTop: 10,
    backgroundColor: ColorMap['blue'].dark,
  },
  title: {
    fontSize: 32,
    color: ColorMap['white'].main,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  inputRow: { flex: 1 },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  textBox: {
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: ColorMap['blue'].light,
  },
  loginText: {
    color: ColorMap['blue'].light,
    fontWeight: 'bold',
  },
});
