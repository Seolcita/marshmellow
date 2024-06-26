import styled from 'styled-components/native';
import { Tile } from '../../common-styles/CommonStyles';

export const SiteInfoCardContainer = styled(Tile)`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 5px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const FavouriteIcon = styled.Image`
  width: 22px;
  height: 20px;
`;
