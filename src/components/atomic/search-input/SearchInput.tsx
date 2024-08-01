import { ComponentProps } from 'react';
import { TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View } from '../../Themed';
import styles from './SearchInput.styles';

interface InputProps {
  textInputConfig: ComponentProps<typeof TextInput>;
  style?: object;
  borderColor?: string;
  labelColor?: string;
}

const SearchInput = ({ textInputConfig, style }: InputProps) => {
  return (
    <>
      <View style={[styles.container, style]}>
        <TextInput {...textInputConfig} style={[styles.input]} />
        <View style={styles.icon}>
          <FontAwesome name='search' size={20} color='black' />
        </View>
      </View>
    </>
  );
};

export default SearchInput;
