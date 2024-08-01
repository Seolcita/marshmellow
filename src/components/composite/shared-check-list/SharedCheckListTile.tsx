import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from './SharedCheckListTile.styles';
import DeleteSharedCheckListModal from './DeleteSharedCheckListModal';

interface SharedCheckListTileProps {
  sharedCheckListId: number;
  sharedChckListName: string;
  userId: string;
}

const SharedCheckListTile = ({
  sharedCheckListId,
  sharedChckListName,
  userId,
}: SharedCheckListTileProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slideAnim = useSharedValue(240);

  useEffect(() => {
    slideAnim.value = withTiming(isMenuOpen ? 0 : 240, { duration: 300 });
  }, [isMenuOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value }],
    };
  });

  return (
    <>
      <S.MySharedCheckListTile>
        <S.Contents
          onPress={() =>
            router.push(`/(user)/check-list/shared/${sharedCheckListId}`)
          }
        >
          <S.Text>{sharedChckListName}</S.Text>
        </S.Contents>
        <S.IconsContainer>
          <Animated.View
            style={[{ height: '100%', flexDirection: 'row' }, animatedStyle]}
          >
            <S.ButtonContainer>
              <S.Button>
                <AntDesign
                  name='edit'
                  size={20}
                  color='white'
                  onPress={() =>
                    router.push(
                      `/(user)/check-list/shared/${sharedCheckListId}`
                    )
                  }
                />
              </S.Button>
              <S.Button bgColor='red'>
                <MaterialCommunityIcons
                  name='delete-forever-outline'
                  size={24}
                  color='white'
                  onPress={() => setIsModalOpen(true)}
                />
              </S.Button>
            </S.ButtonContainer>
          </Animated.View>
          <S.MenuContainer>
            <Pressable onPress={() => setIsMenuOpen((prev) => !prev)}>
              <SimpleLineIcons
                name='options-vertical'
                size={20}
                color='black'
              />
            </Pressable>
          </S.MenuContainer>
        </S.IconsContainer>
      </S.MySharedCheckListTile>
      {isModalOpen && (
        <DeleteSharedCheckListModal
          userId={userId}
          sharedCheckListId={sharedCheckListId}
          sharedCheckListName={sharedChckListName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default SharedCheckListTile;
