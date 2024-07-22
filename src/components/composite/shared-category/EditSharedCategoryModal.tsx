import Modal from '../../atomic/modal/Modal';
import { EditSharedCategory } from './SharedCategories';
import { useUpdateSharedCategory } from '../../../api/shared-category';
import EditCategoryModalContent from '../category/EditCategoryModalContent';

interface EditSharedCategoryModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isEditModalOpen: boolean) => void;
  eidtCategory: EditSharedCategory;
  sharedCheckListId: number;
}

const EditSharedCategoryModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  eidtCategory,
  sharedCheckListId,
}: EditSharedCategoryModalProps) => {
  const { mutate: updateCategory } = useUpdateSharedCategory(sharedCheckListId);

  return (
    <Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen}>
      <EditCategoryModalContent
        setIsEditModalOpen={setIsEditModalOpen}
        editCategory={eidtCategory}
        updateCategory={updateCategory}
      />
    </Modal>
  );
};

export default EditSharedCategoryModal;
