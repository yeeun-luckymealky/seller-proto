import React, { useState } from 'react';

// ============================================
// TDS (Toss Design System) 토큰
// - 마진: 메인 15px, 서브페이지 22px
// - 버튼 높이: 53-55px
// - 네비게이션 높이: 50px
// - 아이콘: 22x22px
// - 텍스트: 16-20px (가독성 최적 범위)
// ============================================
const tds = {
  color: {
    gray50: '#F9FAFB', gray100: '#F2F4F6', gray200: '#E5E8EB',
    gray300: '#D1D6DB', gray400: '#B0B8C1', gray500: '#8B95A1',
    gray600: '#6B7684', gray700: '#4E5968', gray800: '#333D4B', gray900: '#191F28',
    blue50: '#E8F3FF', blue100: '#C9E2FF', blue500: '#3182F6', blue600: '#1B64DA',
    green50: '#E8FAF0', green500: '#30C85E',
    red50: '#FFEBEE', red500: '#F44336',
    orange50: '#FFF3E0', orange500: '#FF9800',
    white: '#FFFFFF',
  },
  margin: { main: 15, sub: 22 },
  radius: { sm: 8, md: 12, lg: 16 },
  // 터치 타깃: 최소 44px, 인접 시 57px+
  touch: { min: 44, safe: 57 },
  // 버튼 높이: 53-55px
  button: { height: 54 },
  // 네비게이션 높이: 50px
  nav: { height: 50 },
  // 툴바 높이: 42px
  toolbar: { height: 42 },
};

// ============================================
// 백엔드 상수 매핑
// ============================================
const ORDER_STATUS = {
  PAID: 'PAID',           // 결제완료 (예약)
  CONFIRMED: 'CONFIRMED', // 확정
  COMPLETED: 'COMPLETED', // 픽업완료
};

// ============================================
// TDS 컴포넌트
// - Minimum Features: 필수 컴포넌트만
// - Sleek Experience: 매끈한 전환
// ============================================

// 기본 버튼 (터치 영역 54px, TDS 기준)
const Button = ({ children, variant = 'primary', fullWidth, onClick, disabled }) => {
  const styles = {
    primary: { bg: tds.color.blue500, color: tds.color.white },
    secondary: { bg: tds.color.gray100, color: tds.color.gray800 },
    danger: { bg: tds.color.red500, color: tds.color.white },
    ghost: { bg: 'transparent', color: tds.color.blue500 },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height: tds.button.height,
      padding: '0 20px',
      background: disabled ? tds.color.gray200 : s.bg,
      color: disabled ? tds.color.gray400 : s.color,
      border: 'none',
      borderRadius: tds.radius.md,
      fontSize: 16,
      fontWeight: 600,
      width: fullWidth ? '100%' : 'auto',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.15s ease',
    }}>{children}</button>
  );
};

// 토글 (터치 영역 확보)
const Toggle = ({ checked, onChange, label }) => (
  <div onClick={() => onChange(!checked)} style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: tds.touch.safe,
    cursor: 'pointer',
  }}>
    {label && <span style={{ fontSize: 16, color: tds.color.gray900 }}>{label}</span>}
    <div style={{
      width: 51, height: 31, borderRadius: 16, padding: 2,
      background: checked ? tds.color.blue500 : tds.color.gray300,
      transition: 'background 0.2s',
    }}>
      <div style={{
        width: 27, height: 27, borderRadius: 14,
        background: tds.color.white,
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }} />
    </div>
  </div>
);

// 리스트 아이템 (터치 영역 57px+)
const ListItem = ({ title, value, onClick, showArrow = true }) => (
  <div onClick={onClick} style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: tds.touch.safe,
    padding: `0 ${tds.margin.main}px`,
    background: tds.color.white,
    cursor: onClick ? 'pointer' : 'default',
    borderBottom: `1px solid ${tds.color.gray100}`,
  }}>
    <span style={{ fontSize: 16, color: tds.color.gray900 }}>{title}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {value && <span style={{ fontSize: 16, color: tds.color.gray500 }}>{value}</span>}
      {showArrow && onClick && <span style={{ color: tds.color.gray400, fontSize: 18 }}>›</span>}
    </div>
  </div>
);

