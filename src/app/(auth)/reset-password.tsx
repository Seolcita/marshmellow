import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import ColorMap from '../../styles/Color';
import { Text } from '../../components/Themed';
import { updatePassword } from '../../api/auth';
import Input from '../../components/atomic/input/Input';
import Button from '../../components/atomic/button/Button';

const ResetPassword = () => {
  const [password, setPassword] = useState({
    value: '',
    isValid: true,
    error: '',
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isValid: true,
    error: '',
  });

  const handleResetPassword = async () => {
    console.log('reset password🐶🐶🐶');
    if (password.value.length < 6) {
      setPassword((prevState) => ({
        ...prevState,
        error: 'Password must be at least 6 characters long',
      }));
      return;
    }

    if (confirmPassword.value === '') {
      setConfirmPassword((prevState) => ({
        ...prevState,
        error: 'Please provide Confirm Password.',
      }));
      return;
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword((prevState) => ({
        ...prevState,
        error: 'Passwords do not match',
      }));
      return;
    }

    await updatePassword(password.value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/mm-pp-reset.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Reset Password</Text>
      <Input
        label='New Password'
        isValid={password.isValid}
        textInputConfig={{
          value: password.value,
          onChangeText: (text: string) =>
            setPassword((prevState) => ({
              ...prevState,
              value: text,
              isValid: true,
              error: '',
            })),
          placeholder: 'Enter new password',
          placeholderTextColor: ColorMap['grey'].light,
          secureTextEntry: true,
        }}
        error={password.error}
        borderColor={ColorMap['white'].main}
        labelColor={ColorMap['white'].main}
        errorColor={ColorMap['red'].light}
      />
      <Input
        label='Confirm Password'
        isValid={confirmPassword.isValid}
        textInputConfig={{
          value: confirmPassword.value,
          onChangeText: (text: string) =>
            setConfirmPassword((prevState) => ({
              ...prevState,
              value: text,
              isValid: true,
              error: '',
            })),
          placeholder: 'Confirm new password',
          placeholderTextColor: ColorMap['grey'].light,
          secureTextEntry: true,
        }}
        error={confirmPassword.error}
        borderColor={ColorMap['white'].main}
        labelColor={ColorMap['white'].main}
        errorColor={ColorMap['red'].light}
      />
      <Button
        text='Reset Password'
        onPress={() => handleResetPassword()}
        bgColor={ColorMap['red'].main}
        fullWidth
        borderRadius={5}
        marginVertical={8}
      />
      <View style={styles.PWResetLinkContainer}>
        <MaterialCommunityIcons name='lock-reset' size={20} color='white' />
        <Link href='/request-reset-password'>
          <Text style={styles.boldText}>Request Reset Password Again</Text>
        </Link>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorMap['blue'].dark,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: ColorMap['white'].main,
    marginTop: 20,
    marginBottom: 30,
  },
  error: {
    color: ColorMap['red'].light,
    marginVertical: 10,
  },
  PWResetLinkContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  boldText: {
    fontSize: 16,
    color: ColorMap['white'].main,
    fontWeight: 'bold',
  },
});
