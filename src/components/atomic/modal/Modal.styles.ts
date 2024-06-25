import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  background-color: rgba(0, 0, 0, 0.85);
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  elevation: 5;
  width: 80%;
`;

export const CloseButton = styled.Pressable`
  align-self: flex-end;
  margin-bottom: 10px;
`;
