import Modal from '../../atomic/modal/Modal';
import { DeleteCategory } from './Categories';
import { useDeleteCategory } from '../../../api/category';
import DeleteCategoryModalContent from './DeleteCategoryModalContent';

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
  deleteCategory,
}: DeleteCategoryModalProps) => {
  const { mutate: removeCategory } = useDeleteCategory(userId);

  return (
    <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
      <DeleteCategoryModalContent
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        removeCategory={removeCategory}
        deleteCategory={deleteCategory}
      />
    </Modal>
  );
};

export default DeleteCategoryModal;
