import { useLocalSearchParams } from 'expo-router';
import SharedCheckListScreen from '../../../../../components/screen/SharedCheckList/SharedCheckListScreen';

const SharedCheckListIndex = () => {
  const { id } = useLocalSearchParams();
  let siteInfoId: string;

  if (typeof id !== 'string') {
    siteInfoId = id[0];
  } else {
    siteInfoId = id;
  }

  return <SharedCheckListScreen id={siteInfoId} />;
};

export default SharedCheckListIndex;
