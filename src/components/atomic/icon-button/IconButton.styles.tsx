import styled from 'styled-components/native';
import ColorMap from '../../../styles/Color';

interface IconButtonContainerProps {
  $hasShadow?: boolean;
}

export const IconButtonContainer = styled.Pressable<IconButtonContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #d6e3ff;
  padding-vertical: 20px;
  padding-right: 30px;
  padding-left: 28px;
  border-radius: 16px;

  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;

  ${({ $hasShadow }) =>
    $hasShadow &&
    `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    elevation: 5;
  `};
`;

export const IconContainer = styled.View`
  width: 16px;
  height: 16px;
`;

export const TextContainer = styled.View``;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ColorMap['grey'].dark};
`;
