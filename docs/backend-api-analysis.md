# 프로토타입 vs 백엔드 API 상세 분석

> 분석일: 2024-12-08
> 대상: seller-proto 프로토타입 ↔ luckymeal-backend-main

---

## 요약

| 항목 | 비율 |
|------|------|
| **바로 구현 가능** | ~90% |
| **부분 수정 필요** | ~5% |
| **신규 개발 필요** | ~5% |

---

## 1. 홈 화면 (오늘 현황 대시보드)

| 프로토타입 필드 | 백엔드 지원 | 비고 |
|---------------|:-----------:|------|
| 오늘 럭키백 타임라인 | ❌ | 신규 개발 필요 |
| 남은 재고 수량 | ✅ | `GET /places/:id/pickup-data/inventory` |
| 재고 변경 | ⚠️ | 럭키백 설정에서 `dailySalesCount` 수정 가능 |
| 확정 대기 주문 건수 | ⚠️ | 주문 조회 후 클라이언트에서 필터 필요 |
| CO₂ 절감량 | ❌ | 클라이언트 계산 (2.5kg/백) |
| 판매 종료 토글 | ⚠️ | `PATCH /places/:id/pickup-date/availability` (시간대별만) |

### 필요 작업
- [ ] 판매자용 대시보드 API 신규 개발 (오늘 판매량, 취소율, 수익)
- [ ] 전체 판매 on/off 토글 API 추가 (선택적)

---

## 2. 주문 관리 화면

| 프로토타입 필드 | 백엔드 필드 | 지원 |
|---------------|-----------|:----:|
| 주문 코드 | `order.code` | ✅ |
| 고객명 | `order.name` | ✅ |
| 매너 점수 | `userAccount` 관계 | ⚠️ |
| 구매 수량 | `order.luckyBagCount` | ✅ |
| 가격 | `order.discountPrice` | ✅ |
| 픽업 시간 | `order.pickupStartTime/EndTime` | ✅ |
| 주문 상태 | `order.status` | ✅ |
| 픽업 확인 여부 | `order.isPickupChecked` | ✅ |

### 백엔드 API
```
GET  /api/place/places/:id/pickup-data/orders  (픽업 날짜별 조회)
POST /api/place/orders/cancel/place/:placeId   (주문 취소)
PATCH /api/place/orders/:id/pickup-checked/place/:placeId (픽업 확인)
```

### 주문 상태 (ORDER_STATUS)
| 상태 | 설명 |
|-----|------|
| `PAID` | 예약 (결제 완료) |
| `CONFIRMED` | 확정 |
| `USER_CANCEL` | 사용자 취소 |
| `PLACE_CANCEL` | 가게 취소 |
| `ADMIN_CANCEL` | 관리자 취소 |
| `FAILED` | 실패 |

### 필요 작업
- [ ] 상태별 필터링 파라미터 추가 권장 (현재는 클라이언트 필터)

---

## 3. 럭키백 설정 화면

| 프로토타입 필드 | 백엔드 필드 | 지원 |
|---------------|-----------|:----:|
| 음식 카테고리 | `luckyBagCategory.categoryId` | ✅ |
| 주요 메뉴 3개 | `luckyBagFoods[].name` | ✅ |
| 상품 설명 | `luckyBag.description` | ✅ |
| 정가 | `luckyBag.price` | ✅ |
| 판매가 (50% 할인) | `luckyBag.discountPrice` | ✅ |
| 일일 판매 수량 | `luckyBag.dailySalesCount` | ✅ |
| 구매 제한 (1인 1개) | `luckyBag.isLimitOne` | ✅ |
| 확정 메시지 | `placeAlarm.message` (type: ORDER_CONFIRM) | ✅ |
| 취소 메시지 | `placeAlarm.message` (type: ORDER_CANCEL) | ✅ |

### 백엔드 API
```
GET /api/place/places/:id/lucky-bag
PUT /api/place/places/:id/lucky-bag
```

### DTO 구조 (PutLuckyBagDto)
```typescript
{
  categoryId?: number,
  luckyBagFoods?: [{ name: string }],
  price?: number,
  discountPrice?: number,
  description?: string,
  isLimitOne?: boolean,
  dailySalesCount?: number
}
```

### 수수료 계산 (place.const.ts)
| 항목 | 비율 |
|-----|------|
| 플랫폼 수수료 | 9.8% (`LUCKY_MEAL_FEE_RATE`) |
| 결제 수수료 | 3% (`PAYMENT_FEE_RATE`) |
| 부가세 | 10% (`TAX_RATE`) |

**상태: ✅ 완전 지원**

