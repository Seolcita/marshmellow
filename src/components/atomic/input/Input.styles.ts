import { StyleSheet } from 'react-native';
import ColorMap from '../../../styles/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: ColorMap['white'].main,
  },
  input: {
    borderWidth: 1,
    borderColor: ColorMap['white'].main,
    padding: 6,
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: ColorMap['white'].main,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default styles;
