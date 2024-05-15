import { View } from '../../Themed';
import * as S from './Categories.styles';
import Modal from '../../atomic/modal/Modal';
import { DeleteCategory } from './Categories';
import Button from '../../atomic/button/Button';
import { useDeleteCategory } from '../../../api/category';

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
      <View>
        <S.ConfirmMessage>{`Are you sure you want to delete '${name}' category?`}</S.ConfirmMessage>
        <Button onPress={handleDelete} text='Delete' borderRadius={10} />
      </View>
    </Modal>
  );
};

export default DeleteCategoryModal;
