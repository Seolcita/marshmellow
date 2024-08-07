import { ReactNode } from 'react';
import { forwardRef } from 'react';
import * as S from './IconButton.styles';
import { Pressable } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

type IconButtonProps = {
  icon: ReactNode;
  text: string;
  hasShadow?: boolean;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const IconButton = forwardRef<View | null, IconButtonProps>(
  ({ icon, text, hasShadow, ...pressableProps }, ref) => {
    return (
      <S.IconButtonContainer
        ref={ref}
        {...pressableProps}
        $hasShadow={hasShadow}
      >
        <S.IconContainer>{icon}</S.IconContainer>
        <S.TextContainer>
          <S.Text>{text}</S.Text>
        </S.TextContainer>
      </S.IconButtonContainer>
    );
  }
);

export default IconButton;
