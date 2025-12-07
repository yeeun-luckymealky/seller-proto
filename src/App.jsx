import React, { useState } from 'react';

// ============================================
// 디자인 토큰 (토스 스타일)
// ============================================
const tokens = {
  colors: {
    gray50: '#F9FAFB', gray100: '#F2F4F6', gray200: '#E5E8EB',
    gray300: '#D1D6DB', gray400: '#B0B8C1', gray500: '#8B95A1',
    gray600: '#6B7684', gray700: '#4E5968', gray800: '#333D4B', gray900: '#191F28',
    blue50: '#E8F3FF', blue100: '#C9E2FF', blue500: '#3182F6', blue600: '#1B64DA',
    green50: '#E8FAF0', green100: '#B1F1CC', green500: '#30C85E', green600: '#1DAB47',
    red50: '#FFEBEE', red100: '#FFCDD2', red500: '#F44336', red600: '#E53935',
    orange50: '#FFF3E0', orange100: '#FFE0B2', orange500: '#FF9800',
    white: '#FFFFFF',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 },
  fontSize: { xs: 11, sm: 12, md: 14, lg: 16, xl: 18, xxl: 20, xxxl: 24, xxxxl: 28 },
};

// ============================================
// 공통 컴포넌트
// ============================================
const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{
    background: tokens.colors.white,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.xl,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  }}>{children}</div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: { bg: tokens.colors.gray100, color: tokens.colors.gray700 },
    primary: { bg: tokens.colors.blue50, color: tokens.colors.blue600 },
    success: { bg: tokens.colors.green50, color: tokens.colors.green600 },
    warning: { bg: tokens.colors.orange50, color: tokens.colors.orange500 },
    danger: { bg: tokens.colors.red50, color: tokens.colors.red600 },
    new: { bg: tokens.colors.red500, color: tokens.colors.white },
  };
  const v = variants[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 8px',
      borderRadius: tokens.radius.sm, fontSize: tokens.fontSize.xs,
      fontWeight: 600, background: v.bg, color: v.color,
    }}>{children}</span>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', fullWidth, onClick, disabled, style }) => {
  const variants = {
    primary: { bg: tokens.colors.blue500, color: tokens.colors.white },
    secondary: { bg: tokens.colors.gray100, color: tokens.colors.gray800 },
    ghost: { bg: 'transparent', color: tokens.colors.blue500 },
    danger: { bg: tokens.colors.red500, color: tokens.colors.white },
    success: { bg: tokens.colors.green500, color: tokens.colors.white },
  };
  const sizes = { sm: { padding: '8px 12px', fontSize: 13 }, md: { padding: '12px 16px', fontSize: 15 }, lg: { padding: '16px 20px', fontSize: 16 } };
  const v = variants[variant];
  const s = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? tokens.colors.gray200 : v.bg,
      color: disabled ? tokens.colors.gray400 : v.color,
      border: 'none', borderRadius: tokens.radius.md,
      padding: s.padding, fontSize: s.fontSize, fontWeight: 600,
      width: fullWidth ? '100%' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s', ...style,
    }}>{children}</button>
  );
};

const Toggle = ({ checked, onChange, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    {label && <span style={{ fontSize: tokens.fontSize.md, color: tokens.colors.gray800 }}>{label}</span>}
    <div onClick={() => onChange(!checked)} style={{
      width: 52, height: 32, borderRadius: 16, padding: 2, cursor: 'pointer',
      background: checked ? tokens.colors.blue500 : tokens.colors.gray300,
      transition: 'background 0.2s',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 14, background: tokens.colors.white,
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
      }} />
    </div>
  </div>
);

const ListItem = ({ icon, title, subtitle, right, onClick, showArrow = true }) => (
  <div onClick={onClick} style={{
    display: 'flex', alignItems: 'center', padding: `${tokens.spacing.lg}px 0`,
    borderBottom: `1px solid ${tokens.colors.gray100}`, cursor: onClick ? 'pointer' : 'default',
  }}>
    {icon && <div style={{ marginRight: tokens.spacing.md, fontSize: 20 }}>{icon}</div>}
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: tokens.fontSize.md, color: tokens.colors.gray900, fontWeight: 500 }}>{title}</div>
      {subtitle && <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginTop: 2 }}>{subtitle}</div>}
    </div>
    {right && <div style={{ marginRight: tokens.spacing.sm }}>{right}</div>}
    {showArrow && onClick && <div style={{ color: tokens.colors.gray400 }}>›</div>}
  </div>
);

const Header = ({ title, onBack, right }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: tokens.spacing.lg, background: tokens.colors.white,
    borderBottom: `1px solid ${tokens.colors.gray100}`, position: 'sticky', top: 0, zIndex: 100,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
      {onBack && <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 4 }}>←</button>}
      <span style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: tokens.colors.gray900 }}>{title}</span>
    </div>
    {right}
  </div>
);

