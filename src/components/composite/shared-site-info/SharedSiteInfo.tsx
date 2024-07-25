import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView } from 'react-native';

import { useWish } from '../../../api/wish';
import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import * as S from './SharedSiteInfo.styles';
import Button from '../../atomic/button/Button';
import { useAuth } from '../../../providers/AuthProvider';
import { useSharedCampSitesInfo } from '../../../api/site-info';
import { ButtonWrapper } from '../../common-styles/CommonStyles';
import SharedSiteInfoCard from '../../composite/shared-site-info/SharedSiteInfoCard';

export interface FilteredSiteInfo {
  id: string;
  userId: string;
  campgroundName: string;
  campgroundSiteNumber?: string;
  favourite?: boolean;
  rate?: number;
  reservationType?: string;
  share?: boolean;
  imageUrl?: string;
  wish?: boolean;
}

enum FilterType {
  ALL = 'ALL',
  REVIEW1 = 'REVIEW1',
  REVIEW2 = 'REVIEW2',
  REVIEW3 = 'REVIEW3',
  REVIEW4 = 'REVIEW4',
  REVIEW5 = 'REVIEW5',
  RESERVATION = 'RESERVATION',
  FCFS = 'FCFS',
  ANY = 'ANY',
  WISH = 'WISH',
}

const reviewFilters = [
  FilterType.REVIEW1,
  FilterType.REVIEW2,
  FilterType.REVIEW3,
  FilterType.REVIEW4,
  FilterType.REVIEW5,
];

const reviewedInitialState = {
  review1: false,
  review2: false,
  review3: false,
  review4: false,
  review5: false,
};

const ReviewMap = (filterType: FilterType) => {
  if (filterType === FilterType.REVIEW1) {
    return 'review1';
  } else if (filterType === FilterType.REVIEW2) {
    return 'review2';
  } else if (filterType === FilterType.REVIEW3) {
    return 'review3';
  } else if (filterType === FilterType.REVIEW4) {
    return 'review4';
  } else {
    return 'review5';
  }
};

