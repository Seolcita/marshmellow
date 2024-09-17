import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';

export const InvitationTile = styled(Tile)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 12px;
  margin-vertical: 4px;
  padding: 16px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
