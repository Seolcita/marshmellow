import * as S from './UploadImage.styles';

interface UploadImageProps {
  imageUri?: string;
  pickImage: () => void;
}

const UploadImage = ({ imageUri, pickImage }: UploadImageProps) => {
  return (
    <S.Container>
      <S.Image
        source={
          imageUri
            ? { uri: imageUri }
            : require('../../../../assets/images/defaultUploadImage.jpg')
        }
        onError={(error) => console.log(error)}
      />
      <S.Title onPress={pickImage}>Select Image</S.Title>
    </S.Container>
  );
};

export default UploadImage;
