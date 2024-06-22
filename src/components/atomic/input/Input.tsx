import { ComponentProps } from 'react';
import { TextInput } from 'react-native';

import styles from './Input.styles';
import { Text, View } from '../../Themed';
import ColorMap from '../../../styles/Color';

interface InputProps {
  label: string;
  isValid: boolean;
  textInputConfig: ComponentProps<typeof TextInput>;
  error?: string;
  style?: object;
  borderColor?: string;
  labelColor?: string;
  errorColor?: string;
}

const Input = ({
  label,
  textInputConfig,
  style,
  isValid,
  error,
  borderColor,
  labelColor,
  errorColor,
}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[
          styles.label,
          { color: labelColor ?? ColorMap['black'].main },
          !isValid && { color: errorColor ?? ColorMap['red'].main },
        ]}
      >
        {label}
      </Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          { borderColor: borderColor ?? ColorMap['black'].main },
          { color: borderColor ?? ColorMap['black'].main },
          !isValid && { borderColor: errorColor ?? ColorMap['red'].main },
        ]}
      />
      {!!error && (
        <Text
          style={[{ color: errorColor ?? ColorMap['red'].main, marginTop: 5 }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
