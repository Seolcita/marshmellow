import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';
import { ImageTileProps } from './ImageTile';

interface ContainerProps {
  $bgColor?: ImageTileProps['bgColor'];
}

interface ImageProps {
  $imgWidth?: ImageTileProps['imgWidth'];
  $imgHeight?: ImageTileProps['imgHeight'];
}

interface ImageContainerProps {
  $absRight?: ImageTileProps['absRight'];
  $absBottom?: ImageTileProps['absBottom'];
}

export const Container = styled.Pressable<ContainerProps>`
  padding-horizontal: 20px;
  padding-vertical: 20px;
  elevation: 5;
  background-color: ${({ $bgColor }) => ColorMap[$bgColor ?? 'blue'].dark};
  margin-horizontal: 22px;
  margin-bottom: 40px;
  border-radius: 5px;
  width: 100%;
  height: 140px;
`;

export const Contents = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const NotificationContainer = styled.View`
  background-color: ${ColorMap['white'].main};
  flex-direction: row;
  gap: 8px;
  padding: 12px;
  border-radius: 5px;
  margin-top: 14px;
  margin-right: 90px;
  flex: 1;
  align-items: center;
`;

export const NotificationIcon = styled.View`
  margin-top: 2px;
`;

export const NotificationText = styled.Text`
  color: ${ColorMap['grey'].dark};
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
`;

export const ImageContainer = styled.View<ImageContainerProps>`
  position: absolute;
  right: ${({ $absRight }) => $absRight ?? -25}px;
  bottom: ${({ $absBottom }) => $absBottom ?? -30}px;
`;

export const Image = styled.Image<ImageProps>`
  width: ${({ $imgWidth }) => $imgWidth ?? 150}px;
  height: ${({ $imgHeight }) => $imgHeight ?? 150}px;
`;
