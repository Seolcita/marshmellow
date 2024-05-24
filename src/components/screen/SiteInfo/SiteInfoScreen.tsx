import { router } from 'expo-router';
import { Alert, FlatList } from 'react-native';

import { useAuth } from '../../../providers/AuthProvider';
import { useCampSitesPartialInfo } from '../../../api/site-info';
import SiteInfoCard from '../../composite/site-info/SiteInfoCard';

const SiteInfoScreen = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { data, error, isLoading } = useCampSitesPartialInfo(userId);

  return (
    <>
      {/* TODO: Add Search Box */}
      {/* TODO: Add Filter / Sort Options */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SiteInfoCard
            id={item.id}
            userId={item.userId}
            campgroundName={item.campgroundName}
            campgroundSiteNumber={item.campgroundSiteNumber}
          />
        )}
      />
    </>
  );
};

export default SiteInfoScreen;