// 헤더 (툴바 높이 42px)
const Header = ({ title, onBack, right }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: tds.toolbar.height,
    padding: `0 ${tds.margin.main}px`,
    background: tds.color.white,
    borderBottom: `1px solid ${tds.color.gray100}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: tds.touch.min, height: tds.touch.min,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', fontSize: 20, cursor: 'pointer',
          marginLeft: -12,
        }}>←</button>
      )}
      <span style={{ fontSize: 18, fontWeight: 700 }}>{title}</span>
    </div>
    {right}
  </div>
);

// 바텀 네비게이션 (높이 50px)
const BottomNav = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'orders', label: '주문', icon: '📋' },
    { id: 'settings', label: '내 가게', icon: '⚙️' },
  ];
  return (
    <div style={{
      display: 'flex',
      height: tds.nav.height,
      background: tds.color.white,
      borderTop: `1px solid ${tds.color.gray100}`,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: 480,
      margin: '0 auto',
    }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === tab.id ? tds.color.blue500 : tds.color.gray500,
        }}>
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontSize: 11, fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// 바텀시트 (Context-based 원칙)
const BottomSheet = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        maxWidth: 480,
        margin: '0 auto',
        background: tds.color.white,
        borderRadius: `${tds.radius.lg}px ${tds.radius.lg}px 0 0`,
        maxHeight: '80vh',
        overflow: 'hidden',
      }}>
        <div style={{ padding: `16px ${tds.margin.sub}px`, borderBottom: `1px solid ${tds.color.gray100}` }}>
          <div style={{ width: 36, height: 4, background: tds.color.gray300, borderRadius: 2, margin: '0 auto 12px' }} />
          {title && <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center' }}>{title}</div>}
        </div>
        <div style={{ padding: tds.margin.sub, paddingBottom: 34, overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
};

// ============================================
// 홈 화면
// One Thing per One Page: "오늘 팔 수 있는 상태인가?"
// Value First: 현황을 먼저, 액션은 그 다음
// ============================================
const HomeScreen = ({ data, setData, onNavigate }) => {
  const [showQtySheet, setShowQtySheet] = useState(false);

  const remain = data.totalQty - data.soldQty;
  const isSoldOut = data.isSoldOut;

  return (
    <div style={{ paddingBottom: tds.nav.height + 20 }}>
      {/* 핵심 정보: 남은 수량 (One Thing) */}
      <div style={{
        padding: `32px ${tds.margin.main}px`,
        background: tds.color.white,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 14, color: tds.color.gray500, marginBottom: 8 }}>
          {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
        </div>

        {isSoldOut ? (
          <>
            <div style={{ fontSize: 48, fontWeight: 700, color: tds.color.gray400 }}>판매 종료</div>
            <div style={{ fontSize: 16, color: tds.color.gray500, marginTop: 8 }}>
              오늘 판매가 종료되었어요
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, fontWeight: 700, color: tds.color.blue500 }}>{remain}</div>
            <div style={{ fontSize: 16, color: tds.color.gray500, marginTop: 8 }}>
              {data.totalQty}개 중 남은 수량
            </div>
          </>
        )}
      </div>

      {/* 주문 현황 (3개만 - Minimum Features) */}
      <div style={{
        display: 'flex',
        padding: `16px ${tds.margin.main}px`,
        gap: 12,
        background: tds.color.gray50,
      }}>
        {[
          { label: '예약', count: data.paidCount, color: tds.color.orange500 },
          { label: '확정', count: data.confirmedCount, color: tds.color.blue500 },
          { label: '완료', count: data.completedCount, color: tds.color.green500 },
        ].map(item => (
          <div key={item.label} style={{
            flex: 1,
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: item.color }}>{item.count}</div>
            <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 4 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 확정 대기 알림 (Context-based) */}
      {data.paidCount > 0 && (
        <div
          onClick={() => onNavigate('orders')}
          style={{
            margin: `16px ${tds.margin.main}px`,
            padding: 16,
            background: tds.color.blue50,
            borderRadius: tds.radius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: tds.color.blue600 }}>
              확정 대기 {data.paidCount}건
            </div>
            <div style={{ fontSize: 14, color: tds.color.blue500, marginTop: 2 }}>
              픽업 전 확정해 주세요
            </div>
          </div>
          <span style={{ fontSize: 20, color: tds.color.blue500 }}>›</span>
        </div>
      )}

      {/* 액션 영역 */}
      <div style={{ padding: `8px ${tds.margin.main}px` }}>
        {/* 판매 종료 토글 */}
        <div style={{
          padding: 16,
          background: tds.color.white,
          borderRadius: tds.radius.md,
          marginBottom: 12,
        }}>
          <Toggle
            checked={isSoldOut}
            onChange={(v) => setData({ ...data, isSoldOut: v })}
            label="오늘 판매 종료"
          />
        </div>

        {/* 수량 변경 (Clear CTA) */}
        <div
          onClick={() => setShowQtySheet(true)}
          style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontSize: 14, color: tds.color.gray500 }}>오늘 판매 수량</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{data.totalQty}개</div>
          </div>
          <Button variant="secondary">변경</Button>
        </div>
      </div>

      {/* 수량 변경 시트 (Easy to Answer) */}
      <BottomSheet isOpen={showQtySheet} onClose={() => setShowQtySheet(false)} title="오늘 수량 변경">
        <div style={{ padding: '24px 0' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}>
            <button
              onClick={() => setData({ ...data, totalQty: Math.max(1, data.totalQty - 1) })}
              style={{
                width: tds.touch.safe,
                height: tds.touch.safe,
                borderRadius: tds.touch.safe / 2,
                border: `1px solid ${tds.color.gray300}`,
                background: tds.color.white,
                fontSize: 24,
                cursor: 'pointer',
              }}
            >−</button>
            <span style={{ fontSize: 40, fontWeight: 700, minWidth: 60, textAlign: 'center' }}>
              {data.totalQty}
            </span>
            <button
              onClick={() => setData({ ...data, totalQty: data.totalQty + 1 })}
              style={{
                width: tds.touch.safe,
                height: tds.touch.safe,
                borderRadius: tds.touch.safe / 2,
                border: `1px solid ${tds.color.gray300}`,
                background: tds.color.white,
                fontSize: 24,
                cursor: 'pointer',
              }}
            >+</button>
          </div>
          <div style={{
            marginTop: 24,
            padding: 12,
            background: tds.color.gray50,
            borderRadius: tds.radius.sm,
            fontSize: 14,
            color: tds.color.gray600,
            textAlign: 'center',
          }}>
            오늘만 적용돼요
          </div>
        </div>
        <Button fullWidth onClick={() => setShowQtySheet(false)}>확인</Button>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 주문 화면
// One Thing per One Page: "이 주문을 어떻게 할까?"
// Tap & Scroll: 탭으로 필터, 탭으로 액션
// ============================================
const OrdersScreen = ({ data, setData }) => {
  const [tab, setTab] = useState('paid');
  const [selected, setSelected] = useState(null);

  const orders = {
    paid: [
      { id: 1, code: 'A01', name: '김**', qty: 2, price: 3900, time: '14:00-15:00' },
      { id: 2, code: 'A02', name: '이**', qty: 1, price: 3900, time: '14:00-15:00' },
    ],
    confirmed: [
      { id: 3, code: 'A03', name: '박**', qty: 1, price: 3900, time: '15:00-16:00' },
    ],
    completed: [
      { id: 4, code: 'A04', name: '최**', qty: 2, price: 7800, time: '12:00-13:00', completedAt: '12:32' },
    ],
  };

  const tabs = [
    { id: 'paid', label: `예약 ${orders.paid.length}` },
    { id: 'confirmed', label: `확정 ${orders.confirmed.length}` },
    { id: 'completed', label: '완료' },
  ];

  const currentOrders = orders[tab];

  // 주문 확정 (Tap & Scroll 원칙)
  const confirmOrder = (order) => {
    setData({ ...data, confirmedCount: data.confirmedCount + 1, paidCount: data.paidCount - 1 });
    setSelected(null);
  };

  // 픽업 완료
  const completePickup = (order) => {
    setData({ ...data, completedCount: data.completedCount + 1, confirmedCount: data.confirmedCount - 1 });
    setSelected(null);
  };

  return (
    <div style={{ paddingBottom: tds.nav.height + 20 }}>
      {/* 탭 (Tap & Scroll) */}
      <div style={{
        display: 'flex',
        background: tds.color.white,
        borderBottom: `1px solid ${tds.color.gray100}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              height: tds.touch.safe,
              background: 'none',
              border: 'none',
              borderBottom: tab === t.id ? `2px solid ${tds.color.blue500}` : '2px solid transparent',
              color: tab === t.id ? tds.color.blue500 : tds.color.gray500,
              fontSize: 15,
              fontWeight: tab === t.id ? 600 : 400,
              cursor: 'pointer',
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* 주문 목록 */}
      {currentOrders.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
          <div style={{ fontSize: 16, color: tds.color.gray500 }}>
            {tab === 'paid' && '예약된 주문이 없어요'}
            {tab === 'confirmed' && '확정된 주문이 없어요'}
            {tab === 'completed' && '완료된 주문이 없어요'}
          </div>
        </div>
      ) : (
        <div style={{ padding: `12px ${tds.margin.main}px` }}>
          {currentOrders.map(order => (
            <div
              key={order.id}
              onClick={() => setSelected(order)}
              style={{
                padding: 16,
                background: tds.color.white,
                borderRadius: tds.radius.md,
                marginBottom: 12,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    padding: '4px 10px',
                    background: tds.color.blue50,
                    color: tds.color.blue600,
                    borderRadius: tds.radius.sm,
                    fontSize: 14,
                    fontWeight: 600,
                  }}>{order.code}</span>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{order.name}</span>
                </div>
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  {order.price.toLocaleString()}원
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 12,
                fontSize: 14,
                color: tds.color.gray500,
              }}>
                <span>럭키백 {order.qty}개</span>
                <span>픽업 {order.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 주문 상세 시트 (Clear CTA) */}
      <BottomSheet
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `주문 ${selected.code}` : ''}
      >
        {selected && (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{
                padding: 16,
                background: tds.color.gray50,
                borderRadius: tds.radius.md,
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: tds.color.gray500 }}>고객</span>
                  <span style={{ fontWeight: 500 }}>{selected.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: tds.color.gray500 }}>수량</span>
                  <span style={{ fontWeight: 500 }}>럭키백 {selected.qty}개</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: tds.color.gray500 }}>픽업 시간</span>
                  <span style={{ fontWeight: 500 }}>{selected.time}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: `1px solid ${tds.color.gray200}`,
                  marginTop: 8,
                }}>
                  <span style={{ fontWeight: 600 }}>결제 금액</span>
                  <span style={{ fontWeight: 700, color: tds.color.blue500 }}>
                    {selected.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* CTA - 상태별 다른 액션 */}
            {tab === 'paid' && (
              <div style={{ display: 'flex', gap: 12 }}>
                <Button variant="secondary" fullWidth onClick={() => setSelected(null)}>
                  취소
                </Button>
                <Button fullWidth onClick={() => confirmOrder(selected)}>
                  주문 확정
                </Button>
              </div>
            )}
            {tab === 'confirmed' && (
              <Button fullWidth onClick={() => completePickup(selected)}>
                픽업 완료
              </Button>
            )}
            {tab === 'completed' && (
              <Button variant="secondary" fullWidth onClick={() => setSelected(null)}>
                닫기
              </Button>
            )}
          </>
        )}
      </BottomSheet>
    </div>
  );
};

