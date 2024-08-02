import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const Section = styled.View`
  background-color: white;
`;

export const SectionTitleContainer = styled.View`
  background-color: ${ColorMap['blue'].dark};
  padding-horizontal: 16px;
  padding-vertical: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export const QuestionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Image = styled.Image`
  width: 22px;
  height: 22px;
  margin-bottom: 6px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const InputContainer = styled.View`
  margin-bottom: 30px;
  padding-horizontal: 10px;
`;

export const Question = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const InputComponentContainer = styled.View`
  margin-left: 24px;
`;
