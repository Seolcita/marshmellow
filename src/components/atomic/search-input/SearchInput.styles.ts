import { StyleSheet } from 'react-native';

import ColorMap from '../../../styles/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorMap['grey'].extraLight,
    marginBottom: 15,
    marginTop: 15,
    width: '85%',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
  },
  input: {
    padding: 6,
    paddingHorizontal: 10,
    color: ColorMap['black'].main,
    borderRadius: 50,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
    backgroundColor: 'transparent',
  },
});

export default styles;
