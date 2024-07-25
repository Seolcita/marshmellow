import { Octicons } from '@expo/vector-icons';

import {
  defaultButtonBgColor,
  FilterType,
  HandleReview,
  selectedButtonBgColor,
  ShowReviewed,
} from './lib/filter';
import * as S from './RatingFilterButtons.styles';

interface RatingFilterButtonsProps {
  showReviewed: ShowReviewed;
  handleReview: (handleReview: HandleReview) => void;
}

const RatingFilterButtons = ({
  showReviewed,
  handleReview,
}: RatingFilterButtonsProps) => {
  return (
    <>
      <S.RatingFilterButton
        bgColor={
          showReviewed.review1 ? selectedButtonBgColor : defaultButtonBgColor
        }
        onPress={() =>
          handleReview({ filterType: FilterType.REVIEW1, rateValue: 1 })
        }
      >
        <S.RateText>1</S.RateText>
        <Octicons name='star-fill' size={20} color='white' />
      </S.RatingFilterButton>
      <S.RatingFilterButton
        bgColor={
          showReviewed.review2 ? selectedButtonBgColor : defaultButtonBgColor
        }
        onPress={() =>
          handleReview({ filterType: FilterType.REVIEW2, rateValue: 2 })
        }
      >
        <S.RateText>2</S.RateText>
        <Octicons name='star-fill' size={20} color='white' />
      </S.RatingFilterButton>
      <S.RatingFilterButton
        bgColor={
          showReviewed.review3 ? selectedButtonBgColor : defaultButtonBgColor
        }
        onPress={() =>
          handleReview({ filterType: FilterType.REVIEW3, rateValue: 3 })
        }
      >
        <S.RateText>3</S.RateText>
        <Octicons name='star-fill' size={20} color='white' />
      </S.RatingFilterButton>
      <S.RatingFilterButton
        bgColor={
          showReviewed.review4 ? selectedButtonBgColor : defaultButtonBgColor
        }
        onPress={() =>
          handleReview({ filterType: FilterType.REVIEW4, rateValue: 4 })
        }
      >
        <S.RateText>4</S.RateText>
        <Octicons name='star-fill' size={20} color='white' />
      </S.RatingFilterButton>
      <S.RatingFilterButton
        bgColor={
          showReviewed.review5 ? selectedButtonBgColor : defaultButtonBgColor
        }
        onPress={() =>
          handleReview({ filterType: FilterType.REVIEW5, rateValue: 5 })
        }
      >
        <S.RateText>5</S.RateText>
        <Octicons name='star-fill' size={20} color='white' />
      </S.RatingFilterButton>
    </>
  );
};

export default RatingFilterButtons;
