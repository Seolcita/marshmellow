import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

export interface InsertCategory {
  item: string;
}

export interface UpdateCategory {
  item: string;
  id: string;
}

export const useCategories = (userId: string) => {
  return useQuery({
    queryKey: ['categories', userId],
    queryFn: async () => {
      const { error, data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return categories;
    },
  });
};

export const useInsertCategory = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ item }: InsertCategory) {
      const { error, data: category } = await supabase
        .from('categories')
        .insert({ name: item, user_id: userId })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return category;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'categories',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateCategory = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ item, id }: UpdateCategory) {
      const { error, data: category } = await supabase
        .from('categories')
        .update({ name: item })
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return category;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'categories',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useDeleteCategory = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'categories',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useCategorySubscription = (userId: string) => {
  const queryClient = useQueryClient();

  const myCategories = supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'categories',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        queryClient.invalidateQueries([
          'categories',
          userId,
        ] as InvalidateQueryFilters);
      }
    )
    .subscribe();

  return myCategories;
};
