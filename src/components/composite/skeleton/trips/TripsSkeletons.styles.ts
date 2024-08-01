import styled from 'styled-components/native';

import { Tile } from '../../../common-styles/CommonStyles';

export const Container = styled.View`
  width: 100%;
`;

export const TileContainer = styled(Tile)`
  flex-direction: row;
  padding: 20px;
  margin-horizontal: 20px;
  margin-vertical: 8px;
  gap: 8px;
  flex: 1;
  justify-content: space-between;
`;

export const Contents = styled.View`
  justify-content: space-between;
  gap: 8px;
`;

export const IconsContainer = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: center;
  margin-right: -8px;
`;
