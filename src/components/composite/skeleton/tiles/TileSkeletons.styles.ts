import styled from 'styled-components/native';

import { Tile } from '../../../common-styles/CommonStyles';

export const Container = styled.View`
  width: 100%;
  gap: 16px;
`;

export const SkeletonTile = styled(Tile)`
  width: 100%;
  margin-horizontal: 0px;
  margin-vertical: 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
