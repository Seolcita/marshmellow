import { StyleSheet } from 'react-native';

import ColorMap from '../../../styles/Color';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContainer: {
    padding: 2,
    width: '100%',
    backgroundColor: 'transparent',
  },
  list: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 4,
    marginVertical: 5,
    width: '100%',
    padding: 20,
    overflow: 'visible',
    marginBottom: 16,
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  noParkPassContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: ColorMap['white'].main,
    padding: 20,
    borderRadius: 5,
  },
  noParkPass: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  warning: {
    color: ColorMap['red'].main,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default styles;
