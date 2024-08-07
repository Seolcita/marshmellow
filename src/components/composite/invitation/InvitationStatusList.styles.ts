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

export const EmptyText = styled.Text`
  color: ${ColorMap['white'].main};
`;
