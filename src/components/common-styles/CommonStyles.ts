import styled from 'styled-components/native';

interface ButtonWrapperProps {
  width?: number;
}

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Tile = styled.View`
  margin-horizontal: 20px;
  margin-vertical: 8px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  elevation: 5;
`;

export const TopScreenImageBackgroundContainer = styled.View`
  width: 100%;
  height: 180px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  overflow: hidden;
`;
export const TopScreenImageBackground = styled.ImageBackground`
  height: 100%;
`;

export const TwoButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
`;

export const ButtonWrapper = styled.View<ButtonWrapperProps>`
  width: ${({ width }) => width && `${width}%`};
  background-color: transparent;
`;

export const StickyButton = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
`;
