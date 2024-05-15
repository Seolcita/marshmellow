import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

interface InsertCheckListItem {
  name: string;
  categoryId: string;
}

interface DeleteCheckListItem {
  id: string;
}

interface UpdateCheckListItemStatus {
  id: string;
  isChecked: boolean;
}

interface ClearCheckListCheckBox {
  userId: string;
}

export const useCheckList = (categoryId: string) => {
  return useQuery({
    queryKey: ['check-list', categoryId],
    queryFn: async () => {
      const { error, data: checkList } = await supabase
        .from('check_list')
        .select()
        .eq('category_id', categoryId);

      if (error) {
        throw new Error(error.message);
      }

      return checkList;
    },
  });
};

export const useInsertCheckList = ({
  userId,
  categoryId,
}: {
  userId: string;
  categoryId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ name, categoryId }: InsertCheckListItem): Promise<any> {
      const { error, data: addedCheckListItem } = await supabase
        .from('check_list')
        .insert({
          name,
          category_id: categoryId,
          user_id: userId,
        })
        .eq('category_id', categoryId);

      if (error) {
        throw new Error(error.message);
      }

      console.log(addedCheckListItem);
      return addedCheckListItem;
    },

    async onSuccess(categoryId: string) {
      queryClient.invalidateQueries([
        'check-list',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useDeleteCheckList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id }: DeleteCheckListItem): Promise<any> {
      const { error, data: deletedCheckListItem } = await supabase
        .from('check_list')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return deletedCheckListItem;
    },

    async onSuccess(categoryId: string) {
      queryClient.invalidateQueries([
        'check-list',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateCheckListItemStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      isChecked,
    }: UpdateCheckListItemStatus): Promise<any> {
      const { error, data: updatedCheckListItem } = await supabase
        .from('check_list')
        .update({ checked: isChecked })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return updatedCheckListItem;
    },

    async onSuccess(categoryId: string) {
      queryClient.invalidateQueries([
        'check-list',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useClearCheckList = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ userId }: ClearCheckListCheckBox): Promise<any> {
      const { error, data: updatedCheckListItem } = await supabase
        .from('check_list')
        .update({ checked: false })
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return updatedCheckListItem;
    },

    // async onSuccess(categoryId: string) {
    //   queryClient.invalidateQueries([
    //     'check-list',
    //     categoryId,
    //   ] as InvalidateQueryFilters);
    // },

    // onError(error) {
    //   //TODO: Handle error
    //   console.log(error);
    // },
  });
};
