import { Text } from '../../Themed';

interface SiteInfoDetailProps {
  id: string;
}

const SiteInfoDetail = ({ id }: SiteInfoDetailProps) => {
  return (
    <>
      <Text>ID: {id}</Text>
      <Text>Detail </Text>
    </>
  );
};

export default SiteInfoDetail;
