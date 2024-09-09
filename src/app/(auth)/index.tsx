import { ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Button from '../../components/atomic/button/Button';
import { space } from '../../styles/tokens/space-token';
import ColorMap from '../../styles/Color';

export default function AuthIndex() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/mm-logo.png')}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Marshmallow</Text>

        <Text style={styles.subTitle}>
          Organize park passes, my checklists, shared checklists, camping plans,
          and share campsite info with fellow campers effortlessly!
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          text='Log In'
          href='/sign-in'
          bgColor='transparent'
          hasBorder
          width={300}
          textSize={16}
          paddingVertical={space.space3}
        />
        <Button
          text='Sign Up'
          href='/sign-up'
          bgColor={ColorMap['red'].main}
          width={300}
          textSize={16}
          paddingVertical={space.space3}
          marginVertical={space.space4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#014d94',
  },
  image: {
    width: 200,
    height: 180,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#014d94',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
  subTitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: '500',
    paddingTop: 20,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    backgroundColor: '#014d94',
  },
});
