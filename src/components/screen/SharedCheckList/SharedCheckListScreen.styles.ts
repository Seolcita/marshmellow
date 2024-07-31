import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

interface AccordionProps {
  $marginTop?: number;
}

export const Accordion = styled.Pressable<AccordionProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 20px;
  margin-horizontal: 10px;
  margin-top: ${({ $marginTop }) => $marginTop ?? 20}px;
  background-color: ${ColorMap['grey'].dark};
  padding-vertical: 8px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: ${ColorMap['white'].main};
`;
