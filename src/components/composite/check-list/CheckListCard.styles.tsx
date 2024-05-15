import styled from 'styled-components/native';

export const Container = styled.View`
  margin-horizontal: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  shadow-color: black;
  elevation: 1;
`;

export const Contents = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
