import styled from 'styled-components/native';

export const Container = styled.View`
  padding-horizontal: 10px;
  padding-bottom: 25px;
  width: 100%;
  height: 400px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-vertical: 15px;
  padding-horizontal: 40px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: skyblue;
`;
