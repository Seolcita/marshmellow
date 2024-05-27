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
  radioButtonName: string;
  handleChange: any;
  items: RadioItems[];
}

const RadioButton = ({
  stateValue,
  radioButtonName,
  handleChange,
  items,
}: RadioButtonProps) => {
  return (
    <Radio.Group
      onValueChange={(value) => handleChange({ name: radioButtonName, value })}
      value={stateValue}
    >
      {items.map((item) => (
        <S.RadioButtonContainer key={item.id}>
          <Radio value={item.value} />
          <Text>{item.label}</Text>
        </S.RadioButtonContainer>
      ))}
    </Radio.Group>
  );
};

export default RadioButton;
