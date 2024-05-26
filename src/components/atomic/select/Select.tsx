import { Picker } from '@react-native-picker/picker';

interface SelectItem {
  id: number;
  label: string;
  value: any;
}

interface SelectProps {
  stateValue: any;
  selectName: string;
  handleChange: any;
  items: SelectItem[];
}

const Select = ({
  stateValue,
  selectName,
  handleChange,
  items,
}: SelectProps) => {
  return (
    <Picker
      selectedValue={stateValue}
      onValueChange={(itemValue) =>
        handleChange({ name: selectName, value: itemValue })
      }
    >
      <Picker.Item label='Select an option...' value='' />
      {items.map((item) => (
        <Picker.Item key={item.id} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default Select;
