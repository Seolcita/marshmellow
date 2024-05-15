import styled from 'styled-components/native';

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  width: 100%;
`;

export const Button = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: lightgrey;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;
