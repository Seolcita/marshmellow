import styled from 'styled-components/native';

interface ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const Image = styled.Image<ImageProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '300px')};
  border-radius: ${({ borderRadius }) => borderRadius ?? 10}px;
`;

export const LoadingImageContainer = styled.View`
  width: 150px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
