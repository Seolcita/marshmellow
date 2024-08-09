import { View } from '../../Themed';
import * as S from './Categories.styles';
import ColorMap from '../../../styles/Color';
import { DeleteCategory } from './Categories';
import Button from '../../atomic/button/Button';
import { TwoButtonContainer } from '../../common-styles/CommonStyles';

interface DeleteCategoryModalContentProps {
  setIsDeleteModalOpen: (isModalOpen: boolean) => void;
  removeCategory: (id: string) => void;
  deleteCategory: DeleteCategory;
}

const DeleteCategoryModalContent = ({
  setIsDeleteModalOpen,
  removeCategory,
  deleteCategory,
}: DeleteCategoryModalContentProps) => {
  const handleDelete = () => {
    removeCategory(deleteCategory.categoryId);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <S.ModalTitle>Delete Category</S.ModalTitle>
      <S.ConfirmMessage>{`Are you sure that you want to delete '${deleteCategory.name}' category?`}</S.ConfirmMessage>
      <TwoButtonContainer>
        <View style={{ width: '49%' }}>
          <Button
            onPress={() => setIsDeleteModalOpen(false)}
            text='Cancel'
            borderRadius={5}
            bgColor={ColorMap['grey'].main}
          />
        </View>
        <View style={{ width: '49%' }}>
          <Button
            onPress={handleDelete}
            text='Delete'
            borderRadius={5}
            bgColor={ColorMap['red'].dark}
          />
        </View>
      </TwoButtonContainer>
    </>
  );
};

export default DeleteCategoryModalContent;
