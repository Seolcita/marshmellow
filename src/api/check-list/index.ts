import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

interface InsertCheckListItems {
  items: string[];
}

interface UpdateCheckListItems extends InsertCheckListItems {
  id: string;
}

export const useCheckList = (userId: string) => {
  return useQuery({
    queryKey: ['check-list', userId],
    queryFn: async () => {
      const { error, data: checkList } = await supabase
        .from('check_list')
        .select()
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return checkList;
    },
  });
};

export const useInsertCheckList = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ items }: InsertCheckListItems) {
      const { error, data: addedCheckList } = await supabase
        .from('check_list')
        .insert({
          items,
          user_id: userId,
        })
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }
      return addedCheckList;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'check-list',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateCheckList = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, items }: UpdateCheckListItems) {
      const { error, data: addedCheckList } = await supabase
        .from('check_list')
        .update({
          items: items,
        })
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return addedCheckList;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'check-list',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};
