// 백엔드 엔티티 기반 타입 정의 (JSDoc 스타일)
// 백엔드: src/modules/order/entities/

/**
 * Order (주문) - 백엔드 order.entity.ts 기반
 * @typedef {Object} Order
 * @property {number} id
 * @property {string} orderUid - 주문 고유 ID
 * @property {string} name - 주문명
 * @property {string} pickupDate - YYYY-MM-DD
 * @property {string} pickupStartTime - HH:mm
 * @property {string} pickupEndTime - HH:mm
 * @property {number} price - 정가
 * @property {number} discountPrice - 할인가
 * @property {number} couponPrice - 쿠폰 할인액
 * @property {string} status - ORDER_STATUS
 * @property {number} luckyBagCount - 럭키백 수량
 * @property {string} code - 픽업 코드
 * @property {boolean} isPickupChecked - 픽업 확인 여부
 * @property {number} luckyBagId
 * @property {number} placeId
 * @property {number} userAccountId
 * @property {string} currentStatus - ORDER_CURRENT_STATUS
 * @property {Date} paidAt - 결제 일시
 */

/**
 * OrderCancel (주문 취소)
 * @typedef {Object} OrderCancel
 * @property {number} id
 * @property {string} reason - 취소 사유
 * @property {number} orderId
 */

export {};
