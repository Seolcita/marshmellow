import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingLeft: 3,
    marginTop: 10,
  },
  list: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    width: '98%',
    padding: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  noParkPass: {
    fontSize: 18,
    paddingTop: 10,
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
    color: 'red',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default styles;
