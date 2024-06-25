import styled from 'styled-components/native';

interface ButtonContainerProps {
  $error?: boolean;
}

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  margin-bottom: -10px;
  padding-horizontal: 2px;
`;

export const ButtonContainer = styled.View<ButtonContainerProps>`
  margin-bottom: ${({ $error }) => ($error ? '22px' : '-2px')};
`;
