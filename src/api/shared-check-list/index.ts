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

export const useInsertSharedCheckList = (userId: string) => {
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

        if (addedMySharedCheckList) {
          const { error, data: createdInvitationForAdmin } = await supabase
            .from('invitation')
            .insert({
              inviter_id: userId,
              invitee_email: adminEmail,
              invitee_name: 'Admin', //TODO: get the name from the user
              shared_check_list_id: id,
              shared_check_list_name: name,
              status: 'ACCEPTED',
              is_hide: true,
            })
            .select();

          if (error) {
            console.log(
              'Failed to Creat invitation for Admin. Please try again'
            );

            const { error: deletingSharedCheckListError } = await supabase
              .from('shared_check_list')
              .delete()
              .match({ id });

            console.log('deletingError', deletingSharedCheckListError);

            // Check if the shared_check_list is deleted by deleting shared check list (cascading)
            // const { error: deleteMySharedCheckListError } = await supabase
            //   .from('my_shared_check_list')
            //   .delete()
            //   .match({ shared_check_list_id: id });
          }
        }
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
