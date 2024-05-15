import styled from 'styled-components/native';

import Colors from '../../../constants/Colors';

interface PressableProps {
  borderRadius?: number;
  $fullWidth?: boolean;
}

export const Pressable = styled.Pressable<PressableProps>`
  background-color: ${Colors.light.tint};
  padding-horizontal: 15px;
  padding-vertical: 10px;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? 100}px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
