import { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import {
  campingTypesSelectItems,
  needParkPassRadioButtonItems,
} from './inputOptions';
import Section from './Section';
import Input from '../../atomic/input/Input';
import Select from '../../atomic/select/Select';
import * as S from './SiteInfoDetailEdit.styles';
import RadioButton from '../../atomic/radio-button/RadioButton';

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
  campingType: { value: '', error: '' }, //
  canPurchaseFirewood: { value: '', error: '' },
  carAccess: { value: '', error: '' },
  firewoodPrice: { value: '', error: '' },
  hasDrinkableWater: { value: '', error: '' },
  hasElectric: { value: '', error: '' },
  hasFirePit: { value: '', error: '' },
  hasSewerService: { value: '', error: '' },
  hasShower: { value: '', error: '' },
  hasSignal: { value: '', error: '' },
  hasSink: { value: '', error: '' },
  hasStores: { value: '', error: '' },
  hasShelter: { value: '', error: '' },
  isFirewoodUnlimited: { value: '', error: '' },
  isWaterfront: { value: '', error: '' },
  needParkPass: { value: '', error: '' }, //
  needReservation: { value: '', error: '' },
  note: { value: '', error: '' },
  parkPassName: { value: '', error: '' }, //
  privacy: { value: '', error: '' },
  rating: { value: '', error: '' },
  reservationFee: { value: '', error: '' },
  showerCost: { value: '', error: '' },
  siteFee: { value: '', error: '' },
  siteSize: { value: '', error: '' },
  toilet: { value: '', error: '' },
  userId: { value: '', error: '' },
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
          question='What is type of camping site?'
          inputComponent={
            <Select
              stateValue={siteInfo.campingType.value}
              handleChange={handleChange}
              items={campingTypesSelectItems}
            />
          }
        />
      </S.SectionContainer>

      <S.SectionContainer>
        <Section
          sectionTitle='Park Pass'
          question='Does campground need a park pass?'
          inputComponent={
            <RadioButton
              stateValue={siteInfo.needParkPass.value}
              handleChange={handleChange}
              items={needParkPassRadioButtonItems}
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
