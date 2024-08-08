import { Skeleton } from '@rneui/themed';

import { View } from '../../../Themed';

const MemberSkeletons = () => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'transparent',
      }}
    >
      <Skeleton animation='wave' width={50} height={20} />
      <Skeleton animation='wave' width={100} height={20} />
      <Skeleton animation='wave' width={70} height={20} />
    </View>
  );
};

export default MemberSkeletons;
