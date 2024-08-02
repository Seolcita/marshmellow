import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';
import { Tile } from '../../common-styles/CommonStyles';

export const SiteInfoCardContainer = styled(Tile)`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 5px;
`;

export const TextContainer = styled.View``;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const SiteNumberContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SiteNumberText = styled.Text`
  color: ${ColorMap['grey'].main};
  font-size: 14px;
  margin-left: 8px;
`;

export const FavouriteIcon = styled.Image`
  width: 22px;
  height: 20px;
`;
