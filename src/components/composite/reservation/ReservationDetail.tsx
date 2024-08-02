import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Pressable } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from './ReservationDetail.styles';
import { useDeleteSiteInfo } from '../../../api/site-info';

interface ReservationDetail {
  id: string;
  userId: string;
  arrivalDate: string;
  departureDate: string;
  campgroundName: string;
  campgroundSiteNumber: string;
}

interface ReservationDetailProps {
  item: ReservationDetail;
  handleEdit: (initialValue: any) => void;
}

const ResevationDetail = ({
  item: {
    id,
    userId,
    arrivalDate,
    departureDate,
    campgroundName,
    campgroundSiteNumber,
  },
  handleEdit,
}: ReservationDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: deleteReservation } = useDeleteSiteInfo(userId);

  const handleDelete = (id: string) => {
    deleteReservation(id);
  };

  const formatCampingDate = () => {
    const arrival = new Date(arrivalDate + 'T00:00:00');
    const departure = new Date(departureDate + 'T00:00:00');
    const dateOfArrival = format(arrival, 'MMMM d');
    const dateOfArrivalWithYeaer = format(arrival, 'MMMM d, yyyy');
    const dateOfDeparture = format(departure, 'MMMM d, yyyy');
    const arrivalYeaer = arrival.getFullYear();
    const departureYear = departure.getFullYear();
    const isSameYear = arrivalYeaer === departureYear;

    return `${
      isSameYear ? dateOfArrival : dateOfArrivalWithYeaer
    }  -  ${dateOfDeparture}`;
  };

  const slideAnim = useSharedValue(240);

  useEffect(() => {
    slideAnim.value = withTiming(isMenuOpen ? 0 : 240, { duration: 300 });
  }, [isMenuOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value }],
    };
  });

  return (
    <>
      <S.TripTile>
        <S.Contents>
          <S.Header>
            <S.CampgroundName>{campgroundName}</S.CampgroundName>
          </S.Header>
          <S.Wrapper>
            <Fontisto name='tent' size={14} color={ColorMap['grey'].main} />
            <S.Text>
              Site {campgroundSiteNumber ? campgroundSiteNumber : 'N/A'}
            </S.Text>
          </S.Wrapper>
          <S.Wrapper>
            <FontAwesome5
              name='calendar-alt'
              size={16}
              color={ColorMap['grey'].main}
            />
            <S.Text>{formatCampingDate()}</S.Text>
          </S.Wrapper>
        </S.Contents>
        <S.IconsContainer>
          <Animated.View
            style={[{ height: '100%', flexDirection: 'row' }, animatedStyle]}
          >
            <S.ButtonContainer>
              <S.Button>
                <AntDesign
                  name='edit'
                  size={20}
                  color='white'
                  onPress={() =>
                    handleEdit({
                      id,
                      arrivalDate,
                      departureDate,
                      campgroundName,
                      campgroundSiteNumber,
                    })
                  }
                />
              </S.Button>
              <S.Button bgColor='red'>
                <MaterialIcons
                  name='delete-outline'
                  size={20}
                  color='white'
                  onPress={() => setIsModalOpen((prev) => !prev)}
                />
              </S.Button>
            </S.ButtonContainer>
          </Animated.View>
          <S.MenuContainer>
            <Pressable onPress={() => setIsMenuOpen((prev) => !prev)}>
              <SimpleLineIcons
                name='options-vertical'
                size={20}
                color='black'
              />
            </Pressable>
          </S.MenuContainer>
        </S.IconsContainer>
      </S.TripTile>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <S.ModalTitle>
          Are you sure that you want to delete this Trip?
        </S.ModalTitle>
        <S.MessageContainer>
          <S.ConfirmMessage>{`This campsite information will be deleted as well.`}</S.ConfirmMessage>
        </S.MessageContainer>
        <S.ModalButtonContainer>
          <View style={{ width: '48%' }}>
            <Button
              onPress={() => setIsModalOpen((prev) => !prev)}
              text='Cancel'
              borderRadius={5}
              bgColor={ColorMap['grey'].main}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Button
              onPress={() => handleDelete(id)}
              text='Delete'
              borderRadius={5}
              bgColor={ColorMap['red'].dark}
            />
          </View>
        </S.ModalButtonContainer>
      </Modal>
    </>
  );
};

export default ResevationDetail;
