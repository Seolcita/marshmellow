import { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import {
  booleanRadioButtonItems,
  campingTypesSelectItems,
  carAccessTypesSelectItems,
  privacySelectItems,
  reservationTypesSelectItems,
  siteSizeSelectItems,
  toiletTypesSelectItems,
} from './inputOptions';
import Section from './Section';
import Input from '../../atomic/input/Input';
import Select from '../../atomic/select/Select';
import * as S from './SiteInfoDetailEdit.styles';
import RadioButton from '../../atomic/radio-button/RadioButton';
import { ReservationType } from '../../../types';

interface SiteInfoDetailProps {
  id: string;
}

interface SiteInfoDetailState {
  [key: string]: {
    value: string;
    error: string;
  };
}

const initialState = {
  campingType: { value: '', error: '' },
  canPurchaseFirewood: { value: '', error: '' },
  carAccess: { value: '', error: '' },
  firewoodPrice: { value: '', error: '' },
  hasDrinkableWater: { value: '', error: '' },
  hasElectricity: { value: '', error: '' },
  hasFirePit: { value: '', error: '' },
  hasSewerService: { value: '', error: '' },
  hasShower: { value: '', error: '' },
  hasSignal: { value: '', error: '' },
  hasSink: { value: '', error: '' },
  hasStores: { value: '', error: '' },
  hasShelter: { value: '', error: '' },
  hasWater: { value: '', error: '' },
  hasWaterHookup: { value: '', error: '' },
  isFirewoodUnlimited: { value: '', error: '' },
  isWaterfront: { value: '', error: '' },
  needParkPass: { value: '', error: '' },
  needReservation: { value: '', error: '' },
  note: { value: '', error: '' },
  parkPassName: { value: '', error: '' },
  privacy: { value: '', error: '' },
  rating: { value: '', error: '' },
  reservation: { value: '', error: '' },
  reservationFee: { value: '', error: '' },
  sewerServiceFee: { value: '', error: '' },
  showerCost: { value: '', error: '' },
  siteFee: { value: '', error: '' },
  siteSize: { value: '', error: '' },
  toilet: { value: '', error: '' },
};

const SiteInfoDetailEdit = ({ id }: SiteInfoDetailProps) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoDetailState>(initialState);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setSiteInfo((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: value,
      },
    }));
  };

  // console.log('siteInfo🐶', siteInfo.campingType.value);
  // console.log('siteInfo🐶', siteInfo.needParkPass.value);
  // console.log('siteInfo🐶', siteInfo.parkPassName.value);

  const handleSubmit = () => {
    // TODO: Implement submit
  };

  return (
    <PaperProvider>
      <S.SectionContainer>
        <Section
          sectionTitle='Camping Site Type'
          question='What is the camping site type?'
          inputComponent={
            <Select
              stateValue={siteInfo.campingType.value}
              selectName='campingType'
              handleChange={handleChange}
              items={campingTypesSelectItems}
            />
          }
        />

        <Section
          question='What is the booking method?'
          inputComponent={
            <Select
              stateValue={siteInfo.reservation.value}
              selectName='reservation'
              handleChange={handleChange}
              items={reservationTypesSelectItems}
            />
          }
        />

        <Section
          question='What is the car access type?'
          inputComponent={
            <Select
              stateValue={siteInfo.carAccess.value}
              selectName='carAccess'
              handleChange={handleChange}
              items={carAccessTypesSelectItems}
            />
          }
        />

        <Section
          question='What is the camping site size?'
          inputComponent={
            <Select
              stateValue={siteInfo.siteSize.value}
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
              stateValue={siteInfo.privacy.value}
              selectName='privacy'
              handleChange={handleChange}
              items={privacySelectItems}
            />
          }
        />

        <Section
          question='Is there a fire pit?'
          inputComponent={
            <RadioButton
              stateValue={siteInfo.hasFirePit.value}
              radioButtonName='hasFirePit'
              handleChange={handleChange}
              items={booleanRadioButtonItems}
            />
          }
        />

        <Section
          question='Is there phone signal?'
          inputComponent={
            <RadioButton
              stateValue={siteInfo.hasSignal.value}
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
              stateValue={siteInfo.hasElectricity.value}
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
              stateValue={siteInfo.hasWaterHookup.value}
              radioButtonName='hasWaterHookup'
              handleChange={handleChange}
              items={booleanRadioButtonItems}
            />
          }
        />

        <Section
          question='How much is camping site fee?'
          inputComponent={
            <Input
              label='Camping site fee per night'
              isValid={true}
              textInputConfig={{
                value: siteInfo.siteFee.value.trim() ?? '',
                onChangeText: (text) => {
                  handleChange({ name: 'siteFee', value: text });
                },
                placeholder: '30',
                keyboardType: 'numeric',
              }}
              error={siteInfo?.siteFee?.error}
            />
          }
        />

        {siteInfo.reservation.value === ReservationType.RESERVATION && (
          <Section
            question='How much is reservation fee?'
            inputComponent={
              <Input
                label='Reservation fee per booking'
                isValid={true}
                textInputConfig={{
                  value: siteInfo.reservationFee.value.trim() ?? '',
                  onChangeText: (text) => {
                    handleChange({ name: 'reservation', value: text });
                  },
                  placeholder: '10',
                  keyboardType: 'numeric',
                }}
                error={siteInfo?.reservation?.error}
              />
            }
          />
        )}
      </S.SectionContainer>

      <S.SectionContainer>
        <Section
          sectionTitle='Facilities'
          question='Can I purchase fire wood?'
          inputComponent={
            <RadioButton
              stateValue={siteInfo.canPurchaseFirewood.value}
              radioButtonName='canPurchaseFirewood'
              handleChange={handleChange}
              items={booleanRadioButtonItems}
            />
          }
        />

        {siteInfo?.canPurchaseFirewood?.value === 'true' && (
          <Section
            question='Is fire wood provided unlimitedly?'
            inputComponent={
              <RadioButton
                stateValue={siteInfo.isFirewoodUnlimited.value}
                radioButtonName='isFirewoodUnlimited'
                handleChange={handleChange}
                items={booleanRadioButtonItems}
              />
            }
          />
        )}

        {siteInfo?.isFirewoodUnlimited?.value === 'false' && (
          <Section
            question='How much is fire wood?'
            inputComponent={
              <Input
                label='Price of fire wood per bag'
                isValid={true}
                textInputConfig={{
                  value: siteInfo.firewoodPrice.value.trim() ?? '',
                  onChangeText: (text) => {
                    handleChange({ name: 'firewoodPrice', value: text });
                  },
                  placeholder: '12',
                  keyboardType: 'numeric',
                }}
                error={siteInfo?.firewoodPrice?.error}
              />
            }
          />
        )}

        <Section
          question='Are there water pumps?'
          inputComponent={
            <RadioButton
              stateValue={siteInfo.hasWater.value}
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
              stateValue={siteInfo.hasWater.value}
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
              stateValue={siteInfo.hasSink.value}
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
              stateValue={siteInfo.toilet.value}
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
              stateValue={siteInfo.hasShower.value}
              radioButtonName='hasShower'
              handleChange={handleChange}
              items={booleanRadioButtonItems}
            />
          }
        />

        {siteInfo.hasShower.value === 'true' && (
          <Section
            question='How much is shower token?'
            inputComponent={
              <Input
                label='Price of shower token'
                isValid={true}
                textInputConfig={{
                  value: siteInfo.showerCost.value.trim() ?? '',
                  onChangeText: (text) => {
                    handleChange({ name: 'showerCost', value: text });
                  },
                  placeholder: '1',
                  keyboardType: 'numeric',
                }}
                error={siteInfo?.showerCost?.error}
              />
            }
          />
        )}

        <Section
          question='Is there shelter?'
          inputComponent={
            <RadioButton
              stateValue={siteInfo.hasShelter.value}
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
              stateValue={siteInfo.hasStores.value}
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
              stateValue={siteInfo.hasSewerService.value}
              radioButtonName='hasSewerService'
              handleChange={handleChange}
              items={booleanRadioButtonItems}
            />
          }
        />

        {siteInfo.hasSewerService.value === 'true' && (
          <Section
            question='How much is sewer service fee?'
            inputComponent={
              <Input
                label='Price of sewer service'
                isValid={true}
                textInputConfig={{
                  value: siteInfo.sewerServiceFee.value.trim() ?? '',
                  onChangeText: (text) => {
                    handleChange({ name: 'sewerServiceFee', value: text });
                  },
                  placeholder: '5',
                  keyboardType: 'numeric',
                }}
                error={siteInfo?.sewerServiceFee?.error}
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
              stateValue={siteInfo.needParkPass.value}
              radioButtonName='needParkPass'
              handleChange={handleChange}
              items={booleanRadioButtonItems}
            />
          }
        />

        {siteInfo.needParkPass.value === 'true' && (
          <Section
            question='What is the name of park pass?'
            inputComponent={
              <Input
                label='Park Pass Name'
                isValid={true}
                textInputConfig={{
                  value: siteInfo?.parkPassName?.value.trim() ?? '',
                  onChangeText: (text) => {
                    handleChange({ name: 'parkPassName', value: text });
                  },
                  placeholder: 'Discovery Pass',
                  keyboardType: 'default',
                  autoFocus: true,
                }}
                error={siteInfo?.parkPassName?.error}
                style={{ marginBottom: 20 }}
              />
            }
          />
        )}
      </S.SectionContainer>
    </PaperProvider>
  );
};

export default SiteInfoDetailEdit;