---

## 4. 픽업 시간 설정 화면

| 프로토타입 필드 | 백엔드 지원 | 비고 |
|---------------|:-----------:|------|
| 요일별 영업 여부 | ✅ | `placePickupDays[].isOpen` |
| 요일별 픽업 시간 | ✅ | `placePickupTimes[].startTime/endTime` |
| 특별 휴무일 | ✅ | `placeSpecialPickupDates` |
| 휴무 사유 | ⚠️ | 엔티티 확인 필요 |
| 일괄 적용 | ⚠️ | 클라이언트에서 처리 |

### 백엔드 API
```
GET   /api/place/places/:id/pickup-date
PATCH /api/place/places/:id/pickup-date
POST  /api/place/places/:id/special-pickup-date
GET   /api/place/places/:id/calendar?year=&month=
PATCH /api/place/places/:id/pickup-date/availability (시간대 비활성화)
```

### DTO 구조 (PatchPickupDateDto)
```typescript
{
  pickupData: [{
    dayOfWeek: number,      // 0-6 (일-토)
    isOpen: boolean,
    pickupTimes?: [{ startTime: string, endTime: string }]
  }]
}
```

**상태: ✅ 완전 지원**

---

## 5. 가게 정보 화면

| 프로토타입 필드 | 백엔드 필드 | 지원 |
|---------------|-----------|:----:|
| 가게명 | `place.name` | ✅ |
| 주소 | `place.address` | ✅ |
| 상세주소 | `place.detailAddress` | ✅ |
| 전화번호 | ⚠️ | 확인 필요 |
| 카테고리 | `luckyBagCategory` | ✅ |
| 대표 사진 (최대 5장) | `placeImages[]` | ✅ |

### 백엔드 API
```
GET /api/place/places/:id/setting
PUT /api/place/places/:id/setting
```

### DTO 구조 (UpdatePlaceDto)
```typescript
{
  name: string,
  address: string,
  detailAddress: string,
  images?: [{ order: number, path: string }],
  placeAlarms?: [{
    id?: number,
    type: 'ORDER_CANCEL' | 'ORDER_CONFIRM',
    message: string
  }]
}
```

**상태: ✅ 완전 지원**

---

## 6. 직원 관리 화면

| 프로토타입 필드 | 백엔드 지원 | 비고 |
|---------------|:-----------:|------|
| 직원 목록 조회 | ✅ | `GET /places/:id/employees` |
| 직원 초대 | ✅ | `POST /mail/employee-invitation` (이메일) |
| 직원 가입 | ✅ | `POST /auth/place/employee-sign-up` |
| 권한 등급 | ✅ | `PlaceRole.grade` |
| 알림 활성화/비활성화 | ✅ | `PATCH /employee/.../notification-enabled` |

### 백엔드 API
```
GET   /api/place/places/:id/employees
POST  /api/mail/employee-invitation
POST  /api/auth/place/employee-sign-up
PATCH /api/place/places/employee/:placeAccountId/place/:placeId/device/notification-enabled
PATCH /api/place/places/employee/:placeAccountId/place/:placeId/device/notification-disabled
```

### 권한 등급 (PLACE_ROLE_PERMISSION)
| 등급 | 설명 |
|-----|------|
| `MANAGER` | 관리자 (설정 변경 가능) |
| `STAFF` | 직원 (주문 관리만) |

**상태: ✅ 완전 지원**

---

## 7. 리뷰 관리 화면

| 프로토타입 필드 | 백엔드 필드 | 지원 |
|---------------|-----------|:----:|
| 리뷰 목록 | `placeReviews[]` | ✅ |
| 리뷰 내용 | `review.content` | ✅ |
| 평점 | `review.rating` | ✅ |
| 작성일 | `review.createdAt` | ✅ |
| 고객 정보 | `userAccount.nickname, profileImage` | ✅ |
| 리뷰 이미지 | `reviewImages[]` | ✅ |
| 사장님 댓글 | `reviewReply.content` | ✅ |

### 백엔드 API
```
GET  /api/place/places/:id/reviews?limit=&page=
POST /api/place/places/:id/reviews/:reviewId/reply
```

### 리뷰 상태 (PLACE_REVIEW_STATUS)
| 상태 | 설명 |
|-----|------|
| `REVIEWED` | 검수 완료 |
| `REVIEWING` | 검수 중 |
| `REJECTED` | 거절됨 |
| `UNAPPROVED_DONE` | 미승인 대처 완료 |

**상태: ✅ 완전 지원**

---

## 8. 정산 내역 화면