// ============================================
// 설정 화면
// Minimum Features: 필수 메뉴만
// Tap & Scroll: 리스트 형태
// ============================================
const SettingsScreen = ({ onNavigate, data }) => {
  return (
    <div style={{ paddingBottom: tds.nav.height + 20 }}>
      {/* 가게 정보 요약 */}
      <div style={{
        padding: `24px ${tds.margin.main}px`,
        background: tds.color.white,
        borderBottom: `1px solid ${tds.color.gray100}`,
      }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{data.shopName}</div>
        <div style={{ fontSize: 14, color: tds.color.gray500 }}>{data.category}</div>
      </div>

      {/* 메뉴 그룹 - 핵심만 (Minimum Features) */}
      <div style={{ marginTop: 8 }}>
        <div style={{ padding: `16px ${tds.margin.main}px 8px`, fontSize: 13, color: tds.color.gray500 }}>
          판매 설정
        </div>
        <ListItem title="럭키백 설정" onClick={() => onNavigate('luckybag')} />
        <ListItem title="픽업 시간" onClick={() => onNavigate('pickup')} />
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ padding: `16px ${tds.margin.main}px 8px`, fontSize: 13, color: tds.color.gray500 }}>
          가게 관리
        </div>
        <ListItem title="가게 정보" onClick={() => onNavigate('shop-info')} />
        <ListItem title="직원 관리" onClick={() => onNavigate('employees')} />
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ padding: `16px ${tds.margin.main}px 8px`, fontSize: 13, color: tds.color.gray500 }}>
          정산
        </div>
        <ListItem title="정산 내역" onClick={() => onNavigate('settlement')} />
        <ListItem title="리뷰 관리" onClick={() => onNavigate('reviews')} />
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ padding: `16px ${tds.margin.main}px 8px`, fontSize: 13, color: tds.color.gray500 }}>
          고객센터
        </div>
        <ListItem title="사장님 가이드" onClick={() => onNavigate('guide')} />
        <ListItem title="문의하기" onClick={() => onNavigate('contact')} />
      </div>

      {/* 소비자앱으로 전환 */}
      <div style={{ padding: `24px ${tds.margin.main}px` }}>
        <Button variant="ghost" fullWidth onClick={() => onNavigate('consumer-mode')}>
          소비자앱으로 전환
        </Button>
      </div>
    </div>
  );
};

