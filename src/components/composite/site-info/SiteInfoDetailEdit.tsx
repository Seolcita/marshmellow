import { router } from 'expo-router';
import { Skeleton } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Rating } from 'react-native-ratings';
import { Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

import {
  booleanRadioButtonItems,
  campingTypesSelectItems,
  carAccessTypesSelectItems,
  privacySelectItems,
  reservationTypesSelectItems,
  siteSizeSelectItems,
  toiletTypesSelectItems,
} from './lib/input-options';
import {
  useDeleteExistingSiteImage,
  useSaveSiteImage,
} from '../../../api/storage';
import Section from './Section';
import ColorMap from '../../../styles/Color';
import Input from '../../atomic/input/Input';
import Button from '../../atomic/button/Button';
import Select from '../../atomic/select/Select';
import * as S from './SiteInfoDetailEdit.styles';
import { ReservationType } from '../../../types';
import { initialValues } from './lib/initial-values';
import { useAuth } from '../../../providers/AuthProvider';
import RadioButton from '../../atomic/radio-button/RadioButton';
import RemoteImage from '../../atomic/remote-Image/RemoteImage';
import { convertType, convertTypeForInitialValues } from './lib/convert-type';
import { useCampSiteInfo, useUpdateCampSiteInfo } from '../../../api/site-info';
import SiteDetailsSkeleton from '../skeleton/site-detail/SiteDetailsSkeleton';

interface SiteInfoDetailProps {
  id: string;
  setIsEditMode: (prev: boolean) => void;
}

export interface SiteInfoDetail {
  [key: string]: string | undefined;
}

const SiteInfoDetailEdit = ({ id, setIsEditMode }: SiteInfoDetailProps) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoDetail>(initialValues);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { mutate: updateSiteInfo } = useUpdateCampSiteInfo({ id, userId });
  const {
    data: siteInfoInitialValues,
    error,
    isLoading: isSiteInfoInitialValuesLoading,
  } = useCampSiteInfo(id);

  useEffect(() => {
    if (siteInfoInitialValues) {
      const convertedSiteInfoInitialValues = convertTypeForInitialValues(
        siteInfoInitialValues
      );
      setSiteInfo(convertedSiteInfoInitialValues);
    }
    if (!isSiteInfoInitialValuesLoading) {
      setIsLoading(false);
    }
  }, [siteInfoInitialValues, isSiteInfoInitialValuesLoading]);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setSiteInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const convertedSiteInfo = convertType(siteInfo);

    updateSiteInfo({ ...convertedSiteInfo });
    setIsEditMode(false);
  };

  const pickImage = async () => {
    // If image is exists, delete the image from storage before uploading new image
    if (siteInfo.imageUrl) {
      useDeleteExistingSiteImage(siteInfo.imageUrl);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
    }

    result.assets &&
      result.assets[0].uri &&
      (await handleSaveImage(result.assets[0].uri));
  };

  const uploadImage = async (path: string) => {
    if (!path?.startsWith('file://')) {
      return;
    }

    setPreviewLoading(true);

    const storedImagePath = await useSaveSiteImage(path);

    storedImagePath && setPreviewLoading(false);

    return storedImagePath;
  };

  const handleSaveImage = async (path: string) => {
    const storedImagePath = await uploadImage(path);

    storedImagePath &&
      handleChange({ name: 'imageUrl', value: storedImagePath });
  };

  const setSiteImage = () => {
    if (previewLoading) {
      return (
        <S.PreviewLoading>
          <Skeleton width={350} height={200} animation='wave' />
        </S.PreviewLoading>
      );
    } else if (!!siteInfo.imageUrl) {
      return (
        <S.UploadedImage>
          <RemoteImage path={siteInfo.imageUrl} />
        </S.UploadedImage>
      );
    } else if (!!previewImage) {
      return (
        <S.UploadedImage>
          <S.PreviewImage source={{ uri: previewImage }} />
        </S.UploadedImage>
      );
    } else {
      return (
        <S.DefaultImage
          source={require('../../../../assets/images/upload-default.png')}
        />
      );
    }
  };

  return (
    <>
      {!isLoading && siteInfo ? (
        <PaperProvider>
          <ScrollView>
            <S.SectionContainer>
              <S.UploadImageContainer>
                {setSiteImage()}
                <S.UploadImageButton onPress={pickImage}>
                  <FontAwesome6 name='upload' size={20} color='black' />
                  <S.Text>Upload Image</S.Text>
                </S.UploadImageButton>
              </S.UploadImageContainer>
            </S.SectionContainer>
            <S.SectionContainer>
              <Section
                sectionTitle='Review'
                question='How much are you satisfied?'
                inputComponent={
                  <Rating
                    type='custom'
                    ratingColor='#FEB941'
                    ratingBackgroundColor='#F6E9B2'
                    tintColor='white'
                    ratingCount={5}
                    jumpValue={0.5}
                    fractions={1}
                    imageSize={30}
                    startingValue={
                      siteInfo.rating ? parseFloat(siteInfo.rating) : 0
                    }
                    onFinishRating={(rate: number) => {
                      handleChange({
                        name: 'rating',
                        value: rate.toString(),
                      });
                    }}
                    style={{ paddingTop: 20, alignSelf: 'flex-start' }}
                  />
                }
              />

              <Section
                question='Is this one of your favourite site?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.favourite}
                    radioButtonName='favourite'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />
              <Section
                question='Do you want to share this site info?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.share}
                    radioButtonName='share'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />
            </S.SectionContainer>

            <S.SectionContainer>
              <Section
                sectionTitle='Campsite Info'
                question='What is the campsite type?'
                inputComponent={
                  <Select
                    stateValue={siteInfo.campingType}
                    selectName='campingType'
                    handleChange={handleChange}
                    items={campingTypesSelectItems}
                  />
                }
              />

              <Section
                question='What is the campsite size?'
                inputComponent={
                  <Select
                    stateValue={siteInfo.siteSize}
                    selectName='siteSize'
                    handleChange={handleChange}
                    items={siteSizeSelectItems}
                  />
                }
              />

              <Section
                question='How is the campsite privacy?'
                inputComponent={
                  <Select
                    stateValue={siteInfo.privacy}
                    selectName='privacy'
                    handleChange={handleChange}
                    items={privacySelectItems}
                  />
                }
              />

              <Section
                question='What is the car access type?'
                inputComponent={
                  <Select
                    stateValue={siteInfo.carAccess}
                    selectName='carAccess'
                    handleChange={handleChange}
                    items={carAccessTypesSelectItems}
                  />
                }
              />

              <Section
                question='Is there a fire pit?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasFirePit}
                    radioButtonName='hasFirePit'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is the camp site waterfront?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.isWaterfront}
                    radioButtonName='isWaterfront'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is there phone signal?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasSignal}
                    radioButtonName='hasSignal'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is there a electricity hookup?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasElectricity}
                    radioButtonName='hasElectricity'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is there a water hookup?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasWaterHookup}
                    radioButtonName='hasWaterHookup'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />
            </S.SectionContainer>
            <S.SectionContainer>
              <Section
                sectionTitle='Campsite Reservation'
                question='What is the booking method?'
                inputComponent={
                  <Select
                    stateValue={siteInfo.reservation}
                    selectName='reservation'
                    handleChange={handleChange}
                    items={reservationTypesSelectItems}
                  />
                }
              />

              {siteInfo.reservation === ReservationType.RESERVATION && (
                <Section
                  question='How much is reservation fee?'
                  inputComponent={
                    <Input
                      label='Reservation fee per booking'
                      isValid={true}
                      textInputConfig={{
                        value: siteInfo.reservationFee,
                        onChangeText: (text) => {
                          handleChange({ name: 'reservationFee', value: text });
                        },
                        placeholder: '10',
                        keyboardType: 'numeric',
                      }}
                    />
                  }
                />
              )}

              <Section
                question='How much is campsite fee?'
                inputComponent={
                  <Input
                    label='Campsite fee per night'
                    isValid={true}
                    textInputConfig={{
                      value: siteInfo.siteFee,
                      onChangeText: (text) => {
                        handleChange({ name: 'siteFee', value: text });
                      },
                      placeholder: '30',
                      keyboardType: 'numeric',
                    }}
                  />
                }
              />
            </S.SectionContainer>

            <S.SectionContainer>
              <Section
                sectionTitle='Campground Facilities'
                question='Can I purchase fire wood?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.canPurchaseFirewood}
                    radioButtonName='canPurchaseFirewood'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              {siteInfo?.canPurchaseFirewood === 'true' && (
                <Section
                  question='Is fire wood provided unlimitedly?'
                  inputComponent={
                    <RadioButton
                      stateValue={siteInfo.isFirewoodUnlimited}
                      radioButtonName='isFirewoodUnlimited'
                      handleChange={handleChange}
                      items={booleanRadioButtonItems}
                    />
                  }
                />
              )}

              {siteInfo?.isFirewoodUnlimited === 'false' && (
                <Section
                  question='How much is fire wood?'
                  inputComponent={
                    <Input
                      label='Price of fire wood per bag'
                      isValid={true}
                      textInputConfig={{
                        value: siteInfo.firewoodPrice,
                        onChangeText: (text) => {
                          handleChange({ name: 'firewoodPrice', value: text });
                        },
                        placeholder: '12',
                        keyboardType: 'numeric',
                      }}
                    />
                  }
                />
              )}

              <Section
                question='Are there water pumps?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasWater}
                    radioButtonName='hasWater'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Are there drinkable water pumps?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasDrinkableWater}
                    radioButtonName='hasDrinkableWater'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is there dish sink?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasSink}
                    radioButtonName='hasSink'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='What is toilet type?'
                inputComponent={
                  <Select
                    stateValue={siteInfo.toilet}
                    selectName='toilet'
                    handleChange={handleChange}
                    items={toiletTypesSelectItems}
                  />
                }
              />

              <Section
                question='Is there shower facility?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasShower}
                    radioButtonName='hasShower'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              {siteInfo.hasShower === 'true' && (
                <Section
                  question='How much is shower token?'
                  inputComponent={
                    <Input
                      label='Price of shower token'
                      isValid={true}
                      textInputConfig={{
                        value: siteInfo.showerCost,
                        onChangeText: (text) => {
                          handleChange({ name: 'showerCost', value: text });
                        },
                        placeholder: '1',
                        keyboardType: 'numeric',
                      }}
                    />
                  }
                />
              )}

              <Section
                question='Is there shelter?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasShelter}
                    radioButtonName='hasShelter'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is there store?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasStores}
                    radioButtonName='hasStores'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              <Section
                question='Is there sewer service?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.hasSewerService}
                    radioButtonName='hasSewerService'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              {siteInfo.hasSewerService === 'true' && (
                <Section
                  question='How much is sewer service fee?'
                  inputComponent={
                    <Input
                      label='Price of sewer service'
                      isValid={true}
                      textInputConfig={{
                        value: siteInfo.sewerServiceFee,
                        onChangeText: (text) => {
                          handleChange({
                            name: 'sewerServiceFee',
                            value: text,
                          });
                        },
                        placeholder: '5',
                        keyboardType: 'numeric',
                      }}
                    />
                  }
                />
              )}
            </S.SectionContainer>

            <S.SectionContainer>
              <Section
                sectionTitle='Park Pass'
                question='Does campground need a park pass?'
                inputComponent={
                  <RadioButton
                    stateValue={siteInfo.needParkPass}
                    radioButtonName='needParkPass'
                    handleChange={handleChange}
                    items={booleanRadioButtonItems}
                  />
                }
              />

              {siteInfo.needParkPass === 'true' && (
                <Section
                  question='What is the name of park pass?'
                  inputComponent={
                    <Input
                      label='Park Pass Name'
                      isValid={true}
                      textInputConfig={{
                        value: siteInfo?.parkPassName ?? '',
                        onChangeText: (text) => {
                          handleChange({ name: 'parkPassName', value: text });
                        },
                        placeholder: 'Discovery Pass',
                        keyboardType: 'default',
                      }}
                      style={{ marginBottom: 20 }}
                    />
                  }
                />
              )}
            </S.SectionContainer>

            <S.SectionContainer>
              <Section
                sectionTitle='Notes'
                question='Any additional notes?'
                inputComponent={
                  <Input
                    label=''
                    isValid={true}
                    textInputConfig={{
                      value: siteInfo?.note ?? '',
                      onChangeText: (text) => {
                        handleChange({ name: 'note', value: text });
                      },
                      placeholder: 'Enter notes here...',
                      keyboardType: 'default',
                      multiline: true,
                      numberOfLines: 6,
                    }}
                    style={{ marginTop: -10 }}
                  />
                }
              />
            </S.SectionContainer>
          </ScrollView>
          <Button
            text='Save Information'
            textSize={18}
            borderRadius={5}
            onPress={handleSubmit}
            paddingVertical={10}
            marginVertical={10}
            bgColor={ColorMap['green'].dark}
          />
        </PaperProvider>
      ) : (
        <SiteDetailsSkeleton />
      )}
    </>
  );
};

export default SiteInfoDetailEdit;
