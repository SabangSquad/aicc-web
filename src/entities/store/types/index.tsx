import { EmotionType } from '@/shared/types/emotion';

export type StoreType =
  | (BaseStore & { category: '식당'; store_items: RestaurantItems })
  | (BaseStore & { category: '병원'; store_items: HospitalItems })
  | (BaseStore & { category: '이커머스' });

interface BaseStore {
  readonly store_id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  business_hours: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  } | null;
  facilities: {
    wifi: boolean;
    '남/녀 화장실 구분': boolean;
    휠체어: boolean;
    주차: boolean;
  } | null;
  notice: string | null;
}

interface RestaurantItems {
  menu: {
    name: string;
    price: number;
    description: string;
  }[];
}

interface HospitalItems {
  department: string[];
}

export interface AISolutionType {
  readonly store_id: number;
  readonly hours: number;
  readonly total_cases: number;
  stats: {
    by_category: {
      category: string;
      count: number;
    }[];
    by_emotion: {
      emotion: EmotionType;
      count: number;
    }[];
  };
  ai_analysis: {
    headline: string;
    issues: {
      title: string;
      detail: string;
    }[];
    strategies: {
      urgency: 'high' | 'medium' | 'low' | string;
      title: string;
      detail: string;
    }[];
  };
}
