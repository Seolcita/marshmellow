import Modal from '../../atomic/modal/Modal';
import { useInsertCategory } from '../../../api/category';
import CreateCategoryModalContent from './CreateCategoryModalContent';

interface CreateCategoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  userId: string;
}

const CreateCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  userId,
}: CreateCategoryModalProps) => {
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

export default CreateCategoryModal;