// ============================================
// 서브 화면들 (One Thing per One Page)
// ============================================

// 럭키백 설정 - "럭키백 어떻게 구성할까?"
const LuckyBagScreen = ({ onBack, data, setData }) => {
  const [showPriceSheet, setShowPriceSheet] = useState(false);
  const [showQtySheet, setShowQtySheet] = useState(false);
  const [tempPrice, setTempPrice] = useState(data.luckyBagPrice);
  const [tempQty, setTempQty] = useState(data.defaultQty);

  return (
    <div>
      <Header title="럭키백 설정" onBack={onBack} />

      <div style={{ padding: `16px ${tds.margin.main}px` }}>
        {/* 가격 설정 */}
        <div
          onClick={() => { setTempPrice(data.luckyBagPrice); setShowPriceSheet(true); }}
          style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            marginBottom: 12,
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: 14, color: tds.color.gray500, marginBottom: 4 }}>판매 가격</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              {data.luckyBagPrice.toLocaleString()}원
            </div>
            <span style={{ color: tds.color.gray400, fontSize: 18 }}>›</span>
          </div>
          <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 4 }}>
            정가 {data.originalPrice.toLocaleString()}원 (
            {Math.round((1 - data.luckyBagPrice / data.originalPrice) * 100)}% 할인)
          </div>
        </div>

        {/* 기본 수량 */}
        <div
          onClick={() => { setTempQty(data.defaultQty); setShowQtySheet(true); }}
          style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            marginBottom: 12,
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: 14, color: tds.color.gray500, marginBottom: 4 }}>기본 판매 수량</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{data.defaultQty}개</div>
            <span style={{ color: tds.color.gray400, fontSize: 18 }}>›</span>
          </div>
          <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 4 }}>
            매일 이 수량으로 판매가 시작돼요
          </div>
        </div>

        {/* 구성품 */}
        <div style={{
          padding: 16,
          background: tds.color.white,
          borderRadius: tds.radius.md,
        }}>
          <div style={{ fontSize: 14, color: tds.color.gray500, marginBottom: 8 }}>구성 안내</div>
          <div style={{ fontSize: 16, lineHeight: 1.6 }}>
            {data.luckyBagDescription || '오늘의 베이커리 3-4종을 담아드려요'}
          </div>
        </div>
      </div>

      {/* 가격 변경 시트 */}
      <BottomSheet isOpen={showPriceSheet} onClose={() => setShowPriceSheet(false)} title="판매 가격">
        <div style={{ marginBottom: 24 }}>
          <input
            type="number"
            value={tempPrice}
            onChange={(e) => setTempPrice(Number(e.target.value))}
            style={{
              width: '100%',
              padding: 16,
              fontSize: 24,
              fontWeight: 700,
              textAlign: 'center',
              border: `1px solid ${tds.color.gray200}`,
              borderRadius: tds.radius.md,
              outline: 'none',
            }}
          />
          <div style={{ textAlign: 'center', marginTop: 12, color: tds.color.gray500, fontSize: 14 }}>
            정가 대비 {Math.round((1 - tempPrice / data.originalPrice) * 100)}% 할인
          </div>
        </div>
        <Button fullWidth onClick={() => { setData({ ...data, luckyBagPrice: tempPrice }); setShowPriceSheet(false); }}>
          저장
        </Button>
      </BottomSheet>

      {/* 수량 변경 시트 */}
      <BottomSheet isOpen={showQtySheet} onClose={() => setShowQtySheet(false)} title="기본 판매 수량">
        <div style={{ padding: '24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            <button
              onClick={() => setTempQty(Math.max(1, tempQty - 1))}
              style={{
                width: tds.touch.safe, height: tds.touch.safe,
                borderRadius: tds.touch.safe / 2,
                border: `1px solid ${tds.color.gray300}`,
                background: tds.color.white,
                fontSize: 24,
                cursor: 'pointer',
              }}
            >−</button>
            <span style={{ fontSize: 40, fontWeight: 700, minWidth: 60, textAlign: 'center' }}>{tempQty}</span>
            <button
              onClick={() => setTempQty(tempQty + 1)}
              style={{
                width: tds.touch.safe, height: tds.touch.safe,
                borderRadius: tds.touch.safe / 2,
                border: `1px solid ${tds.color.gray300}`,
                background: tds.color.white,
                fontSize: 24,
                cursor: 'pointer',
              }}
            >+</button>
          </div>
        </div>
        <Button fullWidth onClick={() => { setData({ ...data, defaultQty: tempQty }); setShowQtySheet(false); }}>
          저장
        </Button>
      </BottomSheet>
    </div>
  );
};

