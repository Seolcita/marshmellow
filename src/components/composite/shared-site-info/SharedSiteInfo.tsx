import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView } from 'react-native';

import {
  defaultButtonBgColor,
  FilteredSiteInfo,
  FilterType,
  HandleReview,
  reviewedInitialState,
  reviewFilters,
  ReviewMap,
  selectedButtonBgColor,
} from '../site-info/lib/filter';
import { useWish } from '../../../api/wish';
import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import * as S from './SharedSiteInfo.styles';
import Button from '../../atomic/button/Button';
import { useAuth } from '../../../providers/AuthProvider';
import { useSharedCampSitesInfo } from '../../../api/site-info';
import { ButtonWrapper } from '../../common-styles/CommonStyles';
import RatingFilterButtons from '../site-info/RatingFilterButtons';
import SharedSiteSkeletons from '../skeleton/shared-site/SharedSiteSkeletons';
import SharedSiteInfoCard from '../../composite/shared-site-info/SharedSiteInfoCard';

export interface FilteredSharedSiteInfo extends FilteredSiteInfo {
  wish?: boolean;
}

const SharedSiteInfo = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [sharedCampSites, setSharedCampSites] = useState<
    FilteredSharedSiteInfo[]
  >([]);
  const [wish, setWish] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [filteredData, setFilteredData] = useState<FilteredSharedSiteInfo[]>(
    []
  );
  const [showAll, setShowAll] = useState(false);
  const [showReviewed, setShowReviewed] = useState(reviewedInitialState);
  const [showFCFS, setShowFCFS] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showAny, setShowAny] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [rate, setRate] = useState(0);

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

  const handleReview = ({ filterType, rateValue }: HandleReview) => {
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

  const handleShowWish = () => {
    setShowWish((prev) => !prev);
    handleFilter(FilterType.WISH);
  };

  useEffect(() => {
    filterDataByKeyword(search);
  }, [sharedCampSites, search]);

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

  return (
    <S.Container>
      <S.FilterHeaderContainer>
        <Input
          label=''
          isValid={true}
          textInputConfig={{
            value: search.trim(),
            onChangeText: (text) => {
              updateSearchByKeyword(text);
            },
            placeholder: 'Search by Campground Name',
            keyboardType: 'default',
            placeholderTextColor: ColorMap['grey'].main,
          }}
          style={{
            width: '85%',
            marginTop: -5,
            marginBottom: 15,
          }}
          borderColor={ColorMap['black'].main}
        />
        <S.Filter
          onPress={() => setIsFilterOpen((prev) => !prev)}
          $isFilterOpen={isFilterOpen}
        >
          <Ionicons name='filter' size={28} color={ColorMap['blue'].dark} />
        </S.Filter>
      </S.FilterHeaderContainer>
      {isFilterOpen && (
        <S.FilterContainer>
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
            <RatingFilterButtons
              showReviewed={showReviewed}
              handleReview={handleReview}
            />
          </S.RatingContainer>
        </S.FilterContainer>
      )}
      {IsSharedCampSitesLoading || isWishLoading ? (
        <SharedSiteSkeletons />
      ) : (
        <ScrollView
          style={{ padding: 0, margin: 0, width: '100%', marginTop: 10 }}
          overScrollMode='auto'
          showsVerticalScrollIndicator={false}
        >
          {filteredData.length > 0 ? (
            filteredData?.map((item) => (
              <SharedSiteInfoCard
                key={item.id}
                id={item.id}
                userId={userId}
                campgroundName={item.campgroundName}
                campgroundSiteNumber={item.campgroundSiteNumber}
                rate={item.rate}
                reservationType={item.reservationType}
                share={item.share}
                imageUrl={item.imageUrl}
                isWish={wish.length === 0 ? false : wish.includes(item.id)}
              />
            ))
          ) : (
            <S.NoDataFoundContainer>
              <S.NoDataFoundText>
                Sorry, no data matches your search.
              </S.NoDataFoundText>
            </S.NoDataFoundContainer>
          )}
        </ScrollView>
      )}
    </S.Container>
  );
};

export default SharedSiteInfo;