| 프로토타입 필드 | 백엔드 필드 | 지원 |
|---------------|-----------|:----:|
| 월별 정산액 | `monthlySettlement.settlementAmount` | ✅ |
| 지급 상태 | `monthlySettlement.status` | ✅ |
| 총 주문 수 | `monthlySettlement.totalOrderCount` | ✅ |
| 총 판매가 | `monthlySettlement.totalDiscountPrice` | ✅ |
| 플랫폼 수수료 | `monthlySettlement.platformFeeAmount` | ✅ |
| 결제 수수료 | `monthlySettlement.paymentFeeAmount` | ✅ |
| 세금 | `monthlySettlement.taxAmount` | ✅ |
| 순수익 | `monthlySettlement.netProfitAmount` | ✅ |
| 지급일 | `monthlySettlement.paidAt` | ✅ |
| Excel 다운로드 | ❌ | 신규 개발 필요 |

### 백엔드 API
```
GET  /api/place/places/:id/settlement-history?year=&month=
POST /api/place/places/request-settlement
```

### MonthlySettlement 엔티티 주요 필드
```typescript
{
  payoutId: string,           // 지급 ID
  year: number,
  month: number,
  totalOrderCount: number,    // 총 주문 수
  totalPrice: number,         // 총 정가
  totalDiscountPrice: number, // 총 판매가
  totalLuckyBagCount: number, // 총 럭키백 수
  averageOrderAmount: number, // 평균 주문 금액
  platformFeeRate: number,    // 플랫폼 수수료율
  platformFeeAmount: number,  // 플랫폼 수수료
  paymentFeeRate: number,     // 결제 수수료율
  paymentFeeAmount: number,   // 결제 수수료
  taxAmount: number,          // 세금
  settlementAmount: number,   // 정산 금액
  netProfitAmount: number,    // 순수익
  status: string,             // 상태
  payOutDate: Date,           // 정산 일자
  paidAt: Date                // 지급 일자
}
```

### 필요 작업
- [ ] Excel 다운로드 API 추가

**상태: ✅ 거의 완전 지원**

---

## 신규 개발 필요 항목

### 1. 판매자 대시보드 API (우선순위: 높음)

**제안 엔드포인트:** `GET /api/place/places/:id/dashboard`

**응답 예시:**
```typescript
{
  today: {
    totalOrders: number,        // 오늘 총 주문
    confirmedOrders: number,    // 확정 대기
    completedOrders: number,    // 픽업 완료
    cancelledOrders: number,    // 취소
    cancellationRate: number,   // 취소율 (%)
    expectedRevenue: number,    // 예상 수익
  },
  inventory: {
    total: number,              // 일일 판매 수량
    sold: number,               // 판매됨
    remaining: number           // 남은 재고
  },
  timeline: {
    reservationOpen: string,    // 예약 오픈 시간
    confirmed: string,          // 확정 시간
    pickupStart: string,        // 픽업 시작
    pickupEnd: string           // 마감
  }
}
```

**예상 작업량:** 1-2일

### 2. 전체 판매 토글 (우선순위: 중간)

**옵션 A:** Place 엔티티에 `isSalesActive` 필드 추가
```typescript
@Column({ default: true })
isSalesActive: boolean;
```

**옵션 B:** 기존 `pickup-date/availability` API 활용 (시간대별 제어)

**예상 작업량:** 0.5일

### 3. Excel 다운로드 (우선순위: 낮음)

**제안 엔드포인트:** `GET /api/place/places/:id/settlement-history/export?year=&month=`

**예상 작업량:** 0.5일

---

## 결론

**프로토타입의 약 90%는 기존 백엔드 API로 바로 구현 가능합니다.**

### 화면별 구현 가능 현황

| 화면 | 지원율 | 상태 |
|-----|:------:|------|
| 럭키백 설정 | 100% | ✅ 바로 구현 |
| 픽업 시간 설정 | 100% | ✅ 바로 구현 |
| 가게 정보 | 100% | ✅ 바로 구현 |
| 직원 관리 | 100% | ✅ 바로 구현 |
| 리뷰 관리 | 100% | ✅ 바로 구현 |
| 주문 관리 | 95% | ✅ 바로 구현 (필터 클라이언트 처리) |
| 정산 내역 | 95% | ✅ 바로 구현 (Excel만 추가) |
| 홈 (대시보드) | 50% | ⚠️ 대시보드 API 필요 |

### 필수 추가 개발
1. **판매자 대시보드 API** - 오늘 판매량, 취소율, 예상 수익
2. (선택) 전체 판매 토글
3. (선택) Excel 다운로드