// 픽업 시간 설정 - "언제 픽업 받을까?"
const PickupScreen = ({ onBack, data, setData }) => {
  const [showTimeSheet, setShowTimeSheet] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div>
      <Header title="픽업 시간" onBack={onBack} />

      <div style={{ padding: `16px ${tds.margin.main}px` }}>
        <div style={{
          padding: 16,
          background: tds.color.blue50,
          borderRadius: tds.radius.md,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 14, color: tds.color.blue600 }}>
            설정한 시간에 고객이 픽업을 예약할 수 있어요
          </div>
        </div>

        {data.pickupSlots.map((slot, idx) => (
          <div
            key={idx}
            onClick={() => { setEditingSlot(idx); setShowTimeSheet(true); }}
            style={{
              padding: 16,
              background: tds.color.white,
              borderRadius: tds.radius.md,
              marginBottom: 12,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {slot.start} - {slot.end}
                </div>
                <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 4 }}>
                  {slot.days.map(d => weekdays[d]).join(', ')}
                </div>
              </div>
              <span style={{ color: tds.color.gray400, fontSize: 18 }}>›</span>
            </div>
          </div>
        ))}

        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            setData({
              ...data,
              pickupSlots: [...data.pickupSlots, { start: '18:00', end: '19:00', days: [0, 1, 2, 3, 4] }]
            });
          }}
        >
          + 픽업 시간 추가
        </Button>
      </div>
    </div>
  );
};

