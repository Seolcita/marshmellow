import FontAwesome from '@expo/vector-icons/FontAwesome';

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}

const TabBarIcon = ({ name, color }: TabBarIconProps) => {
  return (
    <FontAwesome
      size={20}
      name={name}
      color={color}
      style={{ marginBottom: -5 }}
    />
  );
};

export default TabBarIcon;
