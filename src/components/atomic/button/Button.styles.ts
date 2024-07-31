import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

interface PressableProps {
  borderRadius?: number;
  width?: number;
  $fullWidth?: boolean;
  $paddingVertical?: number;
  $paddingHorizontal?: number;
  $marginVertical?: number;
  $marginHorizontal?: number;
  $bgColor?: string;
  $hasBorder?: boolean;
  $isTab?: boolean;
}

interface TextProps {
  $textSize?: number;
  $textColor?: string;
}

export const Pressable = styled.Pressable<PressableProps>`
  background-color: ${({ $bgColor }) => $bgColor ?? ColorMap['blue'].main};
  padding-horizontal: 15px;
  padding-vertical: 10px;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? 100}px;
  width: ${({ $fullWidth, width }) => ($fullWidth ? '100%' : `${width}px`)};
  padding-vertical: ${({ $paddingVertical }) => $paddingVertical ?? 10}px;
  padding-horizontal: ${({ $paddingHorizontal }) => $paddingHorizontal ?? 15}px;
  margin-vertical: ${({ $marginVertical }) =>
    $marginVertical && $marginVertical}px;
  margin-horizontal: ${({ $marginHorizontal }) =>
    $marginHorizontal && $marginHorizontal}px;
  border: ${({ $hasBorder }) =>
    $hasBorder ? `4px solid ${ColorMap['white'].main}` : 'none'};

  ${({ $isTab }) =>
    $isTab &&
    `
    border-bottom-width: 3px; 
    border-color: ${ColorMap['blue'].dark}; 
    background-color: white;
    border-radius: 0px;
    `}
`;

export const Text = styled.Text<TextProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ $textColor }) => $textColor ?? ColorMap['white'].main};
  font-size: ${({ $textSize }) => $textSize ?? 16}px;
`;

export const LinkBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
