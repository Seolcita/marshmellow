import { Pressable, View } from 'react-native';
import { forwardRef } from 'react';

import * as S from './Button.styles';

type ButtonProps = {
  text: string;
  textSize?: number;
  borderRadius?: number;
  fullWidth?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  (
    {
      text,
      textSize,
      borderRadius,
      fullWidth,
      paddingVertical,
      paddingHorizontal,
      marginVertical,
      marginHorizontal,
      ...pressableProps
    },
    ref
  ) => {
    return (
      <S.Pressable
        ref={ref}
        {...pressableProps}
        borderRadius={borderRadius}
        $fullWidth={fullWidth}
        $paddingVertical={paddingVertical}
        $paddingHorizontal={paddingHorizontal}
        $marginVertical={marginVertical}
        $marginHorizontal={marginHorizontal}
      >
        <S.Text $textSize={textSize}>{text}</S.Text>
      </S.Pressable>
    );
  }
);

export default Button;
