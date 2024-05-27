import { Text } from '../../Themed';
import * as S from './SiteInfoDetailItem.styles';
import { Entypo } from '@expo/vector-icons';

interface SiteInfoDetailItemProps {
  question: string;
  answer: string | number;
}

const SiteInfoDetailItem = ({ question, answer }: SiteInfoDetailItemProps) => {
  return (
    <S.Container>
      <S.Question>{question}</S.Question>
      <S.Answer>{answer}</S.Answer>
    </S.Container>
  );
};

export default SiteInfoDetailItem;
