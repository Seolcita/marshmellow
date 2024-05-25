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
        <S.Question>Q. {question} </S.Question>
        {inputComponent}
      </S.InputContainer>
    </>
  );
};

export default Section;
