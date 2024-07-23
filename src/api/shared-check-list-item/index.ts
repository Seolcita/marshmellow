import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

interface InsertSharedCheckListItem {
  name: string;
  categoryId: string;
  sharedCheckListId: number;
}

interface DeleteSharedCheckListItem {
  id: string;
}

interface UpdateSharedCheckListItemStatus {
  id: string;
  isChecked: boolean;
}

interface UpdateSharedCheckListAssignedItemStatus {
  id: string;
  isAssigned: boolean;
  assignedTo: string | null;
}

export const useSharedCheckList = (categoryId: string) => {
  return useQuery({
    queryKey: ['shared-check-list-items', categoryId],
    queryFn: async () => {
      const { error, data: sharedCheckListInfo } = await supabase
        .from('shared_check_list_items')
        .select('*')
        .eq('shared_category_id', categoryId);

      if (error) {
        throw new Error(error.message);
      }

      const sharedChecklist = sharedCheckListInfo.map((item) => {
        return {
          id: item.id,
          name: item.name,
          checked: item.checked,
          isAssigned: item.is_assigned,
          assignedTo: item.assigned_to,
          sharedCategoryId: item.shared_category_id,
          sharedCheckListId: item.shared_check_list_id,
        };
      });

      return sharedChecklist;
    },
  });
};

export const useInsertSharedCheckListItem = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      name,
      categoryId,
      sharedCheckListId,
    }: InsertSharedCheckListItem): Promise<any> {
      const { error, data: addedSharedCheckListItem } = await supabase
        .from('shared_check_list_items')
        .insert({
          name,
          shared_category_id: categoryId,
          shared_check_list_id: sharedCheckListId,
        })
        .eq('shared_category_id', categoryId);

      if (error) {
        throw new Error(error.message);
      }

      console.log(addedSharedCheckListItem);
      return addedSharedCheckListItem;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'shared-check-list-items',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useDeleteSharedCheckList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id }: DeleteSharedCheckListItem): Promise<any> {
      const { error, data: deletedCheckListItem } = await supabase
        .from('shared_check_list_items')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return deletedCheckListItem;
    },

    async onSuccess(categoryId: string) {
      queryClient.invalidateQueries([
        'shared-check-list-items',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateSharedCheckListItemStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      isChecked,
    }: UpdateSharedCheckListItemStatus): Promise<any> {
      console.log('id🪪', id);
      console.log('isChecked👍', isChecked);
      const { error, data: updatedCheckListItem } = await supabase
        .from('shared_check_list_items')
        .update({ checked: isChecked })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return updatedCheckListItem;
    },

    async onSuccess(categoryId: string) {
      queryClient.invalidateQueries([
        'shared-check-list-items',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateSharedCheckListAssignedItemStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      isAssigned,
      assignedTo,
    }: UpdateSharedCheckListAssignedItemStatus): Promise<any> {
      const { error, data: updatedSharedCheckListItem } = await supabase
        .from('shared_check_list_items')
        .update({ is_assigned: isAssigned, assigned_to: assignedTo })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return updatedSharedCheckListItem;
    },

    async onSuccess(categoryId: string) {
      queryClient.invalidateQueries([
        'shared-check-list-items',
        categoryId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useGetAllSharedCheckList = (sharedCheckListId: number) => {
  return useQuery({
    queryKey: ['shared_check_list_items', sharedCheckListId],
    queryFn: async () => {
      const { error, data: allSharedCheckListInfo } = await supabase
        .from('shared_check_list_items')
        .select()
        .eq('shared_check_list_id', sharedCheckListId);

      if (error) {
        throw new Error(error.message);
      }

      const allSharedChecklist = allSharedCheckListInfo.map((item) => {
        return {
          id: item.id,
          name: item.name,
          checked: item.checked,
          isAssigned: item.is_assigned,
          assignedTo: item.assigned_to,
          sharedCategoryId: item.shared_category_id,
          sharedCheckListId: item.shared_check_list_id,
        };
      });

      return allSharedChecklist;
    },
  });
};

export const useClearSharedCheckList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(sharedCheckListId: number): Promise<any> {
      const { error } = await supabase
        .from('shared_check_list_items')
        .update({ checked: false })
        .eq('shared_check_list_id', sharedCheckListId);

      if (error) {
        throw new Error(error.message);
      }

      return sharedCheckListId;
    },

    async onSuccess(sharedCheckListId: string) {
      queryClient.invalidateQueries([
        'shared-check-list-items',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useClearSharedCheckListAssignees = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(sharedCheckListId: number): Promise<any> {
      const { error } = await supabase
        .from('shared_check_list_items')
        .update({ is_assigned: false, assigned_to: null })
        .eq('shared_check_list_id', sharedCheckListId);

      if (error) {
        throw new Error(error.message);
      }

      return sharedCheckListId;
    },

    async onSuccess(sharedCheckListId: string) {
      queryClient.invalidateQueries([
        'shared-check-list-items',
        sharedCheckListId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

const sharedCheckListItems = supabase
  .channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'shared_check_list_items' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
