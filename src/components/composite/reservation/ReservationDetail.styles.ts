import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CampgroundName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 20px;
`;

export const Text = styled.Text`
  font-size: 16px;
  margin-vertical: 2px;
`;

export const ModalTitle = styled.Text`
  font-size: 23px;
  font-weight: bold;
  text-align: center;
`;

export const MessageContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 40px;
`;

export const ConfirmMessage = styled.Text`
  color: ${ColorMap['red'].main};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const ModalButtonContainer = styled(TwoButtonContainer)``;
