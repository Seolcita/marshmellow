import styled from 'styled-components/native';

import ColorMap from '../../../../styles/Color';

export const Accordion = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 10px;
  margin-top: 20px;
  background-color: ${ColorMap['grey'].light};
  padding-vertical: 8px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: ${ColorMap['white'].main};
`;
