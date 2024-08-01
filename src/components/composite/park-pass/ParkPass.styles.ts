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
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
  },
  contents: {
    padding: 20,
    flex: 1,
    overflow: 'visible',
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: '100%',
    width: 240,
  },
  menuContainer: {
    position: 'absolute',
    height: '100%',
    right: 0,
    top: 0,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonEdit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    backgroundColor: ColorMap['grey'].dark,
  },
  buttonDelete: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    backgroundColor: ColorMap['red'].dark,
    marginRight: 30,
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
