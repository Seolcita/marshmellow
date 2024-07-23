import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Alert } from 'react-native';

import { supabase } from '../../lib/supabase';
import { Invitation, InvitationStatus } from '../../types';

interface useInsertInvitationProps {
  sharedCheckListId: number;
  sharedCheckListName: string;
}

export interface ResponseInvitationProps {
  status: InvitationStatus;
}

export interface InsertMySharedCheckListProps {
  id: number;
  userId: string;
  sharedCheckListId: number;
}

export const useInsertInvitation = ({
  sharedCheckListId,
}: useInsertInvitationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      inviterId,
      inviteeEmail,
      inviteeName,
      sharedCheckListId,
      sharedCheckListName,
    }: Invitation): Promise<number | undefined> {
      const { error, data: createdInvitation } = await supabase
        .from('invitation')
        .insert({
          inviter_id: inviterId,
          invitee_email: inviteeEmail,
          invitee_name: inviteeName,
          shared_check_list_id: sharedCheckListId,
          shared_check_list_name: sharedCheckListName,
        })
        .select();

      if (error) {
        Alert.alert('Failed to Creat invitation. Please try again');
        return;
      }

      if (createdInvitation[0].id) {
        console.log('createdInvitationID 🎄', createdInvitation[0].id);
        return createdInvitation[0].id;
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'invitation',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useInvitationWithInvitationId = (invitationId: string) => {
  return useQuery({
    queryKey: ['invitation', invitationId],
    queryFn: async () => {
      const { error, data: invitationInfo } = await supabase
        .from('invitation')
        .select('*')
        .eq('id', invitationId);

      if (error) {
        throw new Error(error.message);
      }

      const invitations: Invitation[] = invitationInfo.map((info) => {
        return {
          id: info.id,
          inviterId: info.inviter_id,
          inviteeEmail: info.invitee_email,
          inviteeName: info.invitee_name,
          sharedCheckListId: info.shared_check_list_id,
          sharedCheckListName: info.shared_check_list_name,
          status: info.status,
          isHidden: info.is_hidden,
        };
      });

      return invitations;
    },
  });
};

export const useInvitationWithSharedCheckListId = (
  sharedCheckListId: number
) => {
  return useQuery({
    queryKey: ['invitation', sharedCheckListId],
    queryFn: async () => {
      const { error, data: invitationInfo } = await supabase
        .from('invitation')
        .select('*')
        .eq('shared_check_list_id', sharedCheckListId);

      if (error) {
        throw new Error(error.message);
      }

      const invitations: Invitation[] = invitationInfo.map((info) => {
        return {
          id: info.id,
          inviterId: info.inviter_id,
          inviteeEmail: info.invitee_email,
          inviteeName: info.invitee_name,
          sharedCheckListId: info.shared_check_list_id,
          sharedCheckListName: info.shared_check_list_name,
          status: info.status,
          isHidden: info.is_hidden,
        };
      });
      return invitations;
    },
  });
};

export const useInvitationWithUserEmail = (userEmail: string) => {
  return useQuery({
    queryKey: ['invitation', userEmail],
    queryFn: async () => {
      const { error, data: myInvitationInfo } = await supabase
        .from('invitation')
        .select('*')
        .eq('invitee_email', userEmail);

      if (error) {
        throw new Error(error.message);
      }

      const invitations: Invitation[] = myInvitationInfo.map((info) => {
        return {
          id: info.id,
          inviterId: info.inviter_id,
          inviteeEmail: info.invitee_email,
          inviteeName: info.invitee_name,
          sharedCheckListId: info.shared_check_list_id,
          sharedCheckListName: info.shared_check_list_name,
          status: info.status,
          isHidden: info.is_hidden,
        };
      });

      return invitations;
    },
  });
};

export const useDeleteInvitation = (sharedCheckListId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('invitation').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'invitation',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateInvitation = ({
  id,
  userId,
  sharedCheckListId,
}: InsertMySharedCheckListProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ status }: ResponseInvitationProps) {
      const { error, data: updatedInvitation } = await supabase
        .from('invitation')
        .update({
          status,
        })
        .eq('id', id)
        .select();

      if (error) {
        Alert.alert('Failed to Creat invitation. Please try again');
        return;
      }

      if (
        updatedInvitation &&
        updatedInvitation.length > 0 &&
        updatedInvitation[0].status === 'ACCEPTED'
      ) {
        console.log('updatedInvitation 🎄', updatedInvitation);

        const name = updatedInvitation[0].shared_check_list_name;
        const sharedCheckListId = updatedInvitation[0].shared_check_list_id;

        const { error, data: addedMySharedCheckList } = await supabase
          .from('my_shared_check_list')
          .insert({
            shared_check_list_id: sharedCheckListId,
            shared_check_list_name: name,
            uid: userId,
            is_admin: false,
          })
          .select();

        if (error) {
          console.log('Failed to add it to my shared check list.', error);
          console.log('updatedInvitation', updatedInvitation);
          return;
        }

        return addedMySharedCheckList;
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'invitation',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useHideInvitation = (sharedCheckListId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase
        .from('invitation')
        .update({ is_hidden: true })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'invitation',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useInvitationAcceptedMembers = (sharedCheckListId: number) => {
  return useQuery({
    queryKey: ['invitation', sharedCheckListId],
    queryFn: async () => {
      const { error, data: invitationAcceptedMembers } = await supabase
        .from('invitation')
        .select('*')
        .eq('shared_check_list_id', sharedCheckListId)
        .eq('status', InvitationStatus.ACCEPTED);

      if (error) {
        throw new Error(error.message);
      }

      const members: Invitation[] = invitationAcceptedMembers.map((info) => {
        return {
          id: info.id,
          inviterId: info.inviter_id,
          inviteeEmail: info.invitee_email,
          inviteeName: info.invitee_name,
          sharedCheckListId: info.shared_check_list_id,
          sharedCheckListName: info.shared_check_list_name,
          status: info.status,
        };
      });
      return members;
    },
  });
};
