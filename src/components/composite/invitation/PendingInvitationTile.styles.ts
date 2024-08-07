import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';

export const PendingInvitationTile = styled(Tile)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 12px;
  padding: 16px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
