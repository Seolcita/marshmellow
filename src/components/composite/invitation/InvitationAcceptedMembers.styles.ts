import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const Container = styled.View`
  flex-direction: row;
  padding-horizontal: 20px;
`;

export const Name = styled.Text`
  padding-horizontal: 16px;
  padding-vertical: 8px;
  font-size: 18px;
  background-color: ${ColorMap['blue'].extraLight};
  border-radius: 5px;
  font-weight: bold;
`;
