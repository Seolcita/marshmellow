import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

interface RatingFilterButtonsProps {
  bgColor: string | undefined;
}

export const RatingFilterButton = styled.Pressable<RatingFilterButtonsProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  padding: 12px;
  border-radius: 5px;
  margin-right: 12px;
`;

export const RateText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  margin-right: 6px;
  color: ${ColorMap['white'].main};
`;
