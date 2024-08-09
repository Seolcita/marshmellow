import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

interface ButtonContainerProps {
  error: boolean;
}

export const NoCategoryContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${ColorMap['white'].main};
  border-radius: 5px;
  padding: 20px;
  margin-top: 8px;
`;

export const NoCategoryText = styled.Text`
  font-size: 18px;
  color: ${ColorMap['black'].main};
  font-weight: bold;
  line-height: 24px;
`;

export const Wrapper = styled.View`
  background-color: #f1f1f1;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${ColorMap['grey'].dark};
  padding-vertical: 10px;
  padding-horizontal: 20px;
  margin-vertical: 5px;
  border-radius: 5px;
`;

export const CategoryNameContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const CategoryName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${ColorMap['white'].main};
`;

export const CategoryButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const AddCategoryContainer = styled.View`
  margin-vertical: 20px;
  border-radius: 10px;
  width: 100%;
  height: 150px;
  overflow: hidden;
  padding-top: 20px;
  padding-horizontal: 20px;
  background-color: #dddddd;
`;

export const AddCategoryImageBackground = styled.ImageBackground``;

export const ButtonContainer = styled.View<ButtonContainerProps>`
  margin-bottom: ${({ error }) => (error ? '22px' : '-2px')};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: -8px;
  color: ${ColorMap['black'].main};
`;

export const EditInputContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const ConfirmMessage = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
  line-height: 28px;
  padding: 4px;
`;

export const Span = styled.Text`
  color: red;
`;
