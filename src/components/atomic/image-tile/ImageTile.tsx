import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import * as S from './ImageTile.styles';
import { Colors } from '../../../styles/Color';

export interface ImageTileProps {
  title: string;
  pushTo: any;
  imageSource: any;
  bgColor?: Colors;
}

const ImageTile = ({ title, pushTo, imageSource, bgColor }: ImageTileProps) => {
  const handlePress = () => {
    router.push(pushTo);
  };

  return (
    <S.Container onPress={handlePress} $bgColor={bgColor}>
      <S.Contents>
        <AntDesign name='checksquareo' size={24} color='white' />
        <S.Text>{title}</S.Text>
      </S.Contents>
      <S.Image source={imageSource} />
    </S.Container>
  );
};

export default ImageTile;
