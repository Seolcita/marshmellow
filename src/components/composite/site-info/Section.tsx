import * as S from './Section.styles';

interface SectionProps {
  inputComponent: React.ReactNode;
  sectionTitle?: string;
  question: string;
}

const Section = ({ inputComponent, sectionTitle, question }: SectionProps) => {
  return (
    <>
      {sectionTitle && (
        <S.SectionTitleContainer>
          <S.SectionTitle>{sectionTitle}</S.SectionTitle>
        </S.SectionTitleContainer>
      )}
      <S.InputContainer>
        <S.QuestionContainer>
          <S.Image
            source={require('../../../../assets/images/icons/tent.png')}
          />
          <S.Question>{question}</S.Question>
        </S.QuestionContainer>
        <S.InputComponentContainer>{inputComponent}</S.InputComponentContainer>
      </S.InputContainer>
    </>
  );
};

export default Section;
