// 백엔드 엔티티 기반 타입 정의 (JSDoc 스타일)
// 백엔드: src/modules/place/entities/

/**
 * Place (가게) - 백엔드 place.entity.ts 기반
 * @typedef {Object} Place
 * @property {number} id
 * @property {string} name - 가게명
 * @property {string} address - 주소
 * @property {string} detailAddress - 상세주소
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} status - PLACE_STATUS
 * @property {string} currentStatus - PLACE_CURRENT_STATUS
 * @property {LuckyBag} luckyBag
 * @property {PlaceImage[]} placeImages
 * @property {PlacePickupDay[]} placePickupDays
 * @property {PlaceRole[]} placeRoles
 */

/**
 * LuckyBag (럭키백) - 백엔드 lucky-bag.entity.ts 기반
 * @typedef {Object} LuckyBag
 * @property {number} id
 * @property {string|null} name
 * @property {string|null} description - 럭키백 설명
 * @property {number} price - 정가
 * @property {number} discountPrice - 할인가
 * @property {number} dailySalesCount - 일일 판매 개수
 * @property {boolean} isLimitOne - 최대 주문 1개 제한 여부
 * @property {number} placeId
 * @property {LuckyBagFood[]} luckyBagFoods - 메뉴 목록
 * @property {LuckyBagCategory} luckyBagCategory
 */

/**
 * LuckyBagFood (럭키백 메뉴)
 * @typedef {Object} LuckyBagFood
 * @property {number} id
 * @property {string} name - 메뉴명
 * @property {number} luckyBagId
 */

/**
 * PlaceImage (가게 이미지)
 * @typedef {Object} PlaceImage
 * @property {number} id
 * @property {string} url
 * @property {number} order
 * @property {number} placeId
 */

/**
 * PlacePickupDay (픽업 요일 설정)
 * @typedef {Object} PlacePickupDay
 * @property {number} id
 * @property {number} day - 0: 일요일 ~ 6: 토요일
 * @property {string} startTime - HH:mm
 * @property {string} endTime - HH:mm
 * @property {boolean} isActive
 * @property {number} placeId
 */

/**
 * PlaceSpecialPickupDate (특별 휴무일)
 * @typedef {Object} PlaceSpecialPickupDate
 * @property {number} id
 * @property {string} date - YYYY-MM-DD
 * @property {boolean} isClosed
 * @property {number} placeId
 */

export {};
