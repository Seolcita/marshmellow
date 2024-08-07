import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as S from './ImageTile.styles';
import ColorMap, { Colors } from '../../../styles/Color';
import { AntDesign } from '@expo/vector-icons';

export interface ImageTileProps {
  title: string;
  pushTo: any;
  imageSource: any;
  bgColor?: Colors;
  imgWidth?: number;
  imgHeight?: number;
  absRight?: number;
  absBottom?: number;
  hasNotification?: boolean;
  numNotification?: number;
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
  hasNotification,
  numNotification,
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
      {hasNotification && (
        <S.NotificationContainer>
          <S.NotificationIcon>
            <MaterialIcons
              name='notifications-active'
              size={16}
              color={ColorMap['red'].dark}
            />
          </S.NotificationIcon>
          <S.NotificationText>{`You have ${numNotification} pending ${
            numNotification === 1 ? 'invitation' : 'invitations'
          }`}</S.NotificationText>
        </S.NotificationContainer>
      )}
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
