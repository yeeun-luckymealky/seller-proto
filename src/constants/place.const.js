// 백엔드: src/modules/place/place.const.ts 와 동일
export const PLACE_STATUS = {
  REVIEWED: 'REVIEWED',
  REVIEWING: 'REVIEWING',
  DRAFT: 'DRAFT',
  TEMPORARY_CLOSED: 'TEMPORARY_CLOSED',
  WITHDRAWN: 'WITHDRAWN',
};

export const PLACE_CURRENT_STATUS = {
  TODAY_OPEN: 'TODAY_OPEN',
  TOMORROW_OPEN: 'TOMORROW_OPEN',
  CLOSED: 'CLOSED',
  SOLD_OUT: 'SOLD_OUT',
};

export const PLACE_REVIEW_STATUS = {
  REVIEWED: 'REVIEWED',
  REVIEWING: 'REVIEWING',
  REJECTED: 'REJECTED',
  UNAPPROVED_DONE: 'UNAPPROVED_DONE',
};

// 럭키밀 수수료 9.8%
export const LUCKY_MEAL_FEE_RATE = 0.098;

// 결제 수수료 3%
export const PAYMENT_FEE_RATE = 0.03;

// 부가세 10%
export const TAX_RATE = 0.1;

// CO2 절감량 (럭키백 1개당)
export const CO2_PER_BAG = 2.5;

// 할인율 50%
export const DISCOUNT_RATE = 0.5;
