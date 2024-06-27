import { View } from '../../Themed';
import * as S from './Categories.styles';
import ColorMap from '../../../styles/Color';
import Modal from '../../atomic/modal/Modal';
import { DeleteCategory } from './Categories';
import Button from '../../atomic/button/Button';
import { useDeleteCategory } from '../../../api/category';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

interface DeleteCategoryModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isEditModalOpen: boolean) => void;
  userId: string;
  deleteCategory: DeleteCategory;
}

const DeleteCategoryModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  userId,
  deleteCategory: { categoryId, name },
}: DeleteCategoryModalProps) => {
  const { mutate: deleteCategory } = useDeleteCategory(userId);

  const handleDelete = () => {
    deleteCategory(categoryId);
    setIsDeleteModalOpen(false);
  };

  return (
    <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
      <S.ModalTitle>Delete Category</S.ModalTitle>
      <S.ConfirmMessage>{`Are you sure you want to delete '${name}' category?`}</S.ConfirmMessage>
      <TwoButtonContainer>
        <View style={{ width: '48%' }}>
          <Button
            onPress={() => setIsDeleteModalOpen(false)}
            text='Cancel'
            borderRadius={5}
            bgColor={ColorMap['grey'].main}
          />
        </View>
        <View style={{ width: '48%' }}>
          <Button
            onPress={handleDelete}
            text='Delete'
            borderRadius={5}
            bgColor={ColorMap['blue'].dark}
          />
        </View>
      </TwoButtonContainer>
    </Modal>
  );
};

export default DeleteCategoryModal;
