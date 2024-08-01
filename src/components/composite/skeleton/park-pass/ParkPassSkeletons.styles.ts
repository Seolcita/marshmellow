import styled from 'styled-components/native';

import { Tile } from '../../../common-styles/CommonStyles';

export const Container = styled.View`
  width: 100%;
`;

export const TileContainer = styled(Tile)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-horizontal: 2px;
`;

export const ParkPassContents = styled.View`
  flex-direction: column;
  gap: 12px;
`;

export const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: -8px;
`;
