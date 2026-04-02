interface HosptialCategory {
  type: '병원';
  category: '예약' | '예약 확인' | '예약 변경' | '예약 취소' | '진료과목';
}

interface RestaurantCategory {
  type: '식당';
  category: '예약' | '예약 확인' | '예약 변경' | '예약 취소' | '메뉴' | '가격';
}

interface EcommerceCategory {
  type: '이커머스';
  category: '배송 조회' | '주문 확인' | '교환' | '환불' | '취소' | '상품 정보';
}

export type Category = HosptialCategory | RestaurantCategory | EcommerceCategory;
