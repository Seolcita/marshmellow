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
} from './lib/filter';
import * as S from './SiteInfo.styles';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import RatingFilterButtons from './RatingFilterButtons';
import { useAuth } from '../../../providers/AuthProvider';
import { useCampSitesPartialInfo } from '../../../api/site-info';
import SiteInfoCard from '../../composite/site-info/SiteInfoCard';
import { ButtonWrapper } from '../../common-styles/CommonStyles';

interface FilteredMySiteInfo extends FilteredSiteInfo {
  favourite?: boolean;
}

const SiteInfo = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [campSites, setCampSites] = useState<FilteredMySiteInfo[]>([]);
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<FilteredMySiteInfo[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [showFavourite, setShowFavourite] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [showFCFS, setShowFCFS] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showAny, setShowAny] = useState(false);
  const [rate, setRate] = useState(0);
  const [showReviewed, setShowReviewed] = useState(reviewedInitialState);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const {
    data: campSitesInfo,
    error,
    isLoading,
  } = useCampSitesPartialInfo(userId);

  useEffect(() => {
    if (campSitesInfo) {
      setCampSites(campSitesInfo);
    }
  }, [campSitesInfo]);

  const updateSearchByKeyword = (searchValue: string) => {
    setSearch(searchValue);
    filterDataByKeyword(searchValue);
  };

  const filterDataByKeyword = (searchTerm: string) => {
    if (!campSites || campSites.length === 0) return;

    const filtered = campSites.filter((item) =>
      item.campgroundName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReview = ({ filterType, rateValue }: HandleReview) => {
    handleFilter(filterType);
    setRate(rateValue);
  };

  const resetFilterStates = () => {
    setShowAll(false);
    setShowFavourite(false);
    setShowShared(false);
    setShowReviewed(reviewedInitialState);
    setShowFCFS(false);
    setShowReservation(false);
    setShowAny(false);
    setSearch('');
  };

  const resetReviewStates = () => {
    setShowReviewed(reviewedInitialState);
  };

  const handleFilter = (filterType: FilterType) => {
    if (!campSites || campSites.length === 0) return;

    setActiveFilters((prevFilters) => {
      let updatedFilters: FilterType[];
      setShowAll(false);

      if (filterType === FilterType.ALL) {
        resetFilterStates();
        setShowAll(true);
        updatedFilters = [];
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
      } else if (prevFilters.includes(filterType)) {
        updatedFilters = prevFilters.filter((filter) => filter !== filterType);
      } else {
        updatedFilters = [...prevFilters, filterType];
      }

      return [...new Set(updatedFilters)];
    });
  };

  const handleShowFavourite = () => {
    setShowFavourite((prev) => !prev);
    handleFilter(FilterType.FAVOURITE);
  };

  const handleShowShare = () => {
    setShowShared((prev) => !prev);
    handleFilter(FilterType.SHARED);
  };

  useEffect(() => {
    filterDataByKeyword(search);
  }, [campSites, search]);

  useEffect(() => {
    if (!campSites || campSites.length === 0) return;

    let filteredData = campSites;

    activeFilters.forEach((filterType) => {
      switch (filterType) {
        case FilterType.REVIEW1:
        case FilterType.REVIEW2:
        case FilterType.REVIEW3:
        case FilterType.REVIEW4:
        case FilterType.REVIEW5:
          filteredData = filteredData.filter((item) => item.rate === rate);
          break;
        case FilterType.SHARED:
          filteredData = filteredData.filter((item) => item.share === true);
          break;
        case FilterType.FAVOURITE:
          filteredData = filteredData.filter((item) => item.favourite === true);
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
  }, [activeFilters, campSites]);

  return (
    <S.Container>
      <S.FilterHeaderContainer>
        <S.Title>Site Information</S.Title>
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
            <ButtonWrapper width={28}>
              <Button
                text='All'
                onPress={() => handleFilter(FilterType.ALL)}
                borderRadius={5}
                textSize={16}
                bgColor={showAll ? selectedButtonBgColor : defaultButtonBgColor}
                paddingVertical={8}
              />
            </ButtonWrapper>
            <ButtonWrapper width={28}>
              <Button
                text='Shared'
                onPress={() => handleShowShare()}
                borderRadius={5}
                textSize={16}
                bgColor={
                  showShared ? selectedButtonBgColor : defaultButtonBgColor
                }
                paddingVertical={8}
              />
            </ButtonWrapper>
            <ButtonWrapper width={38}>
              <Button
                text='Favorites'
                onPress={() => handleShowFavourite()}
                borderRadius={5}
                textSize={16}
                bgColor={
                  showFavourite ? selectedButtonBgColor : defaultButtonBgColor
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
      <ScrollView
        style={{ padding: 0, margin: 0, width: '100%', marginTop: 20 }}
        overScrollMode='auto'
        showsVerticalScrollIndicator={false}
      >
        {filteredData.length > 0 &&
          filteredData?.map((item) => (
            <SiteInfoCard
              key={item.id}
              id={item.id}
              campgroundName={item.campgroundName}
              campgroundSiteNumber={item.campgroundSiteNumber}
              favourite={item.favourite}
              share={item.share}
            />
          ))}
      </ScrollView>
    </S.Container>
  );
};

export default SiteInfo;
