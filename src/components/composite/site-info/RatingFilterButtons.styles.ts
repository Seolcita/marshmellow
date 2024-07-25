import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

interface RatingFilterButtonsProps {
  bgColor: string | undefined;
}

export const RatingFilterButton = styled.Pressable<RatingFilterButtonsProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  padding: 16px 14px;
  border-radius: 5px;
`;

export const RateText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-right: 8px;
  color: ${ColorMap['white'].main};
`;
