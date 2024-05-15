import styled from 'styled-components/native';

export const Wrapper = styled.View`
  margin-bottom: 10px;
  padding-horizontal: 20px;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: lightgrey;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  margin-vertical: 5px;
`;

export const CategoryName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const CategoryButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const AddCategoryContainer = styled.View`
  margin-vertical: 20px;
  margin-horizontal: 20px;
  padding-top: 20px;
  padding-horizontal: 20px;
  background-color: lightgrey;
  border-radius: 5px;
`;

export const AddInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: -10px;
`;

export const EditInputContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 23px;
  font-weight: bold;
`;

export const ConfirmMessage = styled.Text`
  font-size: 20px;
  margin-vertical: 20px;
`;

export const Span = styled.Text`
  color: red;
`;
