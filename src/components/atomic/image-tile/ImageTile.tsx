import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import * as S from './ImageTile.styles';
import { Colors } from '../../../styles/Color';

export interface ImageTileProps {
  title: string;
  pushTo: any;
  imageSource: any;
  bgColor?: Colors;
  imgWidth?: number;
  imgHeight?: number;
  absRight?: number;
  absBottom?: number;
}

const ImageTile = ({
  title,
  pushTo,
  imageSource,
  bgColor,
  imgWidth,
  imgHeight,
  absRight,
  absBottom,
}: ImageTileProps) => {
  const handlePress = () => {
    router.push(pushTo);
  };

  return (
    <S.Container onPress={handlePress} $bgColor={bgColor}>
      <S.Contents>
        <AntDesign name='checksquareo' size={24} color='white' />
        <S.Text>{title}</S.Text>
      </S.Contents>
      <S.ImageContainer $absRight={absRight} $absBottom={absBottom}>
        <S.Image
          source={imageSource}
          $imgWidth={imgWidth}
          $imgHeight={imgHeight}
        />
      </S.ImageContainer>
    </S.Container>
  );
};

export default ImageTile;
