import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { ParkPass } from '../../types';

interface InsertParkPass {
  item: ParkPass;
  userId: string;
}

export interface UpdateParkPass {
  updateItem: Partial<ParkPass>;
  id: string;
}

export const useParkPasses = (userId: string) => {
  return useQuery({
    queryKey: ['park-passes', userId],
    queryFn: async () => {
      const { error, data: parkPasses } = await supabase
        .from('park_pass')
        .select()
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return parkPasses;
    },
  });
};

export const useInsertParkPass = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ item, userId }: InsertParkPass) {
      const { error, data: addedParkPass } = await supabase
        .from('park_pass')
        .insert({
          name: item.name,
          expiry_date: item.expiryDate,
          user_id: userId,
        })
        .eq('id', userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return addedParkPass;
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'park-passes',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      console.log(error);
    },
  });
};

export const useUpdateParkPass = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, updateItem: { name, expiryDate } }: UpdateParkPass) {
      console.log('UPDATE ITEM 🥶', name);
      console.log('ID 🎄', id);
      const { error, data: updatedParkPass } = await supabase
        .from('park_pass')
        .update({ name: name, expiry_date: expiryDate })
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return updatedParkPass;
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'park-passes',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteParkPass = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase.from('park_pass').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'park-passes',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      console.log(error);
    },
  });
};
