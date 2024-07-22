import { EditCategory } from './Categories';
import Modal from '../../atomic/modal/Modal';
import { useUpdateCategory } from '../../../api/category';
import EditCategoryModalContent from './EditCategoryModalContent';

interface EditCategoryModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isEditModalOpen: boolean) => void;
  eidtCategory: EditCategory;
  userId: string;
}

const EditCategoryModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  eidtCategory,
  userId,
}: EditCategoryModalProps) => {
  const { mutate: updateCategory } = useUpdateCategory(userId);

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

export default EditCategoryModal;
