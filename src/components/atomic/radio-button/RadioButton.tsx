import { RadioButton as Radio } from 'react-native-paper';

import { Text } from '../../Themed';
import * as S from './RadioButton.styles';

interface RadioItems {
  id: number;
  label: string;
  value: any;
}

interface RadioButtonProps {
  stateValue: any;
  handleChange: any;
  items: RadioItems[];
}

const RadioButton = ({ stateValue, handleChange, items }: RadioButtonProps) => {
  return (
    <Radio.Group
      onValueChange={(value) => handleChange({ name: 'needParkPass', value })}
      value={stateValue}
    >
      {items.map((item) => (
        <S.RadioButtonContainer>
          <Radio value={item.value} />
          <Text>{item.label}</Text>
        </S.RadioButtonContainer>
      ))}
    </Radio.Group>
  );
};

export default RadioButton;
