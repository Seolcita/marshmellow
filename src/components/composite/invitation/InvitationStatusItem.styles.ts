import styled from 'styled-components/native';

import ColorMap, { Colors } from '../../../styles/Color';

interface StatusProps {
  $bgColor: Colors;
}

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  margin-top: -4px;
`;

export const InvitationStatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${ColorMap['grey'].light};
  padding-vertical: 10px;
`;

export const InviteeInfo = styled.View``;

export const View = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-right: 12px;
`;

export const Email = styled.Text`
  font-size: 16px;
`;

export const Status = styled.Text<StatusProps>`
  background-color: ${({ $bgColor }) => ColorMap[$bgColor].extraLight};
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
`;
