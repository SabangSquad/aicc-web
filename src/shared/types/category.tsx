import { category } from '../constant/category';

export type Category = (typeof category)[number];

export type CategoryWithAll = Category | '전체';
