import styled from 'styled-components/native';

import ColorMap from '../../../../styles/Color';

export const Container = styled.View`
  width: 100%;
  padding-top: 20px;
  align-items: center;
`;

export const SubjectContainer = styled.View`
  width: 100%;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  background-color: ${ColorMap['grey'].light};
  border-radius: 5px;
  margin-top: 20px;
`;

export const ReviewContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

export const Subject = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${ColorMap['white'].main};
`;

export const QnAContainer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 20px;
  margin-vertical: 10px;
  padding-left: 4px;
`;

export const QnAWrapper = styled.View`
  gap: 8px;
`;
