import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const Container = styled.View`
  padding-horizontal: 10px;
  padding-bottom: 24px;
  background-color: white;
`;

export const QuestionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Image = styled.Image`
  width: 15px;
  height: 13px;
  margin-bottom: 5px;
`;

export const Question = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const AnswerContainer = styled.View`
  font-size: 18px;
  padding-left: 25px;
  margin-top: -5px;
`;

export const Answer = styled.Text`
  font-size: 18px;
`;

export const Wrapper = styled.View`
  padding-vertical: 5px;
  border-radius: 2px;
  background-color: ${ColorMap['grey'].extraLight};
  width: 120px;
  align-items: center;
  justify-content: center;
`;

export const NotAnswered = styled.Text`
  font-size: 16px;
`;
