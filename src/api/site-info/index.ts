import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { CampSiteInfo } from '../../types';
import { supabase } from '../../lib/supabase';

interface UseDeleteSiteInfo {
  id: string;
  userId: string;
}

interface UseUpdateSiteInfo extends UseDeleteSiteInfo {}

export const useSharedCampSitesInfo = () => {
  return useQuery({
    queryKey: ['all-sites-info'],
    queryFn: async () => {
      const { error, data: siteInfo } = await supabase
        .from('site_info')
        .select('*')
        .eq('share', true);

      if (error) {
        throw new Error(error.message);
      }

      const formattedAllCampSiteInfo = siteInfo.map((info) => {
        return {
          id: info.id,
          userId: info.user_id,
          campgroundName: info.campground_name,
          campgroundSiteNumber: info.site_number,
          favourite: info.favourite,
          rate: info.rating,
          reservationType: info.reservation,
          share: info.share,
          imageUrl: info.image_url,
        };
      });

      return formattedAllCampSiteInfo;
    },
  });
};

export const useCampSitesPartialInfo = (userId: string) => {
  return useQuery({
    queryKey: ['camp-sites-partial-info', userId],
    queryFn: async () => {
      const { error, data: siteInfo } = await supabase
        .from('site_info')
        .select(
          'id, user_id, campground_name, site_number, favourite, rating, reservation, share'
        )
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
          favourite: info.favourite,
          rate: info.rating,
          reservationType: info.reservation,
          share: info.share,
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
          campgroundName: info.campground_name,
          campingType: info.camping_type,
          canPurchaseFirewood: info.can_purchase_firewood,
          carAccess: info.car_access,
          firewoodPrice: info.firewood_price,
          favourite: info.favourite,
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
          isWaterfront: info.is_waterfront,
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
          share: info.share,
          toilet: info.toilet,
          imageUrl: info.image_url,
          userId: info.user_id,
        };
      });

      return formattedCampSiteInfo[0] as CampSiteInfo;
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
      campingType,
      canPurchaseFirewood,
      carAccess,
      firewoodPrice,
      hasDrinkableWater,
      hasElectricity,
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
      note,
      parkPassName,
      privacy,
      rating,
      reservationFee,
      showerCost,
      siteFee,
      siteSize,
      toilet,
      hasWater,
      hasWaterHookup,
      reservation,
      sewerServiceFee,
      favourite,
      imageUrl,
      share,
    }: CampSiteInfo) {
      const { error, data: updatedSiteInfo } = await supabase
        .from('site_info')
        .update({
          camping_type: campingType,
          can_purchase_firewood: canPurchaseFirewood,
          car_access: carAccess,
          firewood_price: firewoodPrice,
          has_drinkable_water: hasDrinkableWater,
          has_electricity: hasElectricity,
          has_fire_pit: hasFirePit,
          has_sewer_service: hasSewerService,
          has_shelter: hasShelter,
          has_shower: hasShower,
          has_signal: hasSignal,
          has_sink: hasSink,
          has_stores: hasStores,
          has_water: hasWater,
          has_water_hookup: hasWaterHookup,
          is_firewood_unlimited: isFirewoodUnlimited,
          is_waterfront: isWaterfront,
          need_park_pass: needParkPass,
          note,
          park_pass_name: parkPassName,
          privacy,
          rating,
          reservation,
          reservation_fee: reservationFee,
          sewer_service_fee: sewerServiceFee,
          shower_cost: showerCost,
          share,
          site_fee: siteFee,
          site_size: siteSize,
          toilet,
          favourite,
          image_url: imageUrl,
          updated_at: new Date(),
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
