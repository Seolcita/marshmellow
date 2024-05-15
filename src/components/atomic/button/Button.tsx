import { Pressable, View } from 'react-native';
import { forwardRef } from 'react';

import * as S from './Button.styles';

type ButtonProps = {
  text: string;
  padding?: number;
  borderRadius?: number;
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, borderRadius, fullWidth, ...pressableProps }, ref) => {
    return (
      <S.Pressable
        ref={ref}
        {...pressableProps}
        borderRadius={borderRadius}
        $fullWidth={fullWidth}
      >
        <S.Text>{text}</S.Text>
      </S.Pressable>
    );
  }
);

export default Button;
