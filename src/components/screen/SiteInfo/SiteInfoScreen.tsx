import { router } from 'expo-router';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView } from 'react-native';

import { ButtonWrapper } from '../../common-styles/CommonStyles';
import { useEffect, useState } from 'react';
import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import * as S from './SiteInfoScreen.styles';
import Button from '../../atomic/button/Button';
import { useAuth } from '../../../providers/AuthProvider';
import { useCampSitesPartialInfo } from '../../../api/site-info';
import SiteInfoCard from '../../composite/site-info/SiteInfoCard';

interface FilteredSiteInfo {
  id: string;
  userId: string;
  campgroundName: string;
  campgroundSiteNumber: string;
  favourite: boolean;
}

enum FilterType {
  ALL = 'ALL',
  FAVOURITE = 'FAVOURITE',
  REVIEW = 'REVIEW',
  RESERVATION = 'RESERVATION',
  FCFS = 'FCFS',
  ANY = 'ANY',
}

const SiteInfoScreen = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<FilteredSiteInfo[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [showFavourite, setFavourite] = useState(false);
  const [showReviewed, setShowReviewed] = useState(false);
  const [showFCFS, setShowFCFS] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showAny, setShowAny] = useState(false);
  const [rate, setRate] = useState(0);

  const defaultButtonBgColor = ColorMap['grey'].dark;
  const selectedButtonBgColor = ColorMap['yellow'].dark;

  const { data, error, isLoading } = useCampSitesPartialInfo(userId);

  const updateSearchByKeyword = (searchValue: string) => {
    setSearch(searchValue);
    filterDataByKeyword(searchValue);
  };

  const filterDataByKeyword = (searchTerm: string) => {
    if (!data || data.length === 0) return;

    const filtered = data.filter((item) =>
      item.campgroundName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const resetFilterStates = () => {
    setShowAll(false);
    setFavourite(false);
    setShowReviewed(false);
    setShowFCFS(false);
    setShowReservation(false);
    setShowAny(false);
    setSearch('');
  };

  const handleFilter = (filterType: FilterType) => {
    if (!data || data.length === 0) return;

    resetFilterStates();

    if (filterType === FilterType.ALL) {
      setFilteredData(data);
      setShowAll(true);
    } else if (filterType === FilterType.REVIEW) {
      const filtered = data.filter((item) => item.rate >= rate);
      setFilteredData(filtered);
      setShowReviewed(true);
    } else if (filterType === FilterType.FAVOURITE) {
      const filtered = data.filter((item) => item.favourite === true);
      setFilteredData(filtered);
      setFavourite(true);
    } else if (filterType === FilterType.RESERVATION) {
      const filtered = data.filter(
        (item) => item.reservationType === filterType
      );
      setFilteredData(filtered);
      setShowReservation(true);
    } else if (filterType === FilterType.FCFS) {
      const filtered = data.filter(
        (item) => item.reservationType === filterType
      );
      setFilteredData(filtered);
      setShowFCFS(true);
    } else if (filterType === FilterType.ANY) {
      const filtered = data.filter(
        (item) => item.reservationType === filterType
      );
      setFilteredData(filtered);
      setShowAny(true);
    } else {
      return;
    }
  };

  const handleReview = (rate: number) => {
    setRate(rate);
  };

  useEffect(() => {
    filterDataByKeyword(search);
  }, [data]);

  useEffect(() => {
    resetFilterStates();
  }, []);

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
                text='Favorites'
                onPress={() => handleFilter(FilterType.FAVOURITE)}
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
            <Rating
              type='custom'
              ratingColor='#FEB941'
              ratingBackgroundColor={ColorMap['grey'].light}
              tintColor={ColorMap['blue'].dark}
              ratingCount={5}
              startingValue={0}
              imageSize={35}
              onFinishRating={(rate: number) => handleReview(rate)}
            />
            <Button
              text='Search'
              onPress={() => handleFilter(FilterType.REVIEW)}
              borderRadius={5}
              textSize={16}
              bgColor={
                showReviewed ? selectedButtonBgColor : defaultButtonBgColor
              }
              paddingVertical={8}
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
              userId={item.userId}
              campgroundName={item.campgroundName}
              campgroundSiteNumber={item.campgroundSiteNumber}
              favourite={item.favourite}
            />
          ))}
      </ScrollView>
    </S.Container>
  );
};

export default SiteInfoScreen;
