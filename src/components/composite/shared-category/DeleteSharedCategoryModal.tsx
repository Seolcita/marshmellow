import Modal from '../../atomic/modal/Modal';
import { DeleteSharedCategory } from './SharedCategories';
import DeleteCategoryModalContent from '../category/DeleteCategoryModalContent';
import { useDeleteSharedCategory } from '../../../api/shared-category';

interface DeleteCategoryModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isEditModalOpen: boolean) => void;
  deleteCategory: DeleteSharedCategory;
  sharedCheckListId: number;
}

const DeleteSharedCategoryModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  sharedCheckListId,
  deleteCategory,
}: DeleteCategoryModalProps) => {
  const { mutate: removeCategory } = useDeleteSharedCategory(sharedCheckListId);

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

export default DeleteSharedCategoryModal;
