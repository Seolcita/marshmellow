import { useLocalSearchParams } from 'expo-router';
import SharedCheckListScreen from '../../../../../components/screen/SharedCheckList/SharedCheckListScreen';

const SharedCheckListIndex = () => {
  const { id } = useLocalSearchParams();
  let sharedCheckListId: number;

  if (typeof id !== 'string') {
    sharedCheckListId = +id[0];
  } else {
    sharedCheckListId = +id;
  }

  return <SharedCheckListScreen id={sharedCheckListId} />;
};

export default SharedCheckListIndex;
