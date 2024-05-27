import { TextInput } from 'react-native';
import { Text, View } from '../../Themed';
import { ComponentProps } from 'react';
import styles from './Input.styles';

interface InputProps {
  label: string;
  isValid: boolean;
  textInputConfig: ComponentProps<typeof TextInput>;
  error?: string;
  style?: object;
}

const Input = ({
  label,
  textInputConfig,
  style,
  isValid,
  error,
}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, !isValid && { color: 'red' }]}>{label}</Text>
      <TextInput
        {...textInputConfig}
        style={[styles.input, !isValid && { borderColor: 'red' }]}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
