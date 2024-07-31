import styled from 'styled-components/native';

import { Tile } from '../../../common-styles/CommonStyles';

export const Container = styled.View`
  width: 100%;
  gap: 16px;
`;

export const TileContainer = styled(Tile)`
  padding: 20px;
  margin-horizontal: 20px;
  margin-vertical: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;
