import styled from 'styled-components/native';
import ColorMap from '../../../styles/Color';

export const ReviewContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  background-color: ${ColorMap['blue'].dark};
  padding-vertical: 8px;
  padding-horizontal: 20px;
  color: ${ColorMap['white'].main};
  border-radius: 5px;
  margin-bottom: 15px;
  margin-top: 10px;
`;
