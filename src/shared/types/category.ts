import { CATEGORY_GROUPS } from '../constant/category';

export type StoreType = keyof typeof CATEGORY_GROUPS;

export type Category = {
  [K in StoreType]: {
    type: K;
    category: (typeof CATEGORY_GROUPS)[K][number];
  };
}[StoreType];

export type CategoryName = (typeof CATEGORY_GROUPS)[StoreType][number];
