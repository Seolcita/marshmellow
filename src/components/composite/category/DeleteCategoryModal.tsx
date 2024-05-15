import { Text } from '../../Themed';
import * as S from './AddCategory.styles';
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
      <S.InputContainer>
        <Text>{`Are you sure you want to delete ${name}?`}</Text>
        <Button onPress={handleDelete} text='Save' borderRadius={10} />
      </S.InputContainer>
    </Modal>
  );
};

export default DeleteCategoryModal;