const TabBar = ({ tabs, activeTab, onChange }) => (
  <div style={{ display: 'flex', background: tokens.colors.white, borderBottom: `1px solid ${tokens.colors.gray100}` }}>
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)} style={{
        flex: 1, padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`,
        background: 'none', border: 'none', cursor: 'pointer',
        color: activeTab === tab.id ? tokens.colors.blue500 : tokens.colors.gray500,
        fontWeight: activeTab === tab.id ? 600 : 400, fontSize: tokens.fontSize.md,
        borderBottom: activeTab === tab.id ? `2px solid ${tokens.colors.blue500}` : '2px solid transparent',
      }}>{tab.label}</button>
    ))}
  </div>
);

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, background: tokens.colors.white,
        borderRadius: `${tokens.radius.xl}px ${tokens.radius.xl}px 0 0`,
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: tokens.spacing.lg, borderBottom: `1px solid ${tokens.colors.gray100}` }}>
          <div style={{ width: 40, height: 4, background: tokens.colors.gray300, borderRadius: 2, margin: '0 auto 12px' }} />
          <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 700 }}>{title}</div>
        </div>
        <div style={{ padding: tokens.spacing.xl, overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'orders', label: '주문', icon: '📋' },
    { id: 'settings', label: '설정', icon: '⚙️' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', padding: `${tokens.spacing.md}px 0`,
      background: tokens.colors.white, borderTop: `1px solid ${tokens.colors.gray100}`,
      position: 'sticky', bottom: 0,
    }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer', padding: tokens.spacing.sm,
          color: activeTab === tab.id ? tokens.colors.blue500 : tokens.colors.gray500,
        }}>
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontSize: tokens.fontSize.xs, fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const EmptyState = ({ icon, title, description, action }) => (
  <div style={{ textAlign: 'center', padding: `${tokens.spacing.xxxl}px ${tokens.spacing.xl}px` }}>
    <div style={{ fontSize: 48, marginBottom: tokens.spacing.lg }}>{icon}</div>
    <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: tokens.colors.gray800, marginBottom: tokens.spacing.sm }}>{title}</div>
    <div style={{ fontSize: tokens.fontSize.md, color: tokens.colors.gray500, marginBottom: tokens.spacing.xl }}>{description}</div>
    {action}
  </div>
);

// ============================================
// 화면별 컴포넌트
// ============================================

// 홈 화면
const HomeScreen = ({ onNavigate, shopData, setShopData }) => {
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);
  const [showInsightSheet, setShowInsightSheet] = useState(false);
  
  const stats = [
    { label: '예약', value: shopData.reservedCount, color: tokens.colors.orange500 },
    { label: '확정', value: shopData.confirmedCount, color: tokens.colors.blue500 },
    { label: '픽업완료', value: shopData.completedCount, color: tokens.colors.green500 },
  ];

  return (
    <div style={{ paddingBottom: tokens.spacing.xl }}>
      {/* 오늘 현황 */}
      <Card style={{ margin: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.lg }}>
          <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: tokens.colors.gray800 }}>오늘 현황</span>
          <span style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>12월 7일 토요일</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xxxxl, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 판매 종료 토글 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Toggle
          checked={shopData.isClosed}
          onChange={(v) => setShopData({ ...shopData, isClosed: v })}
          label="오늘 판매 종료"
        />
        {shopData.isClosed && (
          <div style={{ marginTop: tokens.spacing.md, padding: tokens.spacing.md, background: tokens.colors.gray50, borderRadius: tokens.radius.sm }}>
            <span style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600 }}>
              💡 다시 판매를 원하시면 토글을 켜주세요
            </span>
          </div>
        )}
      </Card>

      {/* 확정 전 주문 알림 배너 */}
      {shopData.reservedCount > 0 && (
        <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`, background: tokens.colors.blue50, border: `1px solid ${tokens.colors.blue100}` }} onClick={() => onNavigate('orders')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: tokens.colors.blue600 }}>
                확정 전 주문 {shopData.reservedCount}건
              </div>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.blue500, marginTop: 4 }}>
                픽업 시간 전에 확인해 주세요
              </div>
            </div>
            <span style={{ color: tokens.colors.blue500 }}>›</span>
          </div>
        </Card>
      )}

      {/* 취소율 인사이트 카드 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }} onClick={() => setShowInsightSheet(true)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: tokens.colors.gray800 }}>이번 주 취소율</span>
              <Badge variant="danger">23%</Badge>
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginTop: 4 }}>
              수량을 3개로 줄이면 취소율을 낮출 수 있어요
            </div>
          </div>
          <span style={{ color: tokens.colors.gray400 }}>›</span>
        </div>
      </Card>

      {/* 오늘의 수량 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }} onClick={() => setShowQuantitySheet(true)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>오늘의 럭키백 수량</div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: tokens.colors.gray900, marginTop: 4 }}>
              {shopData.todayQuantity}개
            </div>
          </div>
          <Button variant="secondary" size="sm">변경</Button>
        </div>
      </Card>

      {/* 사장님 가이드 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px` }} onClick={() => onNavigate('guide')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <span style={{ fontSize: 24 }}>📖</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600 }}>사장님 가이드</span>
                <Badge variant="new">NEW</Badge>
              </div>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>앱 사용법을 확인해보세요</div>
            </div>
          </div>
          <span style={{ color: tokens.colors.gray400 }}>›</span>
        </div>
      </Card>

      {/* 수량 변경 바텀시트 */}
      <BottomSheet isOpen={showQuantitySheet} onClose={() => setShowQuantitySheet(false)} title="럭키백 수량 변경">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: tokens.spacing.lg, background: tokens.colors.gray50, borderRadius: tokens.radius.md }}>
            <button onClick={() => setShopData({ ...shopData, todayQuantity: Math.max(1, shopData.todayQuantity - 1) })} style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${tokens.colors.gray300}`, background: tokens.colors.white, fontSize: 20, cursor: 'pointer' }}>-</button>
            <span style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700 }}>{shopData.todayQuantity}</span>
            <button onClick={() => setShopData({ ...shopData, todayQuantity: shopData.todayQuantity + 1 })} style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${tokens.colors.gray300}`, background: tokens.colors.white, fontSize: 20, cursor: 'pointer' }}>+</button>
          </div>
        </div>
        <div style={{ padding: tokens.spacing.md, background: tokens.colors.blue50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.blue600 }}>
            💡 추천 수량: <strong>3개</strong>
          </div>
          <div style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.blue500, marginTop: 4 }}>
            최근 주문 패턴 분석 결과, 3개일 때 취소율이 가장 낮아요
          </div>
        </div>
        <Button fullWidth onClick={() => setShowQuantitySheet(false)}>저장하기</Button>
      </BottomSheet>

      {/* 취소율 인사이트 바텀시트 */}
      <BottomSheet isOpen={showInsightSheet} onClose={() => setShowInsightSheet(false)} title="취소율 상세">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ textAlign: 'center', padding: tokens.spacing.xl }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: tokens.colors.red500 }}>23%</div>
            <div style={{ fontSize: tokens.fontSize.md, color: tokens.colors.gray600, marginTop: tokens.spacing.sm }}>이번 주 취소율</div>
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.md, marginBottom: tokens.spacing.xl }}>
            <div style={{ flex: 1, padding: tokens.spacing.lg, background: tokens.colors.gray50, borderRadius: tokens.radius.md, textAlign: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 600 }}>13건</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>총 주문</div>
            </div>
            <div style={{ flex: 1, padding: tokens.spacing.lg, background: tokens.colors.red50, borderRadius: tokens.radius.md, textAlign: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 600, color: tokens.colors.red600 }}>3건</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>취소</div>
            </div>
          </div>
          <Card style={{ background: tokens.colors.orange50, border: 'none' }}>
            <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: tokens.colors.orange500, marginBottom: tokens.spacing.sm }}>
              💡 개선 제안
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray700, lineHeight: 1.5 }}>
              럭키백 수량을 5개에서 3개로 줄이면 재고 소진이 빨라져 취소율을 낮출 수 있어요.
            </div>
          </Card>
        </div>
        <Button fullWidth onClick={() => { setShopData({ ...shopData, todayQuantity: 3 }); setShowInsightSheet(false); }}>
          3개로 수량 변경하기
        </Button>
      </BottomSheet>
    </div>
  );
};

