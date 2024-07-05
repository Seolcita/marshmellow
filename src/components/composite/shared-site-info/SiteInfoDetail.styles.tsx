import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';
import { Tile } from '../../common-styles/CommonStyles';

export const Container = styled.View`
  padding: 10px;
  background-color: ${ColorMap['white'].main};
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
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

export const SiteInfoCardContainer = styled(Tile)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-horizontal: 0px;
  padding: 15px;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;
