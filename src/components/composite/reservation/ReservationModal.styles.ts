import styled from 'styled-components/native';
import ColorMap from '../../../styles/Color';

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-vertical: 10px;
  text-align: center;
  background-color: #f0f0f0;
  padding-vertical: 10px;
  border-radius: 50px;
`;

export const DateErrorText = styled.Text`
  color: ${ColorMap['red'].main};
  text-align: center;
  margin-bottom: 20px;
`;

export const InputContainer = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const TextWrapper = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Span = styled.Text`
  font-size: 16px;
  color: grey;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
