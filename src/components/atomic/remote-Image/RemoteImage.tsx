import { Image } from 'react-native';
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
      }
    })();
  }, [path]);
  return (
    image &&
    image !== '' && (
      <S.Image
        source={{ uri: image }}
        {...imageProps}
        width={width}
        height={height}
        borderRadius={borderRadius}
      />
    )
  );
};

export default RemoteImage;
