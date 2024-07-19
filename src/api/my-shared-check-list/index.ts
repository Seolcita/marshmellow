import { Alert } from 'react-native';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export interface MySharedCheckList {
  id: string;
  name: string;
  sharedCheckListId: number;
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

export const useMySharedCheckListForAdmin = (id: number) => {
  return useQuery({
    queryKey: ['my_shared_check_list', id],
    queryFn: async () => {
      const { error, data } = await supabase
        .from('my_shared_check_list')
        .select('is_admin, shared_check_list_name')
        .eq('shared_check_list_id', id);

      if (error) {
        console.log('error', error);
        Alert.alert('Failed to fetch shared check list admin info');
        return;
      }

      return {
        isAdmin: data[0].is_admin,
        name: data[0].shared_check_list_name,
      };
    },
  });
};

export const useDeleteMySharedCheckList = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(sharedCheckListId: number) {
      const { error } = await supabase
        .from('my_shared_check_list')
        .delete()
        .eq('shared_check_list_id', sharedCheckListId);

      if (error) {
        Alert.alert('Failed to delete shared check list. Please try again');
        return;
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'my_shared_check_list',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};