// 가게 정보 - "가게 정보 확인/수정"
const ShopInfoScreen = ({ onBack, data }) => {
  return (
    <div>
      <Header title="가게 정보" onBack={onBack} />

      <div style={{ background: tds.color.white }}>
        <ListItem title="가게명" value={data.shopName} showArrow={false} />
        <ListItem title="카테고리" value={data.category} showArrow={false} />
        <ListItem title="주소" value={data.address} showArrow={false} />
        <ListItem title="전화번호" value={data.phone} showArrow={false} />
      </div>

      <div style={{ padding: `24px ${tds.margin.main}px` }}>
        <div style={{ fontSize: 13, color: tds.color.gray500, lineHeight: 1.6 }}>
          가게 정보 변경이 필요하시면 고객센터로 문의해 주세요.
        </div>
      </div>
    </div>
  );
};

// 직원 관리 - "누가 접근할 수 있을까?"
const EmployeesScreen = ({ onBack, data }) => {
  const roleLabels = { 0: '관리자', 1: '매니저', 2: '직원' };

  return (
    <div>
      <Header title="직원 관리" onBack={onBack} />

      <div style={{ padding: `16px ${tds.margin.main}px` }}>
        {data.employees.map((emp, idx) => (
          <div key={idx} style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>{emp.name}</div>
              <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 2 }}>{emp.phone}</div>
            </div>
            <span style={{
              padding: '4px 10px',
              background: emp.role === 0 ? tds.color.blue50 : tds.color.gray100,
              color: emp.role === 0 ? tds.color.blue600 : tds.color.gray600,
              borderRadius: tds.radius.sm,
              fontSize: 13,
            }}>{roleLabels[emp.role]}</span>
          </div>
        ))}

        <Button variant="secondary" fullWidth>+ 직원 초대</Button>
      </div>
    </div>
  );
};

