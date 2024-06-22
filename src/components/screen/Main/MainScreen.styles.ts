import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${ColorMap['white'].main};
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  overflow: hidden;
  background-color: ${ColorMap['blue'].dark};
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;
