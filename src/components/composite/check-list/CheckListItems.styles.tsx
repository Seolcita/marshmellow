import styled from 'styled-components/native';

import { Row } from '../../common-styles/CommonStyles';
import ColorMap, { Colors } from '../../../styles/Color';

interface AssignedUserProps {
  $bgColor?: Colors;
}

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

export const DeleteButton = styled.Pressable`
  margin-right: 20px;
  background-color: 'transparent';
`;

export const Wrapper = styled(Row)`
  background-color: #f1f1f1;
  margin-bottom: 4px;
  padding-vertical: 2.5px;
`;

export const AssignedUser = styled.Text<AssignedUserProps>`
  font-size: 14px;
  background-color: ${({ $bgColor }) =>
    ColorMap[$bgColor ?? 'blue'].extraLight};
  padding-horizontal: 12px;
  padding-vertical: 2px;
  border-radius: 150px;
`;
