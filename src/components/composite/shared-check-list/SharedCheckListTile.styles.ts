import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';
import ColorMap, { Colors } from '../../../styles/Color';

interface ButtonProps {
  bgColor?: Colors;
}

export const MySharedCheckListTile = styled(Tile)`
  margin-horizontal: 0px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
`;

export const Contents = styled.Pressable`
  padding: 20px;
  flex: 1;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const IconsContainer = styled.View`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  flex-direction: row;
  z-index: 1;
  overflow: hidden;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  hight: 100%;
  width: 160px;
`;

export const Button = styled.Pressable<ButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
  background-color: ${({ bgColor }) =>
    bgColor ? ColorMap[bgColor].dark : ColorMap['grey'].dark};
`;

export const MenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: 10px;
`;
