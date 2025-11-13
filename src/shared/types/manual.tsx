import { Category } from './category';

export type Manual = {
  manual_id: number;
  title: string;
  edited_at: string;
  file_url: string | null;
  category: Category;
  content: string;
};
