import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profiles', userId],
    queryFn: async () => {
      const { error, data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return (
        profile && {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        }
      );
    },
  });
};

export const useUpdateUserName = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(name: string) {
      const { error, data: updatedUserName } = await supabase
        .from('profiles')
        .upsert({ name })
        .eq('id', userId)
        .single();

      if (error) {
        console.log('Fail to update user name:', error.message);
        throw new Error('Fail to update user name');
      }

      return updatedUserName;
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'profiles',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};
