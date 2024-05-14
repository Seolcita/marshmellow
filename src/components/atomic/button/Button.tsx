import { Pressable, Text, View } from 'react-native';
import { forwardRef } from 'react';

import * as S from './Button.styles';

type ButtonProps = {
  text: string;
  padding?: number;
  borderRadius?: number;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, borderRadius, ...pressableProps }, ref) => {
    return (
      <S.Pressable ref={ref} {...pressableProps} borderRadius={borderRadius}>
        <S.Text>{text}</S.Text>
      </S.Pressable>
    );
  }
);

export default Button;
