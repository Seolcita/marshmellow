import styled from 'styled-components/native';

import ColorMap, { Colors } from '../../../styles/Color';
import { Tile, TwoButtonContainer } from '../../common-styles/CommonStyles';

interface ConfirmMessageProps {
  color?: string;
}

interface ButtonProps {
  bgColor?: Colors;
}

export const TripTile = styled(Tile)`
  padding: 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const Contents = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CampgroundName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const SiteWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const DateWrapper = styled(SiteWrapper)`
  align-items: start;
  flex: 1;
`;

export const DateIconContainer = styled.View`
  margin-top: 5px;
`;

export const Text = styled.Text`
  font-size: 16px;
  margin-vertical: 2px;
  color: ${ColorMap['grey'].main};
  margin-left: 8px;
  padding-right: 20px;
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
  width: 200px;
`;

export const Button = styled.Pressable<ButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
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

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const MessageContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const ConfirmMessage = styled.Text<ConfirmMessageProps>`
  color: ${({ color }) => color ?? ColorMap['red'].main};
  font-size: 18px;
  font-weight: bold;
  text-align: start;
  line-height: 26px;
`;

export const WarningMessage = styled(ConfirmMessage)`
  color: ${ColorMap['red'].main};
  font-weight: bold;
  text-align: start;
  line-height: 26px;
  margin-top: 12px;
`;

export const ModalButtonContainer = styled(TwoButtonContainer)``;
