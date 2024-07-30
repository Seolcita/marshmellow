import { View } from '../../../Themed';
import AccordionSkeleton from '../../../atomic/skeleton/accordion/AccordionSkeleton';

const AccordionSkeletons = () => {
  return (
    <View style={{ width: '100%' }}>
      <AccordionSkeleton title='Create Invitation' />
      <AccordionSkeleton title='Invitation Status' />
      <AccordionSkeleton title='Admin Settings' />
    </View>
  );
};

export default AccordionSkeletons;
