import Modal from '../../atomic/modal/Modal';
import { useInsertCategory } from '../../../api/category';
import CreateCategoryModalContent from '../category/CreateCategoryModalContent';

interface CreateCategoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  userId: string;
}

const CreateSharedCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  userId,
}: CreateCategoryModalProps) => {
  //TODO: Update this to useInsertSharedCategory
  const { mutate: insertCategory } = useInsertCategory(userId);

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <CreateCategoryModalContent
        setIsModalOpen={setIsModalOpen}
        insertCategory={insertCategory}
      />
    </Modal>
  );
};

export default CreateSharedCategoryModal;
