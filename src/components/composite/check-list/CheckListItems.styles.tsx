import styled from 'styled-components/native';

import ColorMap, { Colors } from '../../../styles/Color';

interface AssignedUserProps {
  $bgColor?: Colors;
}

interface WrapperProps {
  $isLastItem: boolean;
}

export const Wrapper = styled.View<WrapperProps>`
  flex-direction: row;
  align-items: center;
  background-color: #f1f1f1;
  margin-bottom: 4px;
  margin-horizontal: 5px;
  padding-vertical: 2.5px;
  border-bottom-width: ${({ $isLastItem }) => ($isLastItem ? '0px' : '1px')};
  border-bottom-color: ${ColorMap['grey'].light};
`;

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

export const AssignedUser = styled.Text<AssignedUserProps>`
  font-size: 14px;
  background-color: ${({ $bgColor }) =>
    ColorMap[$bgColor ?? 'blue'].extraLight};
  padding-horizontal: 12px;
  padding-vertical: 2px;
  border-radius: 150px;
`;
