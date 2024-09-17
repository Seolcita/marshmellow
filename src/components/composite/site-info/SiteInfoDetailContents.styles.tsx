import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const ImageContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
`;

export const DefaultImageContainer = styled(ImageContainer)`
  margin-top: 24px;
`;

export const DefaultImage = styled.Image`
  width: 250px;
  height: 200px;
`;

export const DefaultImageText = styled.Text`
  color: ${ColorMap['grey'].main};
  font-size: 18px;
  font-weight: bold;
`;

export const ReviewContainer = styled.View`
  align-self: flex-start;
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  background-color: ${ColorMap['blue'].dark};
  padding-vertical: 8px;
  padding-horizontal: 16px;
  color: ${ColorMap['white'].main};
  border-radius: 5px;
  margin-bottom: 15px;
  margin-top: 10px;
`;