// 정산 내역 - "얼마 벌었을까?"
const SettlementScreen = ({ onBack }) => {
  const settlements = [
    { month: '2024년 11월', amount: 1250000, status: 'paid', paidAt: '12/15' },
    { month: '2024년 10월', amount: 980000, status: 'paid', paidAt: '11/15' },
  ];

  return (
    <div>
      <Header title="정산 내역" onBack={onBack} />

      <div style={{ padding: `16px ${tds.margin.main}px` }}>
        {/* 이번 달 예상 */}
        <div style={{
          padding: 20,
          background: tds.color.blue500,
          borderRadius: tds.radius.md,
          marginBottom: 16,
          color: tds.color.white,
        }}>
          <div style={{ fontSize: 14, opacity: 0.8 }}>12월 예상 정산금</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>
            1,580,000원
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
            1/15 지급 예정
          </div>
        </div>

        {/* 지난 정산 */}
        {settlements.map((s, idx) => (
          <div key={idx} style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>{s.month}</span>
              <span style={{
                padding: '2px 8px',
                background: tds.color.green50,
                color: tds.color.green500,
                borderRadius: 4,
                fontSize: 12,
              }}>지급완료</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>
              {s.amount.toLocaleString()}원
            </div>
            <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 4 }}>
              {s.paidAt} 지급
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 리뷰 관리 - "고객 피드백 확인"
const ReviewsScreen = ({ onBack }) => {
  const reviews = [
    { id: 1, name: '김**', rating: 5, content: '빵이 정말 맛있어요!', date: '12/5', hasPhoto: true },
    { id: 2, name: '이**', rating: 4, content: '가성비 좋아요', date: '12/3', hasPhoto: false },
  ];

  return (
    <div>
      <Header title="리뷰 관리" onBack={onBack} />

      <div style={{ padding: `16px ${tds.margin.main}px` }}>
        {/* 평균 평점 */}
        <div style={{
          padding: 20,
          background: tds.color.white,
          borderRadius: tds.radius.md,
          marginBottom: 16,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, fontWeight: 700 }}>4.8</div>
          <div style={{ fontSize: 20, color: tds.color.orange500, marginTop: 4 }}>★★★★★</div>
          <div style={{ fontSize: 13, color: tds.color.gray500, marginTop: 8 }}>리뷰 156개</div>
        </div>

        {/* 리뷰 목록 */}
        {reviews.map(review => (
          <div key={review.id} style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 500 }}>{review.name}</span>
                <span style={{ color: tds.color.orange500, fontSize: 14 }}>
                  {'★'.repeat(review.rating)}
                </span>
              </div>
              <span style={{ fontSize: 13, color: tds.color.gray500 }}>{review.date}</span>
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>{review.content}</div>
            {review.hasPhoto && (
              <div style={{
                marginTop: 8,
                padding: '4px 8px',
                background: tds.color.gray100,
                borderRadius: 4,
                fontSize: 12,
                color: tds.color.gray600,
                display: 'inline-block',
              }}>📷 사진 리뷰</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 사장님 가이드 - 도움말
const GuideScreen = ({ onBack }) => {
  const guides = [
    { title: '럭키백 판매 시작하기', desc: '처음 판매를 시작하는 방법' },
    { title: '주문 관리하기', desc: '예약, 확정, 픽업 완료 처리' },
    { title: '정산 안내', desc: '정산 주기와 수수료 안내' },
  ];

  return (
    <div>
      <Header title="사장님 가이드" onBack={onBack} />

      <div style={{ padding: `16px ${tds.margin.main}px` }}>
        {guides.map((guide, idx) => (
          <div key={idx} style={{
            padding: 16,
            background: tds.color.white,
            borderRadius: tds.radius.md,
            marginBottom: 12,
            cursor: 'pointer',
          }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{guide.title}</div>
            <div style={{ fontSize: 14, color: tds.color.gray500, marginTop: 4 }}>{guide.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 문의하기
const ContactScreen = ({ onBack }) => {
  return (
    <div>
      <Header title="문의하기" onBack={onBack} />

      <div style={{ padding: `24px ${tds.margin.main}px`, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>도움이 필요하신가요?</div>
        <div style={{ fontSize: 14, color: tds.color.gray500, marginBottom: 24, lineHeight: 1.6 }}>
          카카오톡 채널로 문의해 주세요.<br />
          평일 10:00 - 18:00 답변 드려요.
        </div>
        <Button fullWidth>카카오톡으로 문의하기</Button>
      </div>
    </div>
  );
};

// ============================================
// 앱 메인
// ============================================
export default function App() {
  const [screen, setScreen] = useState('home');
  const [mainTab, setMainTab] = useState('home');

  // 앱 데이터 (실제로는 API에서 가져옴)
  const [data, setData] = useState({
    // 가게 정보
    shopName: '행복한 베이커리',
    category: '베이커리',
    address: '서울시 강남구 역삼동 123-45',
    phone: '02-1234-5678',

    // 오늘 현황
    totalQty: 5,
    soldQty: 2,
    paidCount: 2,
    confirmedCount: 1,
    completedCount: 3,
    isSoldOut: false,

    // 럭키백 설정
    luckyBagPrice: 3900,
    originalPrice: 7800,
    defaultQty: 5,
    luckyBagDescription: '오늘의 빵 3-4종을 담아드려요',

    // 픽업 시간
    pickupSlots: [
      { start: '14:00', end: '15:00', days: [0, 1, 2, 3, 4] },
      { start: '20:00', end: '21:00', days: [0, 1, 2, 3, 4, 5, 6] },
    ],

    // 직원
    employees: [
      { name: '홍길동', phone: '010-1234-5678', role: 0 },
      { name: '김직원', phone: '010-8765-4321', role: 2 },
    ],
  });

  // 네비게이션
  const navigate = (target) => {
    if (['home', 'orders', 'settings'].includes(target)) {
      setMainTab(target);
      setScreen(target);
    } else {
      setScreen(target);
    }
  };

  const goBack = () => {
    setScreen(mainTab);
  };

  // 화면 렌더링
  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen data={data} setData={setData} onNavigate={navigate} />;
      case 'orders':
        return <OrdersScreen data={data} setData={setData} />;
      case 'settings':
        return <SettingsScreen data={data} onNavigate={navigate} />;
      case 'luckybag':
        return <LuckyBagScreen onBack={goBack} data={data} setData={setData} />;
      case 'pickup':
        return <PickupScreen onBack={goBack} data={data} setData={setData} />;
      case 'shop-info':
        return <ShopInfoScreen onBack={goBack} data={data} />;
      case 'employees':
        return <EmployeesScreen onBack={goBack} data={data} />;
      case 'settlement':
        return <SettlementScreen onBack={goBack} />;
      case 'reviews':
        return <ReviewsScreen onBack={goBack} />;
      case 'guide':
        return <GuideScreen onBack={goBack} />;
      case 'contact':
        return <ContactScreen onBack={goBack} />;
      default:
        return <HomeScreen data={data} setData={setData} onNavigate={navigate} />;
    }
  };

  // 메인 탭 화면인지 확인
  const isMainScreen = ['home', 'orders', 'settings'].includes(screen);

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      minHeight: '100vh',
      background: tds.color.gray50,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {renderScreen()}
      {isMainScreen && (
        <BottomNav activeTab={mainTab} onChange={navigate} />
      )}
    </div>
  );
}
