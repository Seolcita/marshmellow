import styled from 'styled-components/native';

import { Tile } from '../../../common-styles/CommonStyles';

export const Container = styled.View`
  width: 100%;
`;

export const TileContainer = styled(Tile)`
  padding: 20px;
  margin-horizontal: 20px;
  margin-vertical: 8px;
  gap: 8px;
`;

export const TripsNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const IconsContainer = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: center;
`;
