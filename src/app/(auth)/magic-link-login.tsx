import { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import ColorMap from '../../styles/Color';
import { Text } from '../../components/Themed';
import { sendMagicLink } from '../../api/auth';
import Input from '../../components/atomic/input/Input';
import Button from '../../components/atomic/button/Button';

const MagicLinkLogin = () => {
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

    sendMagicLink(email.value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/mm-pp-request.png')}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login with magic link</Text>
        <Text style={styles.subTitle}>We'll send you a link to login.</Text>
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

export default MagicLinkLogin;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorMap['blue'].dark,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: ColorMap['white'].main,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: ColorMap['white'].main,
    textAlign: 'center',
    marginTop: 20,
  },
});
