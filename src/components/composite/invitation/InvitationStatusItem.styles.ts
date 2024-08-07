import styled from 'styled-components/native';

import ColorMap, { Colors } from '../../../styles/Color';

interface StatusProps {
  $bgColor: Colors;
}

export const InvitationStatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${ColorMap['grey'].extraLight};
  padding-vertical: 10px;
`;

export const InviteeInfo = styled.View``;

export const View = styled.View`
  flex-direction: row;
  margin-bottom: 6px;
  align-items: center;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-right: 12px;
  color: ${ColorMap['white'].main};
`;

export const Email = styled.Text`
  font-size: 16px;
  color: ${ColorMap['grey'].light};
`;

export const Status = styled.Text<StatusProps>`
  background-color: ${({ $bgColor }) => ColorMap[$bgColor].extraLight};
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
`;
