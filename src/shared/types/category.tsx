import { CATEGORY } from '../constant/category';

export type Category = (typeof CATEGORY)[number];

export type CategoryWithAll = Category | '전체';
