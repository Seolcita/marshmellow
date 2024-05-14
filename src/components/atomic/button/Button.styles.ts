import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';

interface PressableProps {
  borderRadius?: number;
}

export const Pressable = styled.Pressable<PressableProps>`
  background-color: ${Colors.light.tint};
  padding: 15px;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? 100}px;
  margin-vertical: 10px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