const SharedSiteInfo = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [sharedCampSites, setSharedCampSites] = useState<FilteredSiteInfo[]>(
    []
  );
  const [wish, setWish] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [filteredData, setFilteredData] = useState<FilteredSiteInfo[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [showReviewed, setShowReviewed] = useState(reviewedInitialState);
  const [showFCFS, setShowFCFS] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showAny, setShowAny] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [rate, setRate] = useState(0);

  console.log('filter💕', activeFilters);

  const defaultButtonBgColor = ColorMap['grey'].dark;
  const selectedButtonBgColor = ColorMap['yellow'].dark;

  const {
    data: sharedCampSitesInfo,
    error: sharedCampSitesInfoError,
    isLoading: IsSharedCampSitesLoading,
  } = useSharedCampSitesInfo();

  const {
    data: wishData,
    error: wishError,
    isLoading: isWishLoading,
  } = useWish(userId);

  useEffect(() => {
    if (sharedCampSitesInfo) {
      setSharedCampSites(sharedCampSitesInfo);
    }
  }, [sharedCampSitesInfo]);

  useEffect(() => {
    if (wishData) {
      setWish(wishData);
    }
  }, [wishData]);

  const updateSearchByKeyword = (searchValue: string) => {
    setSearch(searchValue);
    filterDataByKeyword(searchValue);
  };

  const filterDataByKeyword = (searchTerm: string) => {
    if (!sharedCampSites || sharedCampSites.length === 0) return;

    const filtered = sharedCampSites.filter((item) =>
      item.campgroundName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReview = ({
    filterType,
    rateValue,
  }: {
    filterType: FilterType;
    rateValue: number;
  }) => {
    handleFilter(filterType);
    setRate(rateValue);
  };

  const resetFilterStates = () => {
    setShowAll(false);
    setShowReviewed(reviewedInitialState);
    setShowFCFS(false);
    setShowReservation(false);
    setShowAny(false);
    setSearch('');
    setShowWish(false);
  };

  const resetReviewStates = () => {
    setShowReviewed(reviewedInitialState);
  };

  const handleFilter = (filterType: FilterType) => {
    if (!sharedCampSites || sharedCampSites.length === 0) return;

    setActiveFilters((prevFilters) => {
      let updatedFilters: FilterType[];
      setShowAll(false);

      if (filterType === FilterType.ALL) {
        resetFilterStates();
        setShowAll(true);
        updatedFilters = [];
      } else if (filterType === FilterType.RESERVATION) {
        setShowReservation(true);
        setShowFCFS(false);
        setShowAny(false);
        const filtered = prevFilters.filter(
          (filter) => filter !== FilterType.FCFS && filter !== FilterType.ANY
        );
        updatedFilters = [...filtered, filterType];
      } else if (filterType === FilterType.FCFS) {
        setShowFCFS(true);
        setShowReservation(false);
        setShowAny(false);
        const filtered = prevFilters.filter(
          (filter) =>
            filter !== FilterType.RESERVATION && filter !== FilterType.ANY
        );
        updatedFilters = [...filtered, filterType];
      } else if (filterType === FilterType.ANY) {
        setShowAny(true);
        setShowFCFS(false);
        setShowReservation(false);
        const filtered = prevFilters.filter(
          (filter) =>
            filter !== FilterType.RESERVATION && filter !== FilterType.FCFS
        );
        updatedFilters = [...filtered, filterType];
      } else if (reviewFilters.includes(filterType)) {
        if (ReviewMap(filterType)) {
          resetReviewStates();
          setShowReviewed((prev) => ({
            ...prev,
            [ReviewMap(filterType)]: true,
          }));
        }

        const filtered = prevFilters.filter(
          (filter) => !reviewFilters.includes(filter)
        );
        updatedFilters = [...filtered, filterType];
      } else if (prevFilters.includes(FilterType.WISH)) {
        updatedFilters = prevFilters.filter(
          (filter) => filter !== FilterType.WISH
        );
      } else {
        updatedFilters = [...prevFilters, filterType];
      }

      return [...new Set(updatedFilters)];
    });
  };

  useEffect(() => {
    filterDataByKeyword(search);
  }, [sharedCampSites]);

  useEffect(() => {
    if (!sharedCampSites || sharedCampSites.length === 0) return;

    let filteredData = sharedCampSites;

    activeFilters.forEach((filterType) => {
      switch (filterType) {
        case FilterType.REVIEW1:
        case FilterType.REVIEW2:
        case FilterType.REVIEW3:
        case FilterType.REVIEW4:
        case FilterType.REVIEW5:
          filteredData = filteredData.filter((item) => item.rate === rate);
          break;
        case FilterType.WISH:
          filteredData = filteredData.filter((item) => wish.includes(item.id));
          break;
        case FilterType.RESERVATION:
          filteredData = filteredData.filter(
            (item) => item.reservationType === FilterType.RESERVATION
          );
          break;
        case FilterType.FCFS:
          filteredData = filteredData.filter(
            (item) => item.reservationType === FilterType.FCFS
          );
          break;
        case FilterType.ANY:
          filteredData = filteredData.filter(
            (item) => item.reservationType === FilterType.ANY
          );
          break;
        default:
          break;
      }
    });

    setFilteredData(filteredData);
  }, [activeFilters, sharedCampSites]);

  console.log('filteredData 🐸', filteredData);
  const handleShowWish = () => {
    setShowWish((prev) => !prev);
    handleFilter(FilterType.WISH);
  };

  return (
    <S.Container>
      <S.FilterHeaderContainer>
        <S.Title>Shared Site Info</S.Title>
        <S.FilterHeader
          onPress={() => setIsFilterOpen((prev) => !prev)}
          $isFilterOpen={isFilterOpen}
        >
          <Ionicons
            name='filter'
            size={20}
            color={
              isFilterOpen ? ColorMap['blue'].dark : ColorMap['white'].main
            }
          />
          <S.FilterHeaderText $isFilterOpen={isFilterOpen}>
            Filter
          </S.FilterHeaderText>
        </S.FilterHeader>
      </S.FilterHeaderContainer>
      {isFilterOpen && (
        <S.FilterContainer>
          <Input
            label=''
            isValid={true}
            textInputConfig={{
              value: search.trim(),
              onChangeText: (text) => {
                updateSearchByKeyword(text);
              },
              placeholder: '🔍 Search by Campground Name',
              keyboardType: 'default',
              placeholderTextColor: ColorMap['grey'].extraLight,
            }}
            style={{
              width: '100%',
              marginTop: -10,
              marginBottom: 30,
            }}
            borderColor={ColorMap['white'].main}
          />
          <S.ButtonsContainer>
            <ButtonWrapper width={48}>
              <Button
                text='All'
                onPress={() => handleFilter(FilterType.ALL)}
                borderRadius={5}
                textSize={16}
                bgColor={showAll ? selectedButtonBgColor : defaultButtonBgColor}
                paddingVertical={8}
              />
            </ButtonWrapper>
            <ButtonWrapper width={48}>
              <Button
                text='Saved'
                onPress={() => handleShowWish()}
                borderRadius={5}
                textSize={16}
                bgColor={
                  showWish ? selectedButtonBgColor : defaultButtonBgColor
                }
                paddingVertical={8}
              />
            </ButtonWrapper>
          </S.ButtonsContainer>
          <S.FilterCategoryText>Reservation Type</S.FilterCategoryText>
          <S.ButtonsContainer>
            <ButtonWrapper width={38}>
              <Button
                text='Reservation'
                onPress={() => handleFilter(FilterType.RESERVATION)}
                borderRadius={5}
                textSize={16}
                bgColor={
                  showReservation ? selectedButtonBgColor : defaultButtonBgColor
                }
                paddingVertical={8}
              />
            </ButtonWrapper>
            <ButtonWrapper width={28}>
              <Button
                text='FCFS'
                onPress={() => handleFilter(FilterType.FCFS)}
                borderRadius={5}
                textSize={16}
                bgColor={
                  showFCFS ? selectedButtonBgColor : defaultButtonBgColor
                }
                paddingVertical={8}
              />
            </ButtonWrapper>
            <ButtonWrapper width={28}>
              <Button
                text='Any'
                onPress={() => handleFilter(FilterType.ANY)}
                borderRadius={5}
                textSize={16}
                bgColor={showAny ? selectedButtonBgColor : defaultButtonBgColor}
                paddingVertical={8}
              />
            </ButtonWrapper>
          </S.ButtonsContainer>
          <S.FilterCategoryText>Rating</S.FilterCategoryText>
          <S.RatingContainer>
            <Button
              text='1'
              onPress={() =>
                handleReview({ filterType: FilterType.REVIEW1, rateValue: 1 })
              }
              bgColor={
                showReviewed.review1
                  ? selectedButtonBgColor
                  : defaultButtonBgColor
              }
            />
            <Button
              text='2'
              onPress={() =>
                handleReview({ filterType: FilterType.REVIEW2, rateValue: 2 })
              }
              bgColor={
                showReviewed.review2
                  ? selectedButtonBgColor
                  : defaultButtonBgColor
              }
            />
            <Button
              text='3'
              onPress={() =>
                handleReview({ filterType: FilterType.REVIEW3, rateValue: 3 })
              }
              bgColor={
                showReviewed.review3
                  ? selectedButtonBgColor
                  : defaultButtonBgColor
              }
            />
            <Button
              text='4'
              onPress={() =>
                handleReview({ filterType: FilterType.REVIEW4, rateValue: 4 })
              }
              bgColor={
                showReviewed.review4
                  ? selectedButtonBgColor
                  : defaultButtonBgColor
              }
            />
            <Button
              text='5'
              onPress={() =>
                handleReview({ filterType: FilterType.REVIEW5, rateValue: 5 })
              }
              bgColor={
                showReviewed.review5
                  ? selectedButtonBgColor
                  : defaultButtonBgColor
              }
            />
          </S.RatingContainer>
        </S.FilterContainer>
      )}
      <ScrollView
        style={{ padding: 0, margin: 0, width: '100%', marginTop: 20 }}
        overScrollMode='auto'
        showsVerticalScrollIndicator={false}
      >
        {filteredData.length > 0 &&
          filteredData?.map((item) => (
            <SharedSiteInfoCard
              key={item.id}
              id={item.id}
              userId={userId}
              campgroundName={item.campgroundName}
              campgroundSiteNumber={item.campgroundSiteNumber}
              favourite={item.favourite}
              rate={item.rate}
              reservationType={item.reservationType}
              share={item.share}
              imageUrl={item.imageUrl}
              isWish={wish.length === 0 ? false : wish.includes(item.id)}
            />
          ))}
      </ScrollView>
    </S.Container>
  );
};

export default SharedSiteInfo;
