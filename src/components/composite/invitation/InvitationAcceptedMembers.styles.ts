import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const Container = styled.View`
  flex-direction: row;
  padding-horizontal: 20px;
  margin-bottom: 40px;
`;

export const Name = styled.Text`
  padding-horizontal: 12px;
  padding-vertical: 4px;
  font-size: 14px;
  background-color: ${ColorMap['blue'].extraLight};
  border-radius: 5px;
  font-weight: bold;
  margin-right: 10px;
`;
