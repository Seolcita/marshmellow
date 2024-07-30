import { Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { ComponentProps, useEffect, useState } from 'react';

import * as S from './RemoteImage.styles';
import { supabase } from '../../../lib/supabase';

type RemoteImageProps = {
  path?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({
  path,
  width,
  height,
  borderRadius,
  ...imageProps
}: RemoteImageProps) => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('campsite-images')
        .download(path);

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
        setIsLoading(false);
      }
    })();
  }, [path]);
  return image && image !== '' && !isLoading ? (
    <S.Image
      source={{ uri: image }}
      {...imageProps}
      width={width}
      height={height}
      borderRadius={borderRadius}
    />
  ) : (
    <S.LoadingImageContainer>
      <FontAwesome name='spinner' size={40} color='black' />
    </S.LoadingImageContainer>
  );
};

export default RemoteImage;
