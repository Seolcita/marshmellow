import styled from 'styled-components/native';

import ColorMap, { Colors } from '../../../styles/Color';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

interface ConfirmMessageProps {
  color?: string;
}

interface ButtonProps {
  bgColor?: Colors;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Contents = styled.View``;

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

export const Text = styled.Text`
  font-size: 16px;
  margin-vertical: 2px;
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
`;

export const Button = styled.Pressable<ButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  background-color: ${({ bgColor }) =>
    bgColor ? ColorMap[bgColor].dark : ColorMap['grey'].dark};
`;

export const MenuContainer = styled.View`
  postion: absolute;
  right: 0;
  top: 0;
`;

export const ModalTitle = styled.Text`
  font-size: 23px;
  font-weight: bold;
  text-align: center;
`;

export const MessageContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 40px;
`;

export const ConfirmMessage = styled.Text<ConfirmMessageProps>`
  color: ${({ color }) => color ?? ColorMap['red'].main};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const ModalButtonContainer = styled(TwoButtonContainer)``;