// 주문 관리 화면
const OrdersScreen = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('reserved');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelSheet, setCancelSheet] = useState(null);
  const [reportSheet, setReportSheet] = useState(null);
  
  const orders = {
    reserved: [
      { id: 1, code: 'A001', customer: '김**', quantity: 2, price: 7800, time: '14:00-15:00', hasCoupon: true, couponAmount: 1000 },
      { id: 2, code: 'A002', customer: '이**', quantity: 1, price: 3900, time: '14:00-15:00', hasCoupon: false },
    ],
    confirmed: [
      { id: 3, code: 'A003', customer: '박**', quantity: 1, price: 3900, time: '14:00-15:00', isPickedUp: false },
    ],
    completed: [
      { id: 4, code: 'A004', customer: '최**', quantity: 2, price: 7800, time: '13:00-14:00', isPickedUp: true },
    ],
  };

  const tabs = [
    { id: 'reserved', label: `예약 ${orders.reserved.length}` },
    { id: 'confirmed', label: `확정 ${orders.confirmed.length}` },
    { id: 'completed', label: `완료 ${orders.completed.length}` },
  ];

  const OrderCard = ({ order, status }) => (
    <Card style={{ marginBottom: tokens.spacing.md }} onClick={() => setSelectedOrder({ ...order, status })}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.md }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
            <span style={{ fontSize: tokens.fontSize.lg, fontWeight: 600 }}>{order.code}</span>
            {order.hasCoupon && <Badge variant="primary">쿠폰</Badge>}
            {order.isPickedUp && <Badge variant="success">픽업완료</Badge>}
          </div>
          <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginTop: 4 }}>{order.customer} · {order.quantity}개</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600 }}>{order.price.toLocaleString()}원</div>
          {order.hasCoupon && (
            <div style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.gray500 }}>
              정가 {(order.price + order.couponAmount).toLocaleString()}원
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>🕐 {order.time}</span>
        {status === 'reserved' && (
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            <Button variant="secondary" size="sm">취소</Button>
            <Button size="sm">확정</Button>
          </div>
        )}
        {status === 'confirmed' && !order.isPickedUp && (
          <Button variant="success" size="sm">픽업 완료</Button>
        )}
      </div>
      {order.hasCoupon && (
        <div style={{ marginTop: tokens.spacing.md, padding: tokens.spacing.sm, background: tokens.colors.blue50, borderRadius: tokens.radius.sm }}>
          <span style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.blue600 }}>
            💡 쿠폰은 럭키밀 부담이에요. 정산은 정가 기준으로 진행돼요.
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <div>
      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div style={{ padding: tokens.spacing.lg }}>
        {orders[activeTab].length === 0 ? (
          <EmptyState
            icon="📭"
            title={`${tabs.find(t => t.id === activeTab)?.label.split(' ')[0]} 주문이 없어요`}
            description="새로운 주문이 들어오면 여기에 표시돼요"
          />
        ) : (
          orders[activeTab].map(order => (
            <OrderCard key={order.id} order={order} status={activeTab} />
          ))
        )}
      </div>

      {/* 주문 상세 바텀시트 - 상태별 분기 */}
      <BottomSheet isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`주문 상세 ${selectedOrder?.code || ''}`}>
        {selectedOrder && (
          <div>
            {/* 확정 상태: 픽업 코드 강조 */}
            {selectedOrder.status === 'confirmed' && (
              <div style={{ 
                textAlign: 'center', 
                padding: tokens.spacing.xl, 
                background: tokens.colors.blue50, 
                borderRadius: tokens.radius.lg,
                marginBottom: tokens.spacing.xl 
              }}>
                <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.blue600, marginBottom: tokens.spacing.xs }}>픽업 코드</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: tokens.colors.blue500, letterSpacing: 4 }}>
                  {selectedOrder.code}
                </div>
                <div style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.blue500, marginTop: tokens.spacing.sm }}>
                  고객에게 코드를 확인해주세요
                </div>
              </div>
            )}

            {/* 완료 상태: 완료 표시 */}
            {selectedOrder.status === 'completed' && (
              <div style={{ 
                textAlign: 'center', 
                padding: tokens.spacing.xl, 
                background: tokens.colors.green50, 
                borderRadius: tokens.radius.lg,
                marginBottom: tokens.spacing.xl 
              }}>
                <div style={{ fontSize: 32, marginBottom: tokens.spacing.sm }}>✅</div>
                <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: tokens.colors.green600 }}>픽업 완료</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.green500, marginTop: tokens.spacing.xs }}>
                  오늘 14:32에 픽업되었어요
                </div>
              </div>
            )}

            {/* 예약 상태: 대기 안내 */}
            {selectedOrder.status === 'reserved' && (
              <div style={{ 
                textAlign: 'center', 
                padding: tokens.spacing.xl, 
                background: tokens.colors.orange50, 
                borderRadius: tokens.radius.lg,
                marginBottom: tokens.spacing.xl 
              }}>
                <div style={{ fontSize: 32, marginBottom: tokens.spacing.sm }}>⏳</div>
                <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: tokens.colors.orange500 }}>확정 대기중</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, marginTop: tokens.spacing.xs }}>
                  픽업 시간 전에 확정해주세요
                </div>
              </div>
            )}

            {/* 고객 정보 */}
            <div style={{ marginBottom: tokens.spacing.xl }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginBottom: tokens.spacing.sm }}>고객 정보</div>
              <div style={{ padding: tokens.spacing.lg, background: tokens.colors.gray50, borderRadius: tokens.radius.md }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span>이름</span>
                  <span style={{ fontWeight: 600 }}>{selectedOrder.customer}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span>매너 점수</span>
                  <span style={{ fontWeight: 600, color: tokens.colors.green500 }}>4.8</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>주문 이력</span>
                  <span style={{ fontWeight: 600 }}>3회 방문</span>
                </div>
              </div>
            </div>
            
            {/* 주문 정보 */}
            <div style={{ marginBottom: tokens.spacing.xl }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginBottom: tokens.spacing.sm }}>주문 정보</div>
              <div style={{ padding: tokens.spacing.lg, background: tokens.colors.gray50, borderRadius: tokens.radius.md }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span>럭키백</span>
                  <span style={{ fontWeight: 600 }}>{selectedOrder.quantity}개</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span>결제 금액</span>
                  <span style={{ fontWeight: 600 }}>{selectedOrder.price.toLocaleString()}원</span>
                </div>
                {selectedOrder.hasCoupon && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                    <span>쿠폰 할인</span>
                    <span style={{ fontWeight: 600, color: tokens.colors.blue500 }}>-{selectedOrder.couponAmount?.toLocaleString()}원</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>픽업 시간</span>
                  <span style={{ fontWeight: 600 }}>{selectedOrder.time}</span>
                </div>
              </div>
            </div>

            {/* 쿠폰 안내 (쿠폰 사용 시) */}
            {selectedOrder.hasCoupon && (
              <div style={{ 
                padding: tokens.spacing.md, 
                background: tokens.colors.blue50, 
                borderRadius: tokens.radius.md, 
                marginBottom: tokens.spacing.xl 
              }}>
                <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.blue600 }}>
                  💡 쿠폰 할인분은 럭키밀이 부담해요. 정산은 정가 기준으로 진행돼요.
                </div>
              </div>
            )}

            {/* 상태별 액션 버튼 */}
            {selectedOrder.status === 'reserved' && (
              <div>
                <Button fullWidth onClick={() => setSelectedOrder(null)} style={{ marginBottom: tokens.spacing.sm }}>
                  주문 확정하기
                </Button>
                <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                  <Button variant="secondary" fullWidth onClick={() => setCancelSheet({ ...selectedOrder, type: 'partial' })}>
                    부분 취소
                  </Button>
                  <Button variant="danger" fullWidth onClick={() => setCancelSheet({ ...selectedOrder, type: 'full' })}>
                    전체 취소
                  </Button>
                </div>
              </div>
            )}

            {selectedOrder.status === 'confirmed' && (
              <div>
                <Button variant="success" fullWidth onClick={() => setSelectedOrder(null)} style={{ marginBottom: tokens.spacing.sm }}>
                  픽업 완료 처리
                </Button>
                <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                  <Button variant="secondary" fullWidth onClick={() => setCancelSheet({ ...selectedOrder, type: 'partial' })}>
                    부분 취소
                  </Button>
                  <Button variant="ghost" fullWidth onClick={() => setReportSheet(selectedOrder)}>
                    신고·차단
                  </Button>
                </div>
              </div>
            )}

            {selectedOrder.status === 'completed' && (
              <div style={{ display: 'flex', gap: tokens.spacing.md }}>
                <Button variant="secondary" fullWidth onClick={() => setReportSheet(selectedOrder)}>
                  신고하기
                </Button>
                <Button variant="danger" fullWidth onClick={() => setReportSheet(selectedOrder)}>
                  차단하기
                </Button>
              </div>
            )}
          </div>
        )}
      </BottomSheet>

      {/* 취소 바텀시트 */}
      <BottomSheet 
        isOpen={!!cancelSheet} 
        onClose={() => setCancelSheet(null)} 
        title={cancelSheet?.type === 'full' ? '주문 전체 취소' : '부분 취소'}
      >
        {cancelSheet && (
          <div>
            {cancelSheet.type === 'partial' && cancelSheet.quantity > 1 && (
              <div style={{ marginBottom: tokens.spacing.xl }}>
                <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginBottom: tokens.spacing.sm }}>
                  취소할 수량 선택
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl, padding: tokens.spacing.lg, background: tokens.colors.gray50, borderRadius: tokens.radius.md }}>
                  <button 
                    onClick={() => setCancelSheet({ ...cancelSheet, cancelQty: Math.max(1, (cancelSheet.cancelQty || 1) - 1) })}
                    style={{ width: 40, height: 40, borderRadius: 20, border: `1px solid ${tokens.colors.gray300}`, background: tokens.colors.white, fontSize: 18, cursor: 'pointer' }}
                  >-</button>
                  <span style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
                    {cancelSheet.cancelQty || 1}
                  </span>
                  <button 
                    onClick={() => setCancelSheet({ ...cancelSheet, cancelQty: Math.min(cancelSheet.quantity - 1, (cancelSheet.cancelQty || 1) + 1) })}
                    style={{ width: 40, height: 40, borderRadius: 20, border: `1px solid ${tokens.colors.gray300}`, background: tokens.colors.white, fontSize: 18, cursor: 'pointer' }}
                  >+</button>
                </div>
                <div style={{ textAlign: 'center', fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginTop: tokens.spacing.sm }}>
                  총 {cancelSheet.quantity}개 중 {cancelSheet.cancelQty || 1}개 취소
                </div>
              </div>
            )}

            <div style={{ padding: tokens.spacing.lg, background: tokens.colors.red50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.red600, marginBottom: tokens.spacing.sm, fontWeight: 600 }}>
                ⚠️ 취소 시 주의사항
              </div>
              <ul style={{ margin: 0, paddingLeft: tokens.spacing.lg, fontSize: tokens.fontSize.sm, color: tokens.colors.gray700, lineHeight: 1.6 }}>
                <li>취소 금액만큼 정산에서 차감돼요</li>
                <li>취소율이 높아지면 노출이 줄어들 수 있어요</li>
                <li>고객에게 취소 알림이 전송돼요</li>
              </ul>
            </div>

            <Button variant="danger" fullWidth onClick={() => { setCancelSheet(null); setSelectedOrder(null); }}>
              {cancelSheet.type === 'full' ? '전체 취소하기' : `${cancelSheet.cancelQty || 1}개 취소하기`}
            </Button>
          </div>
        )}
      </BottomSheet>

      {/* 신고/차단 바텀시트 */}
      <BottomSheet isOpen={!!reportSheet} onClose={() => setReportSheet(null)} title="신고 및 차단">
        {reportSheet && (
          <div>
            <div style={{ marginBottom: tokens.spacing.xl }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginBottom: tokens.spacing.sm }}>사유 선택</div>
              {['노쇼 (픽업 시간 미방문)', '비매너 행동', '허위 주문 반복', '기타'].map((reason, idx) => (
                <div 
                  key={idx}
                  onClick={() => setReportSheet({ ...reportSheet, reason })}
                  style={{ 
                    padding: tokens.spacing.lg, 
                    border: `1px solid ${reportSheet.reason === reason ? tokens.colors.blue500 : tokens.colors.gray200}`,
                    borderRadius: tokens.radius.md, 
                    marginBottom: tokens.spacing.sm,
                    background: reportSheet.reason === reason ? tokens.colors.blue50 : tokens.colors.white,
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ color: reportSheet.reason === reason ? tokens.colors.blue600 : tokens.colors.gray700 }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: tokens.spacing.md }}>
              <Button variant="secondary" fullWidth onClick={() => { setReportSheet(null); }}>
                신고만 하기
              </Button>
              <Button variant="danger" fullWidth onClick={() => { setReportSheet(null); setSelectedOrder(null); }}>
                차단하기
              </Button>
            </div>
            
            <div style={{ marginTop: tokens.spacing.lg, fontSize: tokens.fontSize.xs, color: tokens.colors.gray500, textAlign: 'center' }}>
              차단 시 해당 고객은 우리 가게에서 주문할 수 없어요
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

// 설정 화면
const SettingsScreen = ({ onNavigate }) => {
  const menuGroups = [
    {
      title: '가게 관리',
      items: [
        { id: 'shop-info', icon: '🏪', title: '가게 정보', subtitle: '이름, 주소, 사진', screen: 'shop-info' },
        { id: 'luckybag', icon: '🎁', title: '럭키백 설정', subtitle: '가격, 수량, 구성품', screen: 'luckybag-settings' },
        { id: 'pickup', icon: '📅', title: '픽업 시간 관리', subtitle: '영업일, 픽업 시간대', screen: 'pickup-settings' },
        { id: 'notification', icon: '🔔', title: '알림 메시지 설정', subtitle: '주문 확정, 취소 메시지', screen: 'notification-settings' },
      ]
    },
    {
      title: '고객 관리',
      items: [
        { id: 'blocked', icon: '🚫', title: '차단 고객 목록', screen: 'blocked-users' },
        { id: 'reviews', icon: '⭐', title: '리뷰 관리', screen: 'reviews' },
      ]
    },
    {
      title: '정산',
      items: [
        { id: 'settlement', icon: '💰', title: '정산 내역', screen: 'settlement' },
        { id: 'account', icon: '🏦', title: '계좌 정보', screen: 'account-settings' },
      ]
    },
    {
      title: '도움말',
      items: [
        { id: 'guide', icon: '📖', title: '사장님 가이드', right: <Badge variant="new">NEW</Badge>, screen: 'guide' },
        { id: 'faq', icon: '❓', title: '자주 묻는 질문', screen: 'faq' },
        { id: 'contact', icon: '💬', title: '문의하기', screen: 'contact' },
      ]
    },
  ];

  return (
    <div style={{ padding: tokens.spacing.lg }}>
      {menuGroups.map(group => (
        <div key={group.title} style={{ marginBottom: tokens.spacing.xxl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, fontWeight: 600, marginBottom: tokens.spacing.sm, paddingLeft: tokens.spacing.sm }}>
            {group.title}
          </div>
          <Card style={{ padding: `0 ${tokens.spacing.lg}px` }}>
            {group.items.map((item, idx) => (
              <ListItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                right={item.right}
                onClick={() => onNavigate(item.screen)}
              />
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
};

// 가게 정보 화면
const ShopInfoScreen = ({ onBack }) => {
  const [shopInfo, setShopInfo] = useState({
    name: '행복한 빵집',
    address: '서울시 강남구 테헤란로 123',
    detailAddress: '1층 101호',
    images: [
      { id: 1, url: 'https://via.placeholder.com/100' },
      { id: 2, url: 'https://via.placeholder.com/100' },
    ]
  });

  return (
    <div>
      <Header title="가게 정보" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>가게 이름</label>
          <input
            type="text"
            value={shopInfo.name}
            onChange={(e) => setShopInfo({ ...shopInfo, name: e.target.value })}
            style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: tokens.spacing.xl }}>
          <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>주소</label>
          <input
            type="text"
            value={shopInfo.address}
            onChange={(e) => setShopInfo({ ...shopInfo, address: e.target.value })}
            style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, marginBottom: tokens.spacing.sm, boxSizing: 'border-box'
            }}
          />
          <input
            type="text"
            value={shopInfo.detailAddress}
            placeholder="상세 주소"
            onChange={(e) => setShopInfo({ ...shopInfo, detailAddress: e.target.value })}
            style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: tokens.spacing.xl }}>
          <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>가게 사진 (최대 5장)</label>
          <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {shopInfo.images.map(img => (
              <div key={img.id} style={{ width: 80, height: 80, borderRadius: tokens.radius.md, background: tokens.colors.gray200, position: 'relative' }}>
                <button style={{
                  position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: 12,
                  background: tokens.colors.gray800, color: tokens.colors.white, border: 'none', cursor: 'pointer', fontSize: 12
                }}>×</button>
              </div>
            ))}
            <button style={{
              width: 80, height: 80, borderRadius: tokens.radius.md, border: `2px dashed ${tokens.colors.gray300}`,
              background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: tokens.colors.gray400
            }}>+</button>
          </div>
        </div>

        <Button fullWidth>저장하기</Button>
      </div>
    </div>
  );
};

// 럭키백 설정 화면
const LuckyBagSettingsScreen = ({ onBack }) => {
  const [settings, setSettings] = useState({
    price: 7800,
    discountPrice: 3900,
    dailyCount: 5,
    isLimitOne: true,
    description: '신선한 빵과 케이크가 랜덤으로 들어있어요!',
    foods: ['식빵', '크로아상', '단팥빵', '케이크']
  });

  return (
    <div>
      <Header title="럭키백 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ marginBottom: tokens.spacing.xl }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>정가</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <input
                type="number"
                value={settings.price}
                onChange={(e) => setSettings({ ...settings, price: Number(e.target.value) })}
                style={{
                  flex: 1, padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                  borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md
                }}
              />
              <span style={{ color: tokens.colors.gray600 }}>원</span>
            </div>
          </div>

          <div style={{ marginBottom: tokens.spacing.xl }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>할인가</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <input
                type="number"
                value={settings.discountPrice}
                onChange={(e) => setSettings({ ...settings, discountPrice: Number(e.target.value) })}
                style={{
                  flex: 1, padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                  borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md
                }}
              />
              <span style={{ color: tokens.colors.gray600 }}>원</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.green500, marginTop: tokens.spacing.xs }}>
              {Math.round((1 - settings.discountPrice / settings.price) * 100)}% 할인
            </div>
          </div>

          <div style={{ marginBottom: tokens.spacing.xl }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>1일 판매 수량</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <input
                type="number"
                value={settings.dailyCount}
                onChange={(e) => setSettings({ ...settings, dailyCount: Number(e.target.value) })}
                style={{
                  flex: 1, padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                  borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md
                }}
              />
              <span style={{ color: tokens.colors.gray600 }}>개</span>
            </div>
          </div>

          <Toggle
            checked={settings.isLimitOne}
            onChange={(v) => setSettings({ ...settings, isLimitOne: v })}
            label="1인 1개 제한"
          />
        </Card>

        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ marginBottom: tokens.spacing.lg }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>럭키백 설명</label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, minHeight: 80, resize: 'vertical', boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>구성품</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
              {settings.foods.map((food, idx) => (
                <Badge key={idx} variant="default">{food} ×</Badge>
              ))}
              <button style={{
                padding: '4px 12px', borderRadius: tokens.radius.sm, border: `1px dashed ${tokens.colors.gray300}`,
                background: 'transparent', cursor: 'pointer', fontSize: tokens.fontSize.sm, color: tokens.colors.gray500
              }}>+ 추가</button>
            </div>
          </div>
        </Card>

        <Button fullWidth>저장하기</Button>
      </div>
    </div>
  );
};

// 픽업 시간 관리 화면
const PickupSettingsScreen = ({ onBack }) => {
  const [pickupDays, setPickupDays] = useState([
    { day: '월', isOpen: true, times: [{ start: '14:00', end: '15:00' }] },
    { day: '화', isOpen: true, times: [{ start: '14:00', end: '15:00' }] },
    { day: '수', isOpen: true, times: [{ start: '14:00', end: '15:00' }] },
    { day: '목', isOpen: true, times: [{ start: '14:00', end: '15:00' }] },
    { day: '금', isOpen: true, times: [{ start: '14:00', end: '15:00' }] },
    { day: '토', isOpen: false, times: [] },
    { day: '일', isOpen: false, times: [] },
  ]);

  return (
    <div>
      <Header title="픽업 시간 관리" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          {pickupDays.map((dayData, idx) => (
            <div key={dayData.day} style={{
              padding: `${tokens.spacing.lg}px 0`,
              borderBottom: idx < pickupDays.length - 1 ? `1px solid ${tokens.colors.gray100}` : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: dayData.isOpen ? tokens.spacing.md : 0 }}>
                <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600 }}>{dayData.day}요일</span>
                <Toggle
                  checked={dayData.isOpen}
                  onChange={(v) => {
                    const newDays = [...pickupDays];
                    newDays[idx].isOpen = v;
                    setPickupDays(newDays);
                  }}
                />
              </div>
              {dayData.isOpen && dayData.times.map((time, timeIdx) => (
                <div key={timeIdx} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                  <input
                    type="time"
                    value={time.start}
                    style={{ flex: 1, padding: tokens.spacing.sm, border: `1px solid ${tokens.colors.gray200}`, borderRadius: tokens.radius.sm }}
                  />
                  <span>~</span>
                  <input
                    type="time"
                    value={time.end}
                    style={{ flex: 1, padding: tokens.spacing.sm, border: `1px solid ${tokens.colors.gray200}`, borderRadius: tokens.radius.sm }}
                  />
                </div>
              ))}
            </div>
          ))}
        </Card>
        <Button fullWidth>저장하기</Button>
      </div>
    </div>
  );
};

// 알림 메시지 설정 화면
const NotificationSettingsScreen = ({ onBack }) => {
  const [messages, setMessages] = useState({
    orderConfirm: '주문이 확정되었습니다. 픽업 시간에 방문해주세요!',
    orderCancel: '죄송합니다. 재고 소진으로 주문이 취소되었습니다.',
  });

  return (
    <div>
      <Header title="알림 메시지 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ marginBottom: tokens.spacing.xl }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>
              주문 확정 메시지
            </label>
            <textarea
              value={messages.orderConfirm}
              onChange={(e) => setMessages({ ...messages, orderConfirm: e.target.value })}
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, minHeight: 80, resize: 'vertical', boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>
              주문 취소 메시지
            </label>
            <textarea
              value={messages.orderCancel}
              onChange={(e) => setMessages({ ...messages, orderCancel: e.target.value })}
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, minHeight: 80, resize: 'vertical', boxSizing: 'border-box'
              }}
            />
          </div>
        </Card>

        <div style={{ padding: tokens.spacing.md, background: tokens.colors.blue50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.blue600 }}>
            💡 메시지는 알림톡으로 고객에게 전송돼요
          </div>
        </div>

        <Button fullWidth>저장하기</Button>
      </div>
    </div>
  );
};

