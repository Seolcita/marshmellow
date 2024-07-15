import styled from 'styled-components/native';
import ColorMap from '../../../styles/Color';
import { ImageTileProps } from './ImageTile';

interface ContainerProps {
  $bgColor?: ImageTileProps['bgColor'];
}

export const Container = styled.Pressable<ContainerProps>`
  padding-horizontal: 20px;
  padding-top: 25px;
  padding-bottom: 10px;
  elevation: 5;
  background-color: ${({ $bgColor }) => ColorMap[$bgColor ?? 'blue'].dark};
  margin-horizontal: 22px;
  margin-bottom: 30px;
  border-radius: 5px;
  width: 100%;
`;

export const Image = styled.Image`
  width: 150px;
  height: 130px;
  align-self: flex-end;
  margin-top: -50px;
  margin-right: -20px;
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
