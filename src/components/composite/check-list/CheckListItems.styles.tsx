import styled from 'styled-components/native';
import { Row } from '../../common-styles/CommonStyles';

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const DeleteButton = styled.Pressable`
  margin-right: 20px;
  background-color: 'transparent';
`;

export const Wrapper = styled(Row)`
  background-color: #f1f1f1;
  margin-bottom: 5px;
  padding-vertical: 2.5px;
`;
