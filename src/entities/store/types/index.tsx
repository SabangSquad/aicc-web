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
  };
  facilities: {
    wifi: boolean;
    '남/녀 화장실 구분': boolean;
    휠체어: boolean;
    주차: boolean;
  };
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

export type StoreType =
  | (BaseStore & { category: '식당'; store_items: RestaurantItems })
  | (BaseStore & { category: '병원'; store_items: HospitalItems })
  | (BaseStore & { category: '이커머스' });
