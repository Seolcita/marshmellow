import * as S from './SiteInfoDetailItem.styles';

interface SiteInfoDetailItemProps {
  question: string;
  answer: string | number;
}

const SiteInfoDetailItem = ({ question, answer }: SiteInfoDetailItemProps) => {
  return (
    <S.Container>
      <S.QuestionContainer>
        <S.Image source={require('../../../../assets/images/like.png')} />
        <S.Question>{question}</S.Question>
      </S.QuestionContainer>
      <S.AnswerContainer>
        {answer === ' - ' ? (
          <S.Wrapper>
            <S.NotAnswered>Not Answered</S.NotAnswered>
          </S.Wrapper>
        ) : (
          <S.Answer>{answer}</S.Answer>
        )}
      </S.AnswerContainer>
    </S.Container>
  );
};

export default SiteInfoDetailItem;
