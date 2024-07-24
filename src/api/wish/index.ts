import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Alert } from 'react-native';

import { supabase } from '../../lib/supabase';

export const useWish = (userId: string) => {
  return useQuery({
    queryKey: ['wish', userId],
    queryFn: async () => {
      const { error, data: wishArray } = await supabase
        .from('wish')
        .select()
        .eq('uid', userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return wishArray.wish;
    },
  });
};

export const useUpdateWish = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(siteInfoId: string) {
      const { data: wishData, error: fetchError } = await supabase
        .from('wish')
        .select('*')
        .eq('uid', userId)
        .single();

      if (wishData === null) {
        const { error, data: addedWish } = await supabase
          .from('wish')
          .insert({
            wish: [siteInfoId],
            uid: userId,
          })
          .eq('uid', userId)
          .single();

        if (error) {
          console.log(error);
          Alert.alert('Failed to add wish list');
        }
      } else if (wishData) {
        let updatedWishArray: any = [...wishData.wish] || [];

        if (updatedWishArray.includes(siteInfoId)) {
          updatedWishArray = updatedWishArray.filter(
            (id: string) => id !== siteInfoId
          );
        } else {
          updatedWishArray.push(siteInfoId);
        }

        // Update the wish array in the database
        const { error, data: updatedWish } = await supabase
          .from('wish')
          .update({
            wish: updatedWishArray,
          })
          .eq('uid', userId)
          .single();

        if (error) {
          Alert.alert('Failed to update wish list');
        }
        return updatedWish;
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries([
        'wish',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};
