import Modal from '../../atomic/modal/Modal';
import CreateCategoryModalContent from '../category/CreateCategoryModalContent';
import { useInsertSharedCategory } from '../../../api/shared-category';

interface CreateCategoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  sharedCheckListId: number;
}

const CreateSharedCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  sharedCheckListId,
}: CreateCategoryModalProps) => {
  //TODO: Update this to useInsertSharedCategory
  const { mutate: insertSharedCategory } =
    useInsertSharedCategory(sharedCheckListId);

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <CreateCategoryModalContent
        setIsModalOpen={setIsModalOpen}
        insertCategory={insertSharedCategory}
      />
    </Modal>
  );
};

export default CreateSharedCategoryModal;
