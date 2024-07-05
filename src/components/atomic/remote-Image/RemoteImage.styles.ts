import styled from 'styled-components/native';

interface ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const Image = styled.Image<ImageProps>`
  width: ${({ width }) => width ?? 300}px;
  height: ${({ height }) => height ?? 200}px;
  border-radius: ${({ borderRadius }) => borderRadius ?? 10}px;
`;
