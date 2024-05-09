import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import { ParkPass } from '../../../types';

interface InsertParkPass {
  item: ParkPass;
  userId: string;
}

export const useInsertParkPass = () => {
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
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return addedParkPass;
    },
  });
};
