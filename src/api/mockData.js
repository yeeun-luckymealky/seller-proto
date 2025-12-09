import { ORDER_STATUS } from '../constants/order.const';
import { PLACE_CURRENT_STATUS } from '../constants/place.const';
import { PLACE_ROLE_GRADE } from '../constants/user.const';

// Mock Place 데이터 (백엔드 place.entity.ts 구조 기반)
export const mockPlace = {
  id: 1,
  name: '행복한 베이커리', // 백엔드: place.name
  address: '서울시 강남구 역삼동 123-45',
  detailAddress: '1층',
  latitude: 37.5665,
  longitude: 126.978,
  status: 'REVIEWED',
  currentStatus: PLACE_CURRENT_STATUS.TODAY_OPEN,
  placeImages: [
    { id: 1, url: 'https://picsum.photos/400/300?random=1', order: 1, placeId: 1 },
    { id: 2, url: 'https://picsum.photos/400/300?random=2', order: 2, placeId: 1 },
  ],
  placePickupDays: [
    { id: 1, day: 1, startTime: '19:00', endTime: '20:00', isActive: true, placeId: 1 },
    { id: 2, day: 2, startTime: '19:00', endTime: '20:00', isActive: true, placeId: 1 },
    { id: 3, day: 3, startTime: '19:00', endTime: '20:00', isActive: true, placeId: 1 },
    { id: 4, day: 4, startTime: '19:00', endTime: '20:00', isActive: true, placeId: 1 },
    { id: 5, day: 5, startTime: '19:00', endTime: '20:00', isActive: true, placeId: 1 },
    { id: 6, day: 6, startTime: '18:00', endTime: '19:00', isActive: true, placeId: 1 },
    { id: 7, day: 0, startTime: '00:00', endTime: '00:00', isActive: false, placeId: 1 },
  ],
  placeSpecialPickupDates: [],
};

// Mock LuckyBag 데이터 (백엔드 lucky-bag.entity.ts 구조 기반)
export const mockLuckyBag = {
  id: 1,
  name: '오늘의 럭키백',
  description: '오늘의 빵 3-4종을 랜덤으로 담아드려요. 구성은 매일 달라져요!', // 백엔드: luckyBag.description
  price: 7800, // 백엔드: luckyBag.price (정가)
  discountPrice: 3900, // 백엔드: luckyBag.discountPrice (할인가)
  dailySalesCount: 5, // 백엔드: luckyBag.dailySalesCount
  isLimitOne: false, // 백엔드: luckyBag.isLimitOne
  placeId: 1,
  luckyBagFoods: [ // 백엔드: luckyBagFoods
    { id: 1, name: '소금빵', luckyBagId: 1 },
    { id: 2, name: '크루아상', luckyBagId: 1 },
    { id: 3, name: '바게트', luckyBagId: 1 },
  ],
  luckyBagCategory: {
    id: 1,
    categoryId: 5, // 빵
    luckyBagId: 1,
  },
};

// Mock PlaceRole 데이터 (백엔드 place-role.entity.ts 구조 기반)
export const mockPlaceRoles = [
  {
    id: 1,
    grade: PLACE_ROLE_GRADE.ADMIN,
    placeAccountId: 1,
    placeId: 1,
    placeAccount: {
      id: 1,
      email: 'hong@example.com',
      phoneNumber: '010-1234-5678',
      // name은 백엔드에 없음 - 확장 필요
      name: '홍길동',
    },
  },
  {
    id: 2,
    grade: PLACE_ROLE_GRADE.STAFF,
    placeAccountId: 2,
    placeId: 1,
    placeAccount: {
      id: 2,
      email: 'kim@example.com',
      phoneNumber: '010-9876-5432',
      name: '김직원',
    },
  },
];

// Mock Order 데이터 (백엔드 order.entity.ts 구조 기반)
export const mockOrders = [
  {
    id: 1,
    orderUid: 'ORD-2024-001',
    name: '럭키백 예약',
    pickupDate: '2024-12-09',
    pickupStartTime: '19:00',
    pickupEndTime: '20:00',
    price: 7800,
    discountPrice: 3900,
    couponPrice: 0,
    status: ORDER_STATUS.PAID,
    luckyBagCount: 1,
    code: 'A1B2',
    isPickupChecked: false,
    luckyBagId: 1,
    placeId: 1,
    userAccountId: 1,
    paidAt: new Date('2024-12-09T10:30:00'),
  },
  {
    id: 2,
    orderUid: 'ORD-2024-002',
    name: '럭키백 예약',
    pickupDate: '2024-12-09',
    pickupStartTime: '19:00',
    pickupEndTime: '20:00',
    price: 7800,
    discountPrice: 3900,
    couponPrice: 500,
    status: ORDER_STATUS.PAID,
    luckyBagCount: 1,
    code: 'C3D4',
    isPickupChecked: false,
    luckyBagId: 1,
    placeId: 1,
    userAccountId: 2,
    paidAt: new Date('2024-12-09T11:00:00'),
  },
  {
    id: 3,
    orderUid: 'ORD-2024-003',
    name: '럭키백 예약',
    pickupDate: '2024-12-09',
    pickupStartTime: '19:00',
    pickupEndTime: '20:00',
    price: 7800,
    discountPrice: 3900,
    couponPrice: 0,
    status: ORDER_STATUS.CONFIRMED,
    luckyBagCount: 1,
    code: 'E5F6',
    isPickupChecked: false,
    luckyBagId: 1,
    placeId: 1,
    userAccountId: 3,
    paidAt: new Date('2024-12-09T09:00:00'),
  },
];

// 통계 계산 헬퍼
export const calculateStats = (orders = mockOrders) => {
  const paidOrders = orders.filter(o => o.status === ORDER_STATUS.PAID);
  const confirmedOrders = orders.filter(o => o.status === ORDER_STATUS.CONFIRMED);
  const pickedUpOrders = orders.filter(o => o.isPickupChecked);

  return {
    paidCount: paidOrders.length,
    confirmedCount: confirmedOrders.length,
    pickedUpCount: pickedUpOrders.length,
    soldCount: confirmedOrders.length + pickedUpOrders.length,
    totalSold: 847,
    totalRevenue: 3305300,
  };
};

// 현재 판매 상태 계산
export const isSoldOut = (place, luckyBag, orders = mockOrders) => {
  return place.currentStatus === PLACE_CURRENT_STATUS.SOLD_OUT;
};
