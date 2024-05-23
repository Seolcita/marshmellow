import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

interface UseInsertReservation {
  userId: string;
  arrivalDate: string;
  departureDate: string;
  campgroundName: string;
  campgroundSiteNumber?: string;
}

interface UseUpdateReservation {
  id: string;
  arrivalDate?: string;
  departureDate?: string;
  campgroundName?: string;
  campgroundSiteNumber?: string;
}

export const useReservationsInfo = (userId: string) => {
  return useQuery({
    queryKey: ['site-info', userId],
    queryFn: async () => {
      const { error, data: siteInfo } = await supabase
        .from('site_info')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      const formattedReservationsInfo = siteInfo.map((info) => {
        return {
          id: info.id,
          userId: info.user_id,
          arrivalDate: info.arrival,
          departureDate: info.departure,
          campgroundName: info.campground_name,
          campgroundSiteNumber: info.site_number,
        };
      });

      return formattedReservationsInfo;
    },
  });
};

export const useReservationInfo = (id: string) => {
  return useQuery({
    queryKey: ['site-info', id],
    queryFn: async () => {
      const { error, data: siteInfo } = await supabase
        .from('site_info')
        .select('*')
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return siteInfo;
    },
  });
};

export const useInsertReservation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      arrivalDate,
      departureDate,
      campgroundName,
      campgroundSiteNumber,
      userId,
    }: UseInsertReservation) {
      const { error, data: addedSiteInfo } = await supabase
        .from('site_info')
        .insert({
          arrival: arrivalDate,
          departure: departureDate,
          campground_name: campgroundName,
          site_number: campgroundSiteNumber,
          user_id: userId,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return addedSiteInfo;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'site-info',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateReservation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      arrivalDate,
      departureDate,
      campgroundName,
      campgroundSiteNumber,
    }: UseUpdateReservation) {
      const { error, data: updatedSiteInfo } = await supabase
        .from('site_info')
        .update({
          arrival: arrivalDate,
          departure: departureDate,
          campground_name: campgroundName,
          site_number: campgroundSiteNumber,
        })
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedSiteInfo;
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'site-info',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};
