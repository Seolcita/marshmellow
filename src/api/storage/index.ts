import { Alert } from 'react-native';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

import { supabase } from '../../lib/supabase';

export const useDeleteExistingSiteImage = async (imageUrl: string) => {
  const { error } = await supabase.storage
    .from('campsite-images')
    .remove([imageUrl]);

  if (error) {
    Alert.alert(
      'Error while deleting image to upload new image. Please try again.'
    );

    console.log('Error', error);
    return;
  }
};

export const useSaveSiteImage = async (path: string) => {
  const base64 = await FileSystem.readAsStringAsync(path, {
    encoding: 'base64',
  });
  const filePath = `${randomUUID()}.png`;
  const contentType = 'image/png';
  const { data, error } = await supabase.storage
    .from('campsite-images')
    .upload(filePath, decode(base64), { contentType });

  if (error) {
    Alert.alert('Failed to upload image. Please try again.');
    console.log('IMAGE UPLOAD ERROR', error);
    return;
  }

  if (data) {
    return data.path;
  }
};
