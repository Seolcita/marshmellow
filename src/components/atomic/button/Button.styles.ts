import styled from 'styled-components/native';

import Colors from '../../../constants/Colors';

interface PressableProps {
  borderRadius?: number;
  $fullWidth?: boolean;
  $paddingVertical?: number;
  $paddingHorizontal?: number;
  $marginVertical?: number;
  $marginHorizontal?: number;
}

interface TextProps {
  $textSize?: number;
}

export const Pressable = styled.Pressable<PressableProps>`
  background-color: ${Colors.light.tint};
  padding-horizontal: 15px;
  padding-vertical: 10px;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? 100}px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding-vertical: ${({ $paddingVertical }) => $paddingVertical ?? 10}px;
  padding-horizontal: ${({ $paddingHorizontal }) => $paddingHorizontal ?? 15}px;
  margin-vertical: ${({ $marginVertical }) =>
    $marginVertical && $marginVertical}px;
  margin-horizontal: ${({ $marginHorizontal }) =>
    $marginHorizontal && $marginHorizontal}px;
`;

export const Text = styled.Text<TextProps>`
  font-size: 16px;
  font-weight: 600;
  color: white;
  font-size: ${({ $textSize }) => $textSize ?? 16}px;
`;
