import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';
import { CampSiteInfo } from '../../types';

interface UseDeleteSiteInfo {
  id: string;
  userId: string;
}

interface UseUpdateSiteInfo extends UseDeleteSiteInfo {}

export const useCampSitesPartialInfo = (userId: string) => {
  return useQuery({
    queryKey: ['camp-sites-partial-info', userId],
    queryFn: async () => {
      const { error, data: siteInfo } = await supabase
        .from('site_info')
        .select('id, user_id, campground_name, site_number')
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      const formattedCampSitePartialInfo = siteInfo.map((info) => {
        return {
          id: info.id,
          userId: info.user_id,
          campgroundName: info.campground_name,
          campgroundSiteNumber: info.site_number,
        };
      });

      return formattedCampSitePartialInfo;
    },
  });
};

export const useCampSitesInfo = (userId: string) => {
  return useQuery({
    queryKey: ['sites-info', userId],
    queryFn: async () => {
      const { error, data: siteInfo } = await supabase
        .from('site_info')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return siteInfo;
    },
  });
};

export const useCampSiteInfo = (id: string) => {
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

      const formattedCampSiteInfo = siteInfo.map((info) => {
        return {
          id: info.id,
          arrivalDate: info.arrival,
          campgroundName: info.campground_name,
          campingType: info.camping_type,
          canPurchaseFirewood: info.can_purchase_firewood,
          carAccess: info.car_access,
          departureDate: info.departure,
          firewoodPrice: info.firewood_price,
          hasDrinkableWater: info.has_drinkable_water,
          hasElectricity: info.has_electricity,
          hasFirePit: info.has_fire_pit,
          hasSewerService: info.has_sewer_service,
          hasShower: info.has_shower,
          hasSignal: info.has_signal,
          hasSink: info.has_sink,
          hasStores: info.has_stores,
          hasShelter: info.has_shelter,
          hasWater: info.has_water,
          hasWaterHookup: info.has_water_hookup,
          isFirewoodUnlimited: info.is_firewood_unlimited,
          isWaterfront: info.is_water_front,
          needParkPass: info.need_park_pass,
          note: info.note,
          parkPassName: info.park_pass_name,
          privacy: info.privacy,
          rating: info.rating,
          reservation: info.reservation,
          reservationFee: info.reservation_fee,
          sewerServiceFee: info.sewer_service_fee,
          showerCost: info.shower_cost,
          siteFee: info.site_fee,
          siteNumber: info.site_number,
          siteSize: info.site_size,
          toilet: info.toilet,
          userId: info.user_id,
        };
      });

      return formattedCampSiteInfo[0];
    },
  });
};

export const useDeleteSiteInfo = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase.from('site_info').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      queryClient.invalidateQueries([
        'sites-info',
        userId,
      ] as InvalidateQueryFilters);
    },

    onError(error) {
      //TODO: Handle error
      console.log(error);
    },
  });
};

export const useUpdateCampSiteInfo = ({ id, userId }: UseUpdateSiteInfo) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      arrivalDate,
      campgroundName,
      campingType,
      canPurchaseFirewood,
      carAccess,
      departureDate,
      firewoodPrice,
      hasDrinkableWater,
      hasElectric,
      hasFirePit,
      hasSewerService,
      hasShower,
      hasSignal,
      hasSink,
      hasStores,
      hasShelter,
      isFirewoodUnlimited,
      isWaterfront,
      needParkPass,
      needReservation,
      note,
      parkPassName,
      privacy,
      rating,
      reservationFee,
      showerCost,
      siteFee,
      siteNumber,
      siteSize,
      toilet,
      userId,
    }: CampSiteInfo) {
      const { error, data: updatedSiteInfo } = await supabase
        .from('site_info')
        .update({
          id,
          arrival: arrivalDate,
          campground_name: campgroundName,
          camping_type: campingType,
          can_purchase_firewood: canPurchaseFirewood,
          car_access: carAccess,
          departure: departureDate,
          firewood_price: firewoodPrice,
          has_drinkable_water: hasDrinkableWater,
          has_electric: hasElectric,
          has_fire_pit: hasFirePit,
          has_sewer_service: hasSewerService,
          has_shower: hasShower,
          has_signal: hasSignal,
          has_sink: hasSink,
          has_stores: hasStores,
          hasShelter,
          is_firewood_unlimited: isFirewoodUnlimited,
          is_water_front: isWaterfront,
          need_park_pass: needParkPass,
          need_reservation: needReservation,
          note,
          park_pass_name: parkPassName,
          privacy,
          rating,
          reservation_fee: reservationFee,
          shower_cost: showerCost,
          site_fee: siteFee,
          site_number: siteNumber,
          site_size: siteSize,
          toilet,
          user_id: userId,
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
