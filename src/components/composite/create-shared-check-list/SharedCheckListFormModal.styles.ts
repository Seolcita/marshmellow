import styled from 'styled-components/native';

import { TwoButtonContainer } from '../../common-styles/CommonStyles';

export const Container = styled.View`
  flex: 1;
  padding-vertical: 20px;
`;

export const Title = styled.Text`
  font-size: 30px;
`;

export const ModalTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-vertical: 10px;
  text-align: center;
  padding-vertical: 10px;
  border-radius: 50px;
`;

export const Buttons = styled(TwoButtonContainer)``;