// 차단 고객 목록 화면
const BlockedUsersScreen = ({ onBack }) => {
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, name: '김**', reason: '노쇼 반복', date: '2024.12.01' },
    { id: 2, name: '이**', reason: '비매너 행동', date: '2024.11.28' },
  ]);

  return (
    <div>
      <Header title="차단 고객 목록" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {blockedUsers.length === 0 ? (
          <EmptyState
            icon="🚫"
            title="차단한 고객이 없어요"
            description="문제가 있는 고객은 주문 상세에서 차단할 수 있어요"
          />
        ) : (
          blockedUsers.map(user => (
            <Card key={user.id} style={{ marginBottom: tokens.spacing.md }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600 }}>{user.name}</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, marginTop: 4 }}>
                    {user.reason} · {user.date}
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => {
                  setBlockedUsers(blockedUsers.filter(u => u.id !== user.id));
                }}>해제</Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// 리뷰 관리 화면
const ReviewsScreen = ({ onBack }) => {
  const [reviews, setReviews] = useState([
    { id: 1, customer: '김**', content: '빵이 정말 맛있어요! 다음에 또 올게요~', rating: 5, date: '2024.12.05', reply: null, images: [] },
    { id: 2, customer: '이**', content: '양도 많고 신선해서 좋았습니다', rating: 4, date: '2024.12.03', reply: '감사합니다! 또 방문해주세요 😊', images: [] },
  ]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  return (
    <div>
      <Header title="리뷰 관리" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {reviews.length === 0 ? (
          <EmptyState
            icon="⭐"
            title="아직 리뷰가 없어요"
            description="고객들의 리뷰가 여기에 표시돼요"
          />
        ) : (
          reviews.map(review => (
            <Card key={review.id} style={{ marginBottom: tokens.spacing.md }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                    <span style={{ fontWeight: 600 }}>{review.customer}</span>
                    <span style={{ color: tokens.colors.orange500 }}>{'★'.repeat(review.rating)}</span>
                  </div>
                  <div style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.gray500, marginTop: 2 }}>{review.date}</div>
                </div>
              </div>
              <p style={{ fontSize: tokens.fontSize.md, color: tokens.colors.gray700, margin: 0, lineHeight: 1.5 }}>
                {review.content}
              </p>
              
              {review.reply ? (
                <div style={{ marginTop: tokens.spacing.md, padding: tokens.spacing.md, background: tokens.colors.gray50, borderRadius: tokens.radius.sm }}>
                  <div style={{ fontSize: tokens.fontSize.xs, color: tokens.colors.gray500, marginBottom: 4 }}>사장님 답글</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray700 }}>{review.reply}</div>
                </div>
              ) : (
                <div style={{ marginTop: tokens.spacing.md }}>
                  {replyingTo === review.id ? (
                    <div>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="답글을 작성해주세요"
                        style={{
                          width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                          borderRadius: tokens.radius.md, fontSize: tokens.fontSize.sm, minHeight: 60, resize: 'vertical',
                          marginBottom: tokens.spacing.sm, boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                        <Button variant="secondary" size="sm" onClick={() => { setReplyingTo(null); setReplyText(''); }}>취소</Button>
                        <Button size="sm" onClick={() => {
                          const newReviews = reviews.map(r => r.id === review.id ? { ...r, reply: replyText } : r);
                          setReviews(newReviews);
                          setReplyingTo(null);
                          setReplyText('');
                        }}>등록</Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => setReplyingTo(review.id)}>답글 작성</Button>
                  )}
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// 정산 내역 화면
const SettlementScreen = ({ onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const settlement = {
    totalSales: 156000,
    orderCount: 40,
    luckyBagCount: 52,
    platformFee: 15600,
    paymentFee: 4680,
    settlementAmount: 135720,
    details: [
      { date: '12.05', count: 3, amount: 11700 },
      { date: '12.04', count: 5, amount: 19500 },
      { date: '12.03', count: 4, amount: 15600 },
    ]
  };

  return (
    <div>
      <Header title="정산 내역" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 월 선택 */}
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: tokens.colors.white
            }}
          >
            <option value="2024-12">2024년 12월</option>
            <option value="2024-11">2024년 11월</option>
            <option value="2024-10">2024년 10월</option>
          </select>
        </div>

        {/* 정산 요약 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ textAlign: 'center', marginBottom: tokens.spacing.xl }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>예상 정산 금액</div>
            <div style={{ fontSize: tokens.fontSize.xxxxl, fontWeight: 700, color: tokens.colors.blue500, marginTop: tokens.spacing.sm }}>
              {settlement.settlementAmount.toLocaleString()}원
            </div>
          </div>

          <div style={{ background: tokens.colors.gray50, borderRadius: tokens.radius.md, padding: tokens.spacing.lg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
              <span style={{ color: tokens.colors.gray600 }}>총 매출</span>
              <span style={{ fontWeight: 600 }}>{settlement.totalSales.toLocaleString()}원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
              <span style={{ color: tokens.colors.gray600 }}>주문 건수</span>
              <span style={{ fontWeight: 600 }}>{settlement.orderCount}건</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
              <span style={{ color: tokens.colors.gray600 }}>럭키백 판매량</span>
              <span style={{ fontWeight: 600 }}>{settlement.luckyBagCount}개</span>
            </div>
            <div style={{ borderTop: `1px solid ${tokens.colors.gray200}`, paddingTop: tokens.spacing.md, marginTop: tokens.spacing.md }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                <span style={{ color: tokens.colors.gray500, fontSize: tokens.fontSize.sm }}>플랫폼 수수료 (10%)</span>
                <span style={{ color: tokens.colors.red500, fontSize: tokens.fontSize.sm }}>-{settlement.platformFee.toLocaleString()}원</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: tokens.colors.gray500, fontSize: tokens.fontSize.sm }}>결제 수수료 (3%)</span>
                <span style={{ color: tokens.colors.red500, fontSize: tokens.fontSize.sm }}>-{settlement.paymentFee.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 일별 상세 */}
        <div style={{ marginBottom: tokens.spacing.md }}>
          <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, marginBottom: tokens.spacing.md }}>일별 상세</div>
          {settlement.details.map(detail => (
            <Card key={detail.date} style={{ marginBottom: tokens.spacing.sm, padding: tokens.spacing.lg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{detail.date}</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>{detail.count}개 판매</div>
                </div>
                <div style={{ fontWeight: 600 }}>{detail.amount.toLocaleString()}원</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 계좌 정보 화면
const AccountSettingsScreen = ({ onBack }) => {
  const [account, setAccount] = useState({
    bank: '국민은행',
    accountNumber: '123-456-789012',
    holderName: '홍길동',
  });

  return (
    <div>
      <Header title="계좌 정보" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ marginBottom: tokens.spacing.xl }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>은행</label>
            <select
              value={account.bank}
              onChange={(e) => setAccount({ ...account, bank: e.target.value })}
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: tokens.colors.white
              }}
            >
              <option>국민은행</option>
              <option>신한은행</option>
              <option>우리은행</option>
              <option>하나은행</option>
              <option>농협</option>
            </select>
          </div>

          <div style={{ marginBottom: tokens.spacing.xl }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>계좌번호</label>
            <input
              type="text"
              value={account.accountNumber}
              onChange={(e) => setAccount({ ...account, accountNumber: e.target.value })}
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>예금주</label>
            <input
              type="text"
              value={account.holderName}
              onChange={(e) => setAccount({ ...account, holderName: e.target.value })}
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, boxSizing: 'border-box'
              }}
            />
          </div>
        </Card>

        <div style={{ padding: tokens.spacing.md, background: tokens.colors.orange50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.orange500 }}>
            ⚠️ 계좌 정보 변경 시 다음 정산부터 적용돼요
          </div>
        </div>

        <Button fullWidth>저장하기</Button>
      </div>
    </div>
  );
};

// 사장님 가이드 화면
const GuideScreen = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  const guides = [
    {
      id: 1,
      category: '시작하기',
      title: '럭키백 등록하기',
      content: '1. 설정 > 럭키백 설정에서 가격과 수량을 설정해주세요.\n2. 구성품을 추가하면 고객에게 더 매력적으로 보여요.\n3. 1일 판매 수량은 취소율을 고려해 적절히 설정해주세요.'
    },
    {
      id: 2,
      category: '시작하기',
      title: '픽업 시간 설정하기',
      content: '1. 설정 > 픽업 시간 관리에서 요일별 픽업 시간을 설정해주세요.\n2. 영업 종료 1시간 전으로 설정하면 재고 관리가 편해요.\n3. 특정 날짜는 캘린더에서 개별 설정할 수 있어요.'
    },
    {
      id: 3,
      category: '주문 관리',
      title: '주문 확정하기',
      content: '주문이 들어오면 "예약" 상태로 표시돼요.\n픽업 시간 전에 "확정" 버튼을 눌러주세요.\n확정하면 고객에게 알림이 전송돼요.'
    },
    {
      id: 4,
      category: '주문 관리',
      title: '취소율 낮추기',
      content: '취소율이 높으면 노출 순위가 낮아질 수 있어요.\n\n취소율을 낮추려면:\n- 수량을 적절히 조절해주세요\n- 픽업 시간을 잘 지켜주세요\n- 재고가 부족하면 미리 "판매 종료"를 눌러주세요'
    },
    {
      id: 5,
      category: '정산',
      title: '정산은 어떻게 되나요?',
      content: '매월 1일~말일 판매 내역을 기준으로\n다음 달 10일에 정산됩니다.\n\n플랫폼 수수료: 10%\n결제 수수료: 3%'
    },
  ];

  const categories = [...new Set(guides.map(g => g.category))];

  return (
    <div>
      <Header title="사장님 가이드" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {categories.map(category => (
          <div key={category} style={{ marginBottom: tokens.spacing.xxl }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500, fontWeight: 600, marginBottom: tokens.spacing.md }}>
              {category}
            </div>
            {guides.filter(g => g.category === category).map(guide => (
              <Card key={guide.id} style={{ marginBottom: tokens.spacing.sm, padding: 0, overflow: 'hidden' }}>
                <div
                  onClick={() => setExpandedId(expandedId === guide.id ? null : guide.id)}
                  style={{
                    padding: tokens.spacing.lg,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{guide.title}</span>
                  <span style={{ color: tokens.colors.gray400, transform: expandedId === guide.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
                </div>
                {expandedId === guide.id && (
                  <div style={{ padding: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`, borderTop: `1px solid ${tokens.colors.gray100}` }}>
                    <div style={{ paddingTop: tokens.spacing.lg, fontSize: tokens.fontSize.sm, color: tokens.colors.gray700, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {guide.content}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ 화면
const FAQScreen = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  const faqs = [
    { id: 1, question: '수수료는 얼마인가요?', answer: '플랫폼 수수료 10%와 결제 수수료 3%가 적용됩니다.' },
    { id: 2, question: '정산은 언제 되나요?', answer: '매월 1~말일 판매분이 다음 달 10일에 정산됩니다. 공휴일인 경우 다음 영업일에 지급됩니다.' },
    { id: 3, question: '럭키백 가격은 어떻게 정하나요?', answer: '정가의 50% 할인가로 자동 계산됩니다. 정가는 구성품 가치를 고려해 설정해주세요.' },
    { id: 4, question: '고객이 픽업을 안 오면요?', answer: '픽업 시간 종료 후 자동으로 노쇼 처리되며, 결제 금액은 정상 정산됩니다.' },
    { id: 5, question: '취소 패널티가 있나요?', answer: '가게 사정으로 취소 시 해당 금액만큼 정산에서 차감됩니다. 취소율이 높으면 노출 순위가 낮아질 수 있어요.' },
  ];

  return (
    <div>
      <Header title="자주 묻는 질문" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {faqs.map(faq => (
          <Card key={faq.id} style={{ marginBottom: tokens.spacing.sm, padding: 0, overflow: 'hidden' }}>
            <div
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              style={{
                padding: tokens.spacing.lg,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontWeight: 500 }}>Q. {faq.question}</span>
              <span style={{ color: tokens.colors.gray400, transform: expandedId === faq.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
            </div>
            {expandedId === faq.id && (
              <div style={{ padding: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`, borderTop: `1px solid ${tokens.colors.gray100}` }}>
                <div style={{ paddingTop: tokens.spacing.lg, fontSize: tokens.fontSize.sm, color: tokens.colors.gray700, lineHeight: 1.6 }}>
                  A. {faq.answer}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// 문의하기 화면
const ContactScreen = ({ onBack }) => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <Header title="문의하기" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, marginBottom: tokens.spacing.lg }}>
            <span style={{ fontSize: 32 }}>💬</span>
            <div>
              <div style={{ fontWeight: 600 }}>카카오톡 문의</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray500 }}>평일 10:00 - 18:00</div>
            </div>
          </div>
          <Button fullWidth variant="secondary">카카오톡으로 문의하기</Button>
        </Card>

        <Card>
          <div style={{ marginBottom: tokens.spacing.lg }}>
            <label style={{ fontSize: tokens.fontSize.sm, color: tokens.colors.gray600, display: 'block', marginBottom: tokens.spacing.sm }}>
              문의 내용
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의하실 내용을 작성해주세요"
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${tokens.colors.gray200}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, minHeight: 120, resize: 'vertical', boxSizing: 'border-box'
              }}
            />
          </div>
          <Button fullWidth disabled={!message}>이메일로 문의하기</Button>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// 메인 앱 컴포넌트
// ============================================
export default function LuckyMealSellerApp() {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [activeTab, setActiveTab] = useState('home');
  const [shopData, setShopData] = useState({
    isClosed: false,
    todayQuantity: 5,
    reservedCount: 2,
    confirmedCount: 1,
    completedCount: 3,
  });

  const navigate = (screen) => {
    if (['home', 'orders', 'settings'].includes(screen)) {
      setActiveTab(screen);
      setCurrentScreen('main');
    } else {
      setCurrentScreen(screen);
    }
  };

  const goBack = () => setCurrentScreen('main');

  // 상세 화면 라우팅
  const renderScreen = () => {
    switch (currentScreen) {
      case 'shop-info': return <ShopInfoScreen onBack={goBack} />;
      case 'luckybag-settings': return <LuckyBagSettingsScreen onBack={goBack} />;
      case 'pickup-settings': return <PickupSettingsScreen onBack={goBack} />;
      case 'notification-settings': return <NotificationSettingsScreen onBack={goBack} />;
      case 'blocked-users': return <BlockedUsersScreen onBack={goBack} />;
      case 'reviews': return <ReviewsScreen onBack={goBack} />;
      case 'settlement': return <SettlementScreen onBack={goBack} />;
      case 'account-settings': return <AccountSettingsScreen onBack={goBack} />;
      case 'guide': return <GuideScreen onBack={goBack} />;
      case 'faq': return <FAQScreen onBack={goBack} />;
      case 'contact': return <ContactScreen onBack={goBack} />;
      default: return null;
    }
  };

  if (currentScreen !== 'main') {
    return (
      <div style={{ maxWidth: 390, margin: '0 auto', background: tokens.colors.gray50, minHeight: '100vh' }}>
        {renderScreen()}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 390, margin: '0 auto', background: tokens.colors.gray50, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <Header
        title={activeTab === 'home' ? '행복한 빵집' : activeTab === 'orders' ? '주문 관리' : '설정'}
        right={activeTab === 'home' && <Badge variant="success">영업중</Badge>}
      />
      
      {/* 메인 콘텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'home' && <HomeScreen onNavigate={navigate} shopData={shopData} setShopData={setShopData} />}
        {activeTab === 'orders' && <OrdersScreen onNavigate={navigate} />}
        {activeTab === 'settings' && <SettingsScreen onNavigate={navigate} />}
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
