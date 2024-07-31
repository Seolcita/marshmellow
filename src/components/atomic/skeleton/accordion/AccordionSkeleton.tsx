import { FontAwesome } from '@expo/vector-icons';

import * as S from './AccordionSkeleton.styles';

interface AccordionSkeletonProps {
  title: string;
}

const AccordionSkeleton = ({ title }: AccordionSkeletonProps) => {
  return (
    <S.Accordion>
      <S.Text>{title}</S.Text>
      <FontAwesome name='caret-down' size={24} color='white' />
    </S.Accordion>
  );
};

export default AccordionSkeleton;
