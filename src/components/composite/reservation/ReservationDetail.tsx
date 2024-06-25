import { useState } from 'react';
import { format } from 'date-fns';
import { Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { View } from '../../Themed';
import Modal from '../../atomic/modal/Modal';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from './ReservationDetail.styles';
import * as s from '../../common-styles/CommonStyles';
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
    }   ~   ${dateOfDeparture}`;
  };

  return (
    <>
      <s.Tile>
        <S.Header>
          <S.CampgroundName>{campgroundName}</S.CampgroundName>
          <S.ButtonContainer>
            <Pressable>
              <AntDesign
                name='edit'
                size={20}
                color='black'
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
            </Pressable>
            <Pressable>
              <MaterialIcons
                name='delete-outline'
                size={20}
                color='black'
                onPress={() => setIsModalOpen((prev) => !prev)}
              />
            </Pressable>
          </S.ButtonContainer>
        </S.Header>
        <View>
          <S.Text>
            Site: {campgroundSiteNumber ? campgroundSiteNumber : 'N/A'}
          </S.Text>
          <S.Text>{formatCampingDate()}</S.Text>
        </View>
      </s.Tile>
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
