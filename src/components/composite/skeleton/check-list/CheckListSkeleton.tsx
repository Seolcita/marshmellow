import CategorySkeleton from '../../../atomic/skeleton/check-list/CategorySkeleton';
import CheckListItemSkeleton from '../../../atomic/skeleton/check-list/CheckListItemSkeleton';

const CheckListSkeleton = () => {
  return (
    <>
      <CategorySkeleton />
      <CheckListItemSkeleton />
      <CheckListItemSkeleton />
      <CategorySkeleton />
      <CheckListItemSkeleton />
      <CheckListItemSkeleton />
      <CheckListItemSkeleton />
    </>
  );
};

export default CheckListSkeleton;
