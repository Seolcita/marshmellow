import { forwardRef } from 'react';
import { Link, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import * as S from './Button.styles';

type ButtonProps = {
  text: string;
  href?: Href<string>;
  bgColor?: string;
  textSize?: number;
  borderRadius?: number;
  width?: number;
  fullWidth?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  hasBorder?: boolean;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  (
    {
      text,
      href,
      bgColor,
      textSize,
      borderRadius,
      width,
      fullWidth,
      paddingVertical,
      paddingHorizontal,
      marginVertical,
      marginHorizontal,
      hasBorder,
      ...pressableProps
    },
    ref
  ) => {
    return (
      <S.Pressable
        ref={ref}
        {...pressableProps}
        borderRadius={borderRadius}
        $hasBorder={hasBorder}
        $bgColor={bgColor}
        width={width}
        $fullWidth={fullWidth}
        $paddingVertical={paddingVertical}
        $paddingHorizontal={paddingHorizontal}
        $marginVertical={marginVertical}
        $marginHorizontal={marginHorizontal}
      >
        {href ? (
          <Link href={href} style={{ width: '100%', textAlign: 'center' }}>
            <S.Text $textSize={textSize}>{text}</S.Text>
          </Link>
        ) : (
          <S.Text $textSize={textSize}>{text}</S.Text>
        )}
      </S.Pressable>
    );
  }
);

export default Button;
