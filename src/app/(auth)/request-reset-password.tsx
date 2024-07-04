import { useState } from 'react';
import * as Linking from 'expo-linking';
import { useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet, ImageBackground, Pressable } from 'react-native';

import ColorMap from '../../styles/Color';
import { Text } from '../../components/Themed';
import Input from '../../components/atomic/input/Input';
import Button from '../../components/atomic/button/Button';
import { resetPasswordForEmail } from '../../api/auth';

const RequestResetPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState({
    value: '',
    isValid: true,
    error: '',
  });

  const handleInputChange = (value: string) => {
    if (email.error) {
      setEmail((prevState) => ({
        ...prevState,
        isValid: true,
        error: '',
      }));
    }

    setEmail((prevState) => ({
      ...prevState,
      value,
    }));
  };

  const handleSubmit = () => {
    const rexec = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmailValid = email.value.length > 0 && rexec.test(email.value);

    if (!isEmailValid) {
      setEmail((prevState) => ({
        ...prevState,
        isValid: isEmailValid,
        error: 'Please enter a valid email address.',
      }));

      return;
    }

    setEmail((prevState) => ({
      value: prevState.value,
      isValid: isEmailValid,
      error: '',
    }));

    resetPassword(email.value);
  };

  const resetPassword = async (email: string) => {
    const resetPasswordURL = Linking.createURL(
      '/com.supabase://reset-password'
    );

    const { data, error } = await resetPasswordForEmail({
      email,
      redirectTo: resetPasswordURL,
    });

    console.log('Reset PW🐶', data, error);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>
      <ImageBackground
        source={require('../../../assets/images/reset-pw.png')}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Request Reset Password</Text>
        <Text style={styles.subTitle}>
          We'll send you a link to reset your password. Follow the instructions
          in the email to regain access to your account.
        </Text>
      </View>

      <Input
        label='Email'
        isValid={email.isValid}
        textInputConfig={{
          value: email.value.trim(),
          onChangeText: handleInputChange,
          placeholder: 'john@gmail.com',
          placeholderTextColor: ColorMap['grey'].light,
          keyboardType: 'email-address',
        }}
        error={email.error}
        borderColor={ColorMap['white'].main}
        labelColor={ColorMap['white'].main}
        errorColor={ColorMap['red'].light}
      />
      <Button
        text='Submit'
        onPress={handleSubmit}
        bgColor={ColorMap['red'].main}
        fullWidth
        borderRadius={5}
        marginVertical={8}
      />
    </View>
  );
};

export default RequestResetPassword;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: ColorMap['blue'].dark,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  titleContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: ColorMap['white'].main,
  },
  subTitle: {
    fontSize: 16,
    color: ColorMap['white'].main,
    textAlign: 'center',
    marginTop: 20,
  },
});
