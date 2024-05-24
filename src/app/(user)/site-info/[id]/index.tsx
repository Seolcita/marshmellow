import { useLocalSearchParams } from 'expo-router';
import { Text } from '../../../../components/Themed';

const SiteInfoDetail = () => {
  const { id } = useLocalSearchParams();
  return <Text>{id}</Text>;
};

export default SiteInfoDetail;
