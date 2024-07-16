import { Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export interface MySharedCheckList {
  id: string;
  name: string;
  sharedCheckListId: string;
}

export const useMySharedCheckList = (userId: string) => {
  return useQuery({
    queryKey: ['my_shared_check_list', userId],
    queryFn: async () => {
      const { error, data } = await supabase
        .from('my_shared_check_list')
        .select()
        .eq('uid', userId);

      if (error) {
        console.log('error', error);
        Alert.alert('Failed to fetch shared check list');
        return;
      }

      const result: MySharedCheckList[] = data.map((item) => {
        return {
          id: item.id,
          name: item.shared_check_list_name,
          sharedCheckListId: item.shared_check_list_id,
        };
      });

      return result;
    },
  });
};
