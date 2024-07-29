import { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import ColorMap from '../../styles/Color';
import { signInWithEmailAndPW } from '../../api/auth';
import Input from '../../components/atomic/input/Input';
import Button from '../../components/atomic/button/Button';

export const SignInScreen = () => {
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
  });

  const handleInputChange = (inputIdentifier: string, enteredValue: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const handleSignInWithEmailandPW = async () => {
    setLoading(true);

    signInWithEmailAndPW({
      email: inputs.email.value,
      password: inputs.password.value,
    });

    setLoading(false);
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

    handleSignInWithEmailandPW();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/login-screen.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Welcome Back</Text>

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
      <Button
        text='Log In'
        onPress={handleSubmit}
        disabled={loading}
        bgColor={ColorMap['red'].main}
        fullWidth
        borderRadius={5}
        marginVertical={8}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Link href='/sign-up'>
          <Text style={styles.signupText}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignInScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: ColorMap['blue'].dark,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    color: ColorMap['white'].main,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  inputRow: { flex: 1 },
  textBox: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: ColorMap['blue'].light,
  },
  signupText: {
    color: ColorMap['blue'].light,
    fontWeight: 'bold',
  },
});
