import styled from 'styled-components/native';
import ColorMap from '../../../styles/Color';

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  padding-vertical: 10px;
  border-radius: 50px;
`;

export const DateErrorText = styled.Text`
  color: ${ColorMap['red'].main};
  text-align: center;
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
  font-size: 14px;
  color: grey;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
