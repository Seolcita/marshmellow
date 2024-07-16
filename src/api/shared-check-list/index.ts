import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Alert } from 'react-native';

import { supabase } from '../../lib/supabase';

interface InsertSharedCheckList {
  name: string;
  adminEmail: string;
}

export const useInsertSharedCheckList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ name, adminEmail }: InsertSharedCheckList) {
      const { error, data: addedSharedCheckList } = await supabase
        .from('shared_check_list')
        .insert({
          name: name,
          admin: adminEmail,
        })
        .select();

      if (error) {
        Alert.alert('Failed to Creat shared check list. Please try again');
        return;
      }

      if (addedSharedCheckList) {
        const id = addedSharedCheckList[0].id;
        const name = addedSharedCheckList[0].name;

        const { error, data: addedMySharedCheckList } = await supabase
          .from('my_shared_check_list')
          .insert({
            shared_check_list_id: id,
            shared_check_list_name: name,
            is_admin: true,
          })
          .select();

        // if error occurs, delete the shared_check_list
        if (error) {
          Alert.alert('Failed to add shared check list. Please try again');

          const { error: deletingError } = await supabase
            .from('shared_check_list')
            .delete()
            .match({ id });

          console.log('deletingError', deletingError);

          return;
        }

        console.log('addedMySharedCheckList🚙', addedMySharedCheckList);
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'shared_check_list',
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};
