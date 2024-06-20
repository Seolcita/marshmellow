import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { Text, View } from '@/src/components/Themed';

export default function AuthIndex() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/first-screen.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Marsh Mellow</Text>
      <Text style={styles.subTitle}>
        Easily organize park passes, gears, favorite campsites, and share
        information with Friends!
      </Text>
      <View style={styles.buttons}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#014d94',
  },
  image: {
    width: 370,
    height: 370,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: 'white',
    fontFamily: 'SpaceMono_400Regular',
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    backgroundColor: 'SpaceMono_400Regular',
  },
  button: {
    padding: 15,
    backgroundColor: '#C62839',
    borderRadius: 100,
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
});
