import styled from 'styled-components/native';

import { Tile } from '../../../common-styles/CommonStyles';

export const Container = styled.View`
  width: 100%;
`;

export const TileContainer = styled(Tile)`
  padding: 20px;
  margin-horizontal: 20px;
  margin-vertical: 0px;
  margin-bottom: 8px;
`;

export const ParkPassNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const IconsContainer = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: center;
`;
