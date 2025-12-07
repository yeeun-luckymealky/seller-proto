# 🍀 LuckyMeal Seller App Prototype

럭키밀 셀러앱 UX 개선을 위한 인터랙티브 프로토타입입니다.

## 📱 Preview

토스(Toss) 스타일 UX 원칙을 적용한 셀러앱 와이어프레임입니다.

## 🎨 적용된 디자인 원칙

### Toss UX Writing
- **Weed Cutting**: 불필요한 텍스트 제거, 액션 중심
- **해요체**: 친근한 톤앤매너
- **Next Action Clarity**: 다음 행동을 명확하게 안내

### Design Tokens
- 토스 컬러 팔레트 (Gray, Blue, Green, Red, Orange)
- 8px 기반 스페이싱 시스템
- 일관된 Border Radius (8-20px)

## 🗂️ 화면 구조

```
├── 홈 (Home)
│   ├── 오늘 현황 카드
│   ├── 판매 종료 토글
│   ├── 취소율 인사이트
│   └── 수량 변경 바텀시트
│
├── 주문 관리 (Orders)
│   ├── 예약 / 확정 / 완료 탭
│   ├── 주문 카드 (상태별)
│   ├── 주문 상세 바텀시트 (상태별 액션)
│   ├── 취소 바텀시트 (부분/전체)
│   └── 신고·차단 바텀시트
│
└── 설정 (Settings)
    ├── 가게 정보
    ├── 럭키백 설정
    ├── 픽업 시간 관리
    ├── 알림 메시지 설정
    ├── 차단 고객 목록
    ├── 리뷰 관리
    ├── 정산 내역
    ├── 계좌 정보
    ├── 사장님 가이드
    ├── FAQ
    └── 문의하기
```

## 🚀 실행 방법

### Claude Artifact에서 실행
1. Claude.ai에서 새 대화 시작
2. `src/App.jsx` 내용 복사
3. "이 React 코드를 실행해줘"라고 요청

### 로컬에서 실행 (Vite)
```bash
# 프로젝트 생성
npm create vite@latest luckymeal-seller -- --template react
cd luckymeal-seller

# src/App.jsx 교체
# 이 레포의 src/App.jsx 내용으로 교체

# 실행
npm install
npm run dev
```

## 📋 VoC 기반 개선 사항

| 기존 이슈 | 개선 내용 |
|----------|----------|
| 매진 토글 혼동 | "오늘 판매 종료" 명칭 단순화 + 상태 안내 |
| 쿠폰 금액 혼란 | 정가/할인가 동시 표시 + 정산 안내 인라인 |
| 취소율 인지 못함 | 홈 화면에 취소율 카드 상시 노출 |
| 앱 사용법 모름 | 사장님 가이드 + FAQ 화면 추가 |
| 정산 문의 | 정산 내역 화면에 수수료 breakdown 표시 |

## 🔗 Backend API 연동 가능 여부

| 화면 | API | 구현 가능 |
|------|-----|----------|
| 홈 - 현황 | `getInventory` | ✅ |
| 홈 - 판매 종료 | `patchPickupDateAvailability` | ✅ |
| 주문 관리 | `getOrdersByPickupDate` | ✅ |
| 주문 취소 | `cancelOrder` | ✅ |
| 가게 정보 | `updatePlace` | ✅ |
| 럭키백 설정 | `putLuckyBag` | ✅ |
| 리뷰 관리 | `getPlaceReviews`, `createReviewReply` | ✅ |
| 정산 내역 | `getSettlementHistory` | ✅ |
| 사장님 가이드 | - | ❌ (프론트 전용) |

## 📝 License

Internal Use Only - Lucky Meal (모난돌 컴퍼니)

---

Made with ❤️ by Jensen & Claude
