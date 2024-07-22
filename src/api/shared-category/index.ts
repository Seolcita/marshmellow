import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Alert } from 'react-native';

export interface InsertCategory {
  item: string;
}

export interface UpdateCategory {
  item: string;
  id: string;
}

export const useSharedCategories = (sharedCheckListId: number) => {
  return useQuery({
    queryKey: ['shared_categories', sharedCheckListId],
    queryFn: async () => {
      const { error, data: sharedCategory } = await supabase
        .from('shared_categories')
        .select('*')
        .eq('shared_check_list_id', sharedCheckListId);

      if (error) {
        throw new Error(error.message);
      }

      const sharedCategories = sharedCategory.map((sharedCategory) => {
        return { name: sharedCategory.name, id: sharedCategory.id };
      });

      return sharedCategories;
    },
  });
};

export const useInsertSharedCategory = (sharedCheckListId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ item }: InsertCategory) {
      const { error, data: insertedSharedCategory } = await supabase
        .from('shared_categories')
        .insert({ name: item, shared_check_list_id: sharedCheckListId })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return insertedSharedCategory;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'shared_categories',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateSharedCategory = (sharedCheckListId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ item, id }: UpdateCategory) {
      const { error, data: updatedSharedCategories } = await supabase
        .from('shared_categories')
        .update({ name: item })
        .eq('id', id)
        .single();

      if (error) {
        Alert.alert('Fail to fetching shared check list categories');
        return;
      }

      return updatedSharedCategories;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'shared_categories',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useDeleteSharedCategory = (sharedCheckListId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase
        .from('shared_categories')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'shared_categories',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

// export const useSharedCategorySubscription = (sharedCheckListId: string) => {
//   const queryClient = useQueryClient();

//   const categories = supabase
//     .channel('custom-all-channel')
//     .on(
//       'postgres_changes',
//       {
//         event: '*',
//         schema: 'public',
//         table: 'shared_categories',
//         filter: `shared_check_list.id=eq.${sharedCheckListId}`,
//       },
//       (payload) => {
//         queryClient.invalidateQueries([
//           'shared_categories',
//           sharedCheckListId,
//         ] as InvalidateQueryFilters);
//       }
//     )
//     .subscribe();

//   return () => {
//     categories.unsubscribe();
//   };
// };
