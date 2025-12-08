import React, { useState, createContext, useContext, useEffect } from 'react';

// ============================================
// 테마 컨텍스트 (다크모드/라이트모드)
// ============================================
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const lightColors = {
  bg: '#F9FAFB', bgCard: '#FFFFFF', bgElevated: '#FFFFFF',
  gray50: '#F9FAFB', gray100: '#F2F4F6', gray200: '#E5E8EB',
  gray300: '#D1D6DB', gray400: '#B0B8C1', gray500: '#8B95A1',
  gray600: '#6B7684', gray700: '#4E5968', gray800: '#333D4B', gray900: '#191F28',
  blue50: '#E8F3FF', blue100: '#C9E2FF', blue500: '#3182F6', blue600: '#1B64DA',
  green50: '#E8FAF0', green100: '#B1F1CC', green500: '#16CC83', green600: '#0AB26F',
  red50: '#FFEBEE', red100: '#FFCDD2', red500: '#F44336', red600: '#E53935',
  orange50: '#FFF3E0', orange100: '#FFE0B2', orange500: '#FF9800',
  white: '#FFFFFF', text: '#191F28', textSecondary: '#6B7684', textTertiary: '#8B95A1',
  border: '#E5E8EB', shadow: 'rgba(0,0,0,0.08)', overlay: 'rgba(0,0,0,0.4)',
};

const darkColors = {
  bg: '#17171C', bgCard: '#1E1E24', bgElevated: '#2C2C35',
  gray50: '#2C2C35', gray100: '#3D3D47', gray200: '#4E4E59',
  gray300: '#6B6B78', gray400: '#8B8B98', gray500: '#A8A8B3',
  gray600: '#C5C5CD', gray700: '#DCDCE3', gray800: '#ECECF1', gray900: '#F9F9FB',
  blue50: '#1A2744', blue100: '#1E3A5F', blue500: '#4B96FF', blue600: '#6EADFF',
  green50: '#1A3328', green100: '#1E4D35', green500: '#4ADE80', green600: '#6EE7A0',
  red50: '#3D1A1A', red100: '#5C2626', red500: '#FF6B6B', red600: '#FF8A8A',
  orange50: '#3D2E1A', orange100: '#5C4326', orange500: '#FFB347', orange600: '#FFC56B',
  white: '#1E1E24', text: '#F9F9FB', textSecondary: '#C5C5CD', textTertiary: '#A8A8B3',
  border: '#3D3D47', shadow: 'rgba(0,0,0,0.3)', overlay: 'rgba(0,0,0,0.6)',
};

const tokens = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 },
  fontSize: { xs: 11, sm: 12, md: 14, lg: 16, xl: 18, xxl: 20, xxxl: 24, xxxxl: 28 },
};

// 카테고리 목록 (백엔드 기반)
const FOOD_CATEGORIES = [
  { id: 1, name: '베이커리', emoji: '🥐' },
  { id: 2, name: '피자', emoji: '🍕' },
  { id: 3, name: '한식', emoji: '🍚' },
  { id: 4, name: '양식', emoji: '🍝' },
  { id: 5, name: '일식', emoji: '🍣' },
  { id: 6, name: '중식', emoji: '🥟' },
  { id: 7, name: '분식', emoji: '🍜' },
  { id: 8, name: '치킨', emoji: '🍗' },
  { id: 9, name: '카페/디저트', emoji: '🍰' },
  { id: 10, name: '샐러드', emoji: '🥗' },
  { id: 11, name: '샌드위치', emoji: '🥪' },
  { id: 12, name: '도시락', emoji: '🍱' },
];

// ============================================
// 공통 컴포넌트
// ============================================
const Card = ({ children, style, onClick }) => {
  const { colors } = useTheme();
  return (
    <div onClick={onClick} style={{
      background: colors.bgCard, borderRadius: tokens.radius.lg, padding: tokens.spacing.xl,
      boxShadow: `0 1px 3px ${colors.shadow}`, cursor: onClick ? 'pointer' : 'default',
      transition: 'background 0.2s', ...style
    }}>{children}</div>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const { colors } = useTheme();
  const variants = {
    default: { bg: colors.gray100, color: colors.gray700 },
    primary: { bg: colors.blue50, color: colors.blue600 },
    success: { bg: colors.green50, color: colors.green600 },
    warning: { bg: colors.orange50, color: colors.orange500 },
    danger: { bg: colors.red50, color: colors.red600 },
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
  const { colors } = useTheme();
  const variants = {
    primary: { bg: colors.blue500, color: '#FFFFFF' },
    secondary: { bg: colors.gray100, color: colors.text },
    ghost: { bg: 'transparent', color: colors.blue500 },
    danger: { bg: colors.red500, color: '#FFFFFF' },
    success: { bg: colors.green500, color: '#FFFFFF' },
  };
  const sizes = { sm: { padding: '8px 12px', fontSize: 13 }, md: { padding: '12px 16px', fontSize: 15 }, lg: { padding: '16px 20px', fontSize: 16 } };
  const v = variants[variant]; const s = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? colors.gray200 : v.bg, color: disabled ? colors.gray400 : v.color,
      border: 'none', borderRadius: tokens.radius.md, padding: s.padding, fontSize: s.fontSize,
      fontWeight: 600, width: fullWidth ? '100%' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s', ...style,
    }}>{children}</button>
  );
};

const Toggle = ({ checked, onChange, label }) => {
  const { colors } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {label && <span style={{ fontSize: tokens.fontSize.md, color: colors.text }}>{label}</span>}
      <div onClick={() => onChange(!checked)} style={{
        width: 52, height: 32, borderRadius: 16, padding: 2, cursor: 'pointer',
        background: checked ? colors.green500 : colors.gray300, transition: 'background 0.2s',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 14, background: '#FFFFFF',
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
          transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        }} />
      </div>
    </div>
  );
};

const Header = ({ title, onBack, right }) => {
  const { colors } = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: tokens.spacing.lg, background: colors.bgCard,
      borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        {onBack && <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 4, color: colors.text }}>←</button>}
        <span style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.text }}>{title}</span>
      </div>
      {right}
    </div>
  );
};

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  const { colors } = useTheme();
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: colors.overlay }} />
      <div style={{
        position: 'absolute', bottom: 0, width: '100%', maxWidth: 480,
        background: colors.bgElevated, borderRadius: `${tokens.radius.xl}px ${tokens.radius.xl}px 0 0`,
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: tokens.spacing.lg, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ width: 40, height: 4, background: colors.gray300, borderRadius: 2, margin: '0 auto 12px' }} />
          <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.text }}>{title}</div>
        </div>
        <div style={{ padding: tokens.spacing.xl, overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onChange }) => {
  const { colors } = useTheme();
  const tabs = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'orders', label: '주문', icon: '📋' },
    { id: 'settings', label: '설정', icon: '⚙️' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', padding: `${tokens.spacing.md}px 0`,
      paddingBottom: `calc(${tokens.spacing.md}px + env(safe-area-inset-bottom, 0px))`,
      background: colors.bgCard, borderTop: `1px solid ${colors.border}`,
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 480, zIndex: 100,
    }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: activeTab === tab.id ? colors.green50 : 'none',
          border: 'none', cursor: 'pointer', padding: `${tokens.spacing.sm}px ${tokens.spacing.xl}px`,
          borderRadius: tokens.radius.md,
          color: activeTab === tab.id ? colors.green600 : colors.textTertiary,
        }}>
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontSize: tokens.fontSize.xs, fontWeight: activeTab === tab.id ? 700 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// 플로팅 챗봇 버튼
const FloatingChatButton = () => {
  const { colors } = useTheme();
  return (
    <a
      href="http://pf.kakao.com/_xiJxmxdG/chat"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 80,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        background: '#FEE500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 99,
        textDecoration: 'none',
      }}
    >
      <span style={{ fontSize: 28 }}>💬</span>
    </a>
  );
};

const EmptyState = ({ icon, title, description }) => {
  const { colors } = useTheme();
  return (
    <div style={{ textAlign: 'center', padding: `${tokens.spacing.xxxl}px ${tokens.spacing.xl}px` }}>
      <div style={{ fontSize: 48, marginBottom: tokens.spacing.lg }}>{icon}</div>
      <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.sm }}>{title}</div>
      <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary }}>{description}</div>
    </div>
  );
};

// 셀렉트 컴포넌트
const Select = ({ value, onChange, options, placeholder }) => {
  const { colors } = useTheme();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: tokens.spacing.md,
        border: `1px solid ${colors.border}`,
        borderRadius: tokens.radius.md,
        fontSize: tokens.fontSize.md,
        background: colors.bgCard,
        color: value ? colors.text : colors.textTertiary,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

// ============================================
// 상수
// ============================================
const ORDER_STATUS = { PAID: 'PAID', CONFIRMED: 'CONFIRMED', USER_CANCEL: 'USER_CANCEL', PLACE_CANCEL: 'PLACE_CANCEL' };
const PLACE_ROLE_GRADE = { ADMIN: 0, MANAGER: 1, STAFF: 2 };
const DISCOUNT_RATE = 0.5;
const PLATFORM_FEE = 0.098;
const PAYMENT_FEE = 0.03;
const CO2_PER_BAG = 2.5;

// ============================================
// 홈 화면
// ============================================
const HomeScreen = ({ onNavigate, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);

  const totalStats = {
    co2Saved: shopData.totalSold * CO2_PER_BAG,
    totalSold: shopData.totalSold,
    totalRevenue: shopData.totalRevenue,
  };

  const stats = [
    { label: '예약', value: shopData.paidCount, color: colors.orange500 },
    { label: '확정', value: shopData.confirmedCount, color: colors.blue500 },
    { label: '픽업완료', value: shopData.pickedUpCount, color: colors.green500 },
  ];

  return (
    <div>
      {/* 당근앱 스타일 환경 기여 카드들 */}
      <div style={{ padding: tokens.spacing.lg, paddingBottom: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: tokens.spacing.sm }}>
          <div style={{ background: colors.bgCard, borderRadius: 20, padding: tokens.spacing.lg, textAlign: 'center', boxShadow: `0 2px 8px ${colors.shadow}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, margin: '0 auto', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: tokens.spacing.sm }}>
              <span style={{ fontSize: 20 }}>🌿</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
              {totalStats.co2Saved.toFixed(0)}<span style={{ fontSize: tokens.fontSize.xs, fontWeight: 500, color: colors.textTertiary }}>kg</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 2 }}>CO₂ 절감</div>
          </div>
          <div style={{ background: colors.bgCard, borderRadius: 20, padding: tokens.spacing.lg, textAlign: 'center', boxShadow: `0 2px 8px ${colors.shadow}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, margin: '0 auto', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: tokens.spacing.sm }}>
              <span style={{ fontSize: 20 }}>🎁</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
              {totalStats.totalSold}<span style={{ fontSize: tokens.fontSize.xs, fontWeight: 500, color: colors.textTertiary }}>개</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 2 }}>럭키백 판매</div>
          </div>
          <div style={{ background: colors.bgCard, borderRadius: 20, padding: tokens.spacing.lg, textAlign: 'center', boxShadow: `0 2px 8px ${colors.shadow}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, margin: '0 auto', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: tokens.spacing.sm }}>
              <span style={{ fontSize: 20 }}>💰</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
              {(totalStats.totalRevenue / 10000).toFixed(0)}<span style={{ fontSize: tokens.fontSize.xs, fontWeight: 500, color: colors.textTertiary }}>만원</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 2 }}>누적 매출</div>
          </div>
        </div>
      </div>

      <Card style={{ margin: `${tokens.spacing.lg}px ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.lg }}>
          <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>오늘 현황</span>
          <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>
            {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.lg, background: colors.gray50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.lg }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.xxxxl, fontWeight: 700, color: colors.green500 }}>{shopData.dailySalesCount - shopData.soldCount}</div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>남은 수량</div>
          </div>
          <div style={{ width: 1, height: 40, background: colors.gray200 }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.xxxxl, fontWeight: 700, color: colors.gray400 }}>{shopData.dailySalesCount}</div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>전체 수량</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Toggle checked={shopData.isSoldOut} onChange={(v) => setShopData({ ...shopData, isSoldOut: v })} label="오늘 판매 종료" />
      </Card>

      {shopData.paidCount > 0 && (
        <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`, background: colors.blue50, border: `1px solid ${colors.blue100}` }} onClick={() => onNavigate('orders')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.blue600 }}>확정 대기 주문 {shopData.paidCount}건</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.blue500, marginTop: 4 }}>픽업 시간 전에 확정해 주세요</div>
            </div>
            <span style={{ color: colors.blue500 }}>›</span>
          </div>
        </Card>
      )}

      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }} onClick={() => setShowQuantitySheet(true)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>오늘의 럭키백 수량</div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: 4 }}>{shopData.dailySalesCount}개</div>
          </div>
          <Button variant="secondary" size="sm">변경</Button>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md, margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Card onClick={() => onNavigate('luckybag-settings')} style={{ textAlign: 'center', padding: tokens.spacing.lg }}>
          <div style={{ fontSize: 24, marginBottom: tokens.spacing.sm }}>🎁</div>
          <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: colors.text }}>럭키백 설정</div>
        </Card>
        <Card onClick={() => onNavigate('pickup-settings')} style={{ textAlign: 'center', padding: tokens.spacing.lg }}>
          <div style={{ fontSize: 24, marginBottom: tokens.spacing.sm }}>📅</div>
          <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: colors.text }}>픽업 시간</div>
        </Card>
      </div>

      <BottomSheet isOpen={showQuantitySheet} onClose={() => setShowQuantitySheet(false)} title="럭키백 수량 변경">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: tokens.spacing.lg, background: colors.gray50, borderRadius: tokens.radius.md }}>
            <button onClick={() => setShopData({ ...shopData, dailySalesCount: Math.max(1, shopData.dailySalesCount - 1) })}
              style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}>-</button>
            <span style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text }}>{shopData.dailySalesCount}</span>
            <button onClick={() => setShopData({ ...shopData, dailySalesCount: shopData.dailySalesCount + 1 })}
              style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}>+</button>
          </div>
        </div>
        <Button fullWidth onClick={() => setShowQuantitySheet(false)}>저장하기</Button>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 주문 관리 화면
// ============================================
const OrdersScreen = ({ onNavigate }) => {
  const { colors } = useTheme();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const todayOrders = [
    { id: 1, code: '맑은하늘', orderUid: 'ORD-2024120801', name: '김**', mannerScore: 85, luckyBagCount: 2, discountPrice: 3900, pickupStartTime: '14:00', pickupEndTime: '15:00', status: ORDER_STATUS.PAID, isPickupChecked: false },
    { id: 2, code: '좋은아침', orderUid: 'ORD-2024120802', name: '이**', mannerScore: 92, luckyBagCount: 1, discountPrice: 3900, pickupStartTime: '14:00', pickupEndTime: '15:00', status: ORDER_STATUS.PAID, isPickupChecked: false },
    { id: 3, code: '행복가득', orderUid: 'ORD-2024120803', name: '박**', mannerScore: 78, luckyBagCount: 1, discountPrice: 3900, pickupStartTime: '15:00', pickupEndTime: '16:00', status: ORDER_STATUS.CONFIRMED, isPickupChecked: false },
    { id: 4, code: '따뜻한빵', orderUid: 'ORD-2024120804', name: '최**', mannerScore: 88, luckyBagCount: 2, discountPrice: 7800, pickupStartTime: '12:00', pickupEndTime: '13:00', status: ORDER_STATUS.CONFIRMED, isPickupChecked: true },
  ];

  const getStatusBadge = (order) => {
    if (order.isPickupChecked) return <Badge variant="success">픽업완료</Badge>;
    if (order.status === ORDER_STATUS.CONFIRMED) return <Badge variant="primary">확정</Badge>;
    if (order.status === ORDER_STATUS.PAID) return <Badge variant="warning">예약</Badge>;
    return null;
  };

  const getMannerColor = (score) => {
    if (score >= 90) return colors.green500;
    if (score >= 70) return colors.blue500;
    return colors.orange500;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: tokens.spacing.lg, background: colors.bgCard, borderBottom: `1px solid ${colors.border}` }}>
        <span style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.text }}>오늘 주문</span>
        <button onClick={() => onNavigate('sales-history')} style={{ background: 'none', border: 'none', color: colors.green500, fontSize: tokens.fontSize.md, fontWeight: 500, cursor: 'pointer' }}>
          판매 내역 보기 ›
        </button>
      </div>

      {todayOrders.length === 0 ? (
        <EmptyState icon="📋" title="오늘 주문이 없어요" description="새로운 예약이 들어오면 알려드릴게요" />
      ) : (
        <div style={{ padding: tokens.spacing.lg }}>
          {todayOrders.map(order => (
            <Card key={order.id} style={{ marginBottom: tokens.spacing.md, padding: 0, overflow: 'hidden' }}>
              <div onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} style={{ padding: tokens.spacing.xl, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.md }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                    <span style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.green500 }}>{order.code}</span>
                    {getStatusBadge(order)}
                  </div>
                  <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{order.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>럭키백 {order.luckyBagCount}개</div>
                    <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text, marginTop: 2 }}>{order.discountPrice.toLocaleString()}원</div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                    <div>
                      <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>픽업</div>
                      <div style={{ fontSize: tokens.fontSize.md, fontWeight: 500, color: colors.text }}>{order.pickupStartTime} - {order.pickupEndTime}</div>
                    </div>
                    <span style={{ color: colors.gray400, transform: expandedOrder === order.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
                  </div>
                </div>
              </div>
              {expandedOrder === order.id && (
                <div style={{ padding: `0 ${tokens.spacing.xl}px ${tokens.spacing.xl}px`, borderTop: `1px solid ${colors.border}`, background: colors.gray50 }}>
                  <div style={{ padding: `${tokens.spacing.lg}px 0` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                      <span style={{ color: colors.textTertiary }}>주문번호</span>
                      <span style={{ color: colors.text, fontSize: tokens.fontSize.sm }}>{order.orderUid}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                      <span style={{ color: colors.textTertiary }}>고객</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                        <span style={{ color: colors.text }}>{order.name}</span>
                        <span style={{ fontSize: tokens.fontSize.xs, fontWeight: 600, color: getMannerColor(order.mannerScore), background: colors.gray100, padding: '2px 6px', borderRadius: 4 }}>
                          매너 {order.mannerScore}
                        </span>
                      </div>
                    </div>
                  </div>
                  {order.isPickupChecked ? null : order.status === ORDER_STATUS.CONFIRMED ? (
                    <Button fullWidth variant="success">픽업 완료</Button>
                  ) : (
                    <div style={{ display: 'flex', gap: tokens.spacing.md }}>
                      <Button variant="secondary" fullWidth>취소</Button>
                      <Button fullWidth>주문 확정</Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// 판매 내역 화면
// ============================================
const SalesHistoryScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const [hideCanceled, setHideCanceled] = useState(false);

  const salesHistory = [
    { date: '2024-12-07', orders: [
      { id: 101, code: '푸른바다', name: '김**', luckyBagCount: 2, discountPrice: 7800, status: 'completed' },
      { id: 102, code: '하얀구름', name: '이**', luckyBagCount: 1, discountPrice: 3900, status: 'completed' },
      { id: 107, code: '시원바람', name: '한**', luckyBagCount: 1, discountPrice: 3900, status: ORDER_STATUS.USER_CANCEL },
    ]},
    { date: '2024-12-06', orders: [
      { id: 103, code: '달콤케익', name: '박**', luckyBagCount: 3, discountPrice: 11700, status: 'completed' },
      { id: 104, code: '싱싱과일', name: '최**', luckyBagCount: 1, discountPrice: 3900, status: 'completed' },
      { id: 108, code: '밝은햇살', name: '조**', luckyBagCount: 2, discountPrice: 7800, status: ORDER_STATUS.PLACE_CANCEL },
    ]},
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
  };

  const getStatusBadge = (status) => {
    if (status === ORDER_STATUS.USER_CANCEL) return <Badge variant="danger">고객취소</Badge>;
    if (status === ORDER_STATUS.PLACE_CANCEL) return <Badge variant="danger">가게취소</Badge>;
    return <Badge variant="success">완료</Badge>;
  };

  return (
    <div>
      <Header title="판매 내역" onBack={onBack} right={
        <button onClick={() => setHideCanceled(!hideCanceled)} style={{
          background: hideCanceled ? colors.green500 : colors.gray100,
          color: hideCanceled ? '#FFFFFF' : colors.textSecondary,
          border: 'none', borderRadius: tokens.radius.sm, padding: '6px 10px',
          fontSize: tokens.fontSize.sm, cursor: 'pointer', fontWeight: 500,
        }}>
          취소 건 제외
        </button>
      } />
      <div style={{ padding: tokens.spacing.lg }}>
        {salesHistory.map((day, idx) => {
          const filteredOrders = hideCanceled ? day.orders.filter(o => o.status === 'completed') : day.orders;
          if (filteredOrders.length === 0) return null;
          return (
            <div key={idx} style={{ marginBottom: tokens.spacing.xl }}>
              <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>
                {formatDate(day.date)} · {filteredOrders.length}건
              </div>
              {filteredOrders.map(order => (
                <Card key={order.id} style={{ marginBottom: tokens.spacing.sm, padding: tokens.spacing.lg }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                      <span style={{ fontWeight: 600, color: colors.green500 }}>{order.code}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, color: order.status !== 'completed' ? colors.textTertiary : colors.text, textDecoration: order.status !== 'completed' ? 'line-through' : 'none' }}>
                        {order.discountPrice.toLocaleString()}원
                      </div>
                      <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>럭키백 {order.luckyBagCount}개</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// 설정 화면
// ============================================
const SettingsScreen = ({ onNavigate, shopData }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  const menuGroups = [
    { title: '판매 설정', items: [
      { icon: '🎁', title: '럭키백 설정', subtitle: '가격, 구성, 메시지', screen: 'luckybag-settings' },
      { icon: '📅', title: '픽업 시간', subtitle: '요일별 시간 및 휴무 설정', screen: 'pickup-settings' },
    ]},
    { title: '가게 관리', items: [
      { icon: '🏪', title: '가게 정보', subtitle: '기본 정보, 사진, 카테고리', screen: 'shop-info' },
      { icon: '👀', title: '내 가게 미리보기', subtitle: '소비자 화면에서 보이는 모습', screen: 'shop-preview' },
      { icon: '👥', title: '직원 관리', subtitle: '직원 초대 및 권한', screen: 'employees' },
    ]},
    { title: '매출 관리', items: [
      { icon: '💰', title: '정산 내역', subtitle: '익월 첫 영업일 정산', screen: 'settlement' },
      { icon: '🏦', title: '정산 정보 설정', subtitle: '계좌, 사업자 정보', screen: 'settlement-info' },
      { icon: '⭐', title: '리뷰 관리', subtitle: '고객 리뷰 확인 및 답글', screen: 'reviews' },
    ]},
    { title: '고객센터', items: [
      { icon: '📖', title: '사장님 가이드', subtitle: '앱 사용법 안내', screen: 'guide' },
      { icon: '💬', title: '문의하기', subtitle: '1:1 문의', screen: 'contact' },
    ]},
  ];

  return (
    <div>
      <div style={{ padding: `${tokens.spacing.lg}px ${tokens.spacing.lg}px 0` }}>
        <button onClick={() => window.open('https://www.luckymeal.io', '_blank')} style={{
          width: '100%', padding: tokens.spacing.lg, background: colors.gray100,
          border: 'none', borderRadius: tokens.radius.lg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.sm, cursor: 'pointer',
        }}>
          <span style={{ fontSize: 18 }}>📱</span>
          <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>소비자 앱으로 전환하기</span>
          <span style={{ color: colors.textTertiary }}>→</span>
        </button>
      </div>

      <Card style={{ margin: tokens.spacing.lg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.lg }}>
          <div style={{ width: 56, height: 56, borderRadius: tokens.radius.md, background: colors.green500, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏪</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.text }}>{shopData.shopName}</div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{shopData.category}</div>
          </div>
          <Badge variant="success">운영중</Badge>
        </div>
      </Card>

      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <span style={{ fontSize: 20 }}>{isDark ? '🌙' : '☀️'}</span>
            <span style={{ fontSize: tokens.fontSize.md, color: colors.text }}>다크 모드</span>
          </div>
          <Toggle checked={isDark} onChange={toggleTheme} />
        </div>
      </Card>

      {menuGroups.map((group, idx) => (
        <div key={idx} style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ padding: `0 ${tokens.spacing.lg}px`, marginBottom: tokens.spacing.sm }}>
            <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary }}>{group.title}</span>
          </div>
          <Card style={{ margin: `0 ${tokens.spacing.lg}px`, padding: `0 ${tokens.spacing.lg}px` }}>
            {group.items.map((item, i) => (
              <div key={i} onClick={() => onNavigate(item.screen)} style={{
                display: 'flex', alignItems: 'center', padding: `${tokens.spacing.lg}px 0`,
                borderBottom: i < group.items.length - 1 ? `1px solid ${colors.border}` : 'none', cursor: 'pointer',
              }}>
                <div style={{ marginRight: tokens.spacing.md, fontSize: 20 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.fontSize.md, color: colors.text, fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{item.subtitle}</div>
                </div>
                <div style={{ color: colors.gray400 }}>›</div>
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
};

// ============================================
// 럭키백 설정 - 확장된 버전
// ============================================
const LuckyBagSettingsScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [editingPrice, setEditingPrice] = useState(false);
  const [tempPriceStr, setTempPriceStr] = useState(String(shopData.originalPrice));
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const salePrice = Math.round(shopData.originalPrice * (1 - DISCOUNT_RATE));
  const netAmount = Math.round(salePrice * (1 - PLATFORM_FEE - PAYMENT_FEE));

  const handlePriceSave = () => {
    const numPrice = parseInt(tempPriceStr.replace(/[^0-9]/g, ''), 10) || 1000;
    const validPrice = Math.max(1000, numPrice);
    setShopData({ ...shopData, originalPrice: validPrice, luckyBagPrice: Math.round(validPrice * 0.5) });
    setEditingPrice(false);
  };

  const updateField = (field, value) => {
    setShopData({ ...shopData, [field]: value });
  };

  return (
    <div>
      <Header title="럭키백 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 음식 카테고리 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>음식 카테고리 *</div>
          <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>럭키백에 담기는 음식은 주로 어떤 종류인가요?</div>
          <div onClick={() => setShowCategorySheet(true)} style={{
            padding: tokens.spacing.md, border: `1px solid ${colors.border}`, borderRadius: tokens.radius.md,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
          }}>
            <span style={{ color: shopData.foodCategory ? colors.text : colors.textTertiary }}>
              {shopData.foodCategory ? FOOD_CATEGORIES.find(c => c.id === shopData.foodCategory)?.emoji + ' ' + FOOD_CATEGORIES.find(c => c.id === shopData.foodCategory)?.name : '선택 전'}
            </span>
            <span style={{ color: colors.gray400 }}>▼</span>
          </div>
        </Card>

        {/* 럭키백 주요메뉴 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>럭키백 주요메뉴 (최소 1개) *</div>
          <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>우리 가게의 주요 메뉴 3가지를 적어주세요<br />Ex. 휘낭시에, 샌드위치, 도시락</div>
          {[0, 1, 2].map(idx => (
            <input
              key={idx}
              type="text"
              value={shopData.mainMenus?.[idx] || ''}
              onChange={(e) => {
                const newMenus = [...(shopData.mainMenus || ['', '', ''])];
                newMenus[idx] = e.target.value;
                updateField('mainMenus', newMenus);
              }}
              placeholder="입력완료"
              style={{
                width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
                borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
                color: colors.text, marginBottom: tokens.spacing.sm, outline: 'none',
              }}
            />
          ))}
        </Card>

        {/* 럭키백 설명 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>럭키백 설명 *</div>
          <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>내 가게 자랑 혹은 럭키백에 담길 상품들 예시를 써주세요!</div>
          <textarea
            value={shopData.luckyBagDescription || ''}
            onChange={(e) => updateField('luckyBagDescription', e.target.value)}
            placeholder="입력완료"
            style={{
              width: '100%', minHeight: 100, padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
              color: colors.text, resize: 'none', outline: 'none',
            }}
          />
        </Card>

        {/* 가격 설정 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>럭키백 정가</div>
          {editingPrice ? (
            <div>
              <div style={{ position: 'relative', marginBottom: tokens.spacing.md }}>
                <input type="text" inputMode="numeric" value={tempPriceStr}
                  onChange={(e) => setTempPriceStr(e.target.value.replace(/[^0-9]/g, ''))} autoFocus
                  style={{
                    width: '100%', padding: `${tokens.spacing.lg}px ${tokens.spacing.md}px`, paddingRight: 40,
                    fontSize: tokens.fontSize.xxl, fontWeight: 700, border: `2px solid ${colors.green500}`,
                    borderRadius: tokens.radius.md, background: colors.bgCard, color: colors.text, textAlign: 'center', outline: 'none',
                  }}
                />
                <span style={{ position: 'absolute', right: tokens.spacing.lg, top: '50%', transform: 'translateY(-50%)', fontSize: tokens.fontSize.lg, color: colors.textTertiary }}>원</span>
              </div>
              <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                <Button size="sm" onClick={handlePriceSave}>저장</Button>
                <Button size="sm" variant="secondary" onClick={() => { setTempPriceStr(String(shopData.originalPrice)); setEditingPrice(false); }}>취소</Button>
              </div>
            </div>
          ) : (
            <div onClick={() => { setTempPriceStr(String(shopData.originalPrice)); setEditingPrice(true); }} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>{shopData.originalPrice.toLocaleString()}원</div>
              <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
            </div>
          )}
          <div style={{ marginTop: tokens.spacing.lg, padding: tokens.spacing.md, background: colors.gray50, borderRadius: tokens.radius.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
              <span style={{ color: colors.textTertiary }}>판매가</span>
              <span style={{ fontWeight: 600, color: colors.blue500 }}>{salePrice.toLocaleString()}원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: tokens.spacing.sm, borderTop: `1px solid ${colors.gray200}` }}>
              <span style={{ color: colors.textTertiary }}>실수령액</span>
              <span style={{ fontWeight: 700, color: colors.green600 }}>{netAmount.toLocaleString()}원</span>
            </div>
          </div>
          <div style={{ marginTop: tokens.spacing.md, fontSize: tokens.fontSize.xs, color: colors.textTertiary }}>* 플랫폼 수수료 9.8% + 결제 수수료 3% 공제</div>
        </Card>

        {/* 구매 갯수 제한 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>럭키백 구매 갯수 제한</div>
          <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>1인당 최대 1개로 제한할까요?<br />(주문 갯수가 줄어, 재고 소진이 줄어들 수 있어요)</div>
          <Select
            value={shopData.purchaseLimit || ''}
            onChange={(v) => updateField('purchaseLimit', v)}
            options={[
              { value: '1', label: '1개까지' },
              { value: '2', label: '2개까지' },
              { value: '3', label: '3개까지' },
              { value: 'unlimited', label: '제한 없음' },
            ]}
            placeholder="선택 전"
          />
        </Card>

        {/* 확정/취소 메시지 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>확정 메시지</div>
          <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>럭키백이 확정됐을 때 고객에게 보내는 메시지</div>
          <textarea
            value={shopData.confirmMessage || ''}
            onChange={(e) => updateField('confirmMessage', e.target.value)}
            placeholder="예) 맛있는 럭키백 준비 중이에요! 픽업 시간에 방문해주세요."
            style={{
              width: '100%', minHeight: 60, padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
              color: colors.text, resize: 'none', outline: 'none',
            }}
          />
        </Card>

        <Card>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>취소 메시지</div>
          <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>럭키백이 취소됐을 때 고객에게 보내는 메시지</div>
          <textarea
            value={shopData.cancelMessage || ''}
            onChange={(e) => updateField('cancelMessage', e.target.value)}
            placeholder="예) 죄송합니다. 오늘은 재료 소진으로 럭키백 준비가 어렵습니다."
            style={{
              width: '100%', minHeight: 60, padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
              color: colors.text, resize: 'none', outline: 'none',
            }}
          />
        </Card>

        {/* 하단 저장 버튼 */}
        <div style={{ position: 'sticky', bottom: 0, padding: `${tokens.spacing.lg}px 0`, background: colors.bg }}>
          <div style={{ display: 'flex', gap: tokens.spacing.md }}>
            <Button variant="secondary" fullWidth onClick={onBack}>뒤로가기</Button>
            <Button fullWidth onClick={onBack}>저장하기</Button>
          </div>
        </div>
      </div>

      {/* 카테고리 선택 시트 */}
      <BottomSheet isOpen={showCategorySheet} onClose={() => setShowCategorySheet(false)} title="음식 카테고리 선택">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.sm }}>
          {FOOD_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => { updateField('foodCategory', cat.id); setShowCategorySheet(false); }}
              style={{
                padding: tokens.spacing.lg, border: `2px solid ${shopData.foodCategory === cat.id ? colors.green500 : colors.border}`,
                borderRadius: tokens.radius.md, background: shopData.foodCategory === cat.id ? colors.green50 : colors.bgCard,
                cursor: 'pointer', textAlign: 'center',
              }}>
              <div style={{ fontSize: 24, marginBottom: tokens.spacing.xs }}>{cat.emoji}</div>
              <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: shopData.foodCategory === cat.id ? colors.green600 : colors.text }}>{cat.name}</div>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 픽업 시간 설정 - 토스/당근 스타일
// ============================================
const PickupSettingsScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showTimeSheet, setShowTimeSheet] = useState(null);
  const [showHolidaySheet, setShowHolidaySheet] = useState(false);
  const [holidayStartDate, setHolidayStartDate] = useState('');
  const [holidayEndDate, setHolidayEndDate] = useState('');
  const [holidayReason, setHolidayReason] = useState('');

  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      timeOptions.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  const [pickupDays, setPickupDays] = useState([
    { day: '월', isOpen: true, startTime: '14:00', endTime: '15:00' },
    { day: '화', isOpen: true, startTime: '14:00', endTime: '15:00' },
    { day: '수', isOpen: true, startTime: '14:00', endTime: '15:00' },
    { day: '목', isOpen: true, startTime: '14:00', endTime: '15:00' },
    { day: '금', isOpen: true, startTime: '14:00', endTime: '15:00' },
    { day: '토', isOpen: true, startTime: '20:00', endTime: '21:00' },
    { day: '일', isOpen: false, startTime: '', endTime: '' },
  ]);

  const [specialHolidays, setSpecialHolidays] = useState([
    { startDate: '2024-12-25', endDate: '2024-12-25', reason: '크리스마스' },
    { startDate: '2025-01-01', endDate: '2025-01-02', reason: '신정 연휴' },
  ]);

  const toggleDay = (dayIdx) => {
    const newDays = [...pickupDays];
    newDays[dayIdx].isOpen = !newDays[dayIdx].isOpen;
    if (newDays[dayIdx].isOpen && !newDays[dayIdx].startTime) {
      newDays[dayIdx].startTime = '14:00';
      newDays[dayIdx].endTime = '15:00';
    }
    setPickupDays(newDays);
  };

  const updateTime = (dayIdx, field, value) => {
    const newDays = [...pickupDays];
    newDays[dayIdx][field] = value;
    setPickupDays(newDays);
  };

  const addHoliday = () => {
    if (holidayStartDate) {
      setSpecialHolidays([...specialHolidays, {
        startDate: holidayStartDate,
        endDate: holidayEndDate || holidayStartDate,
        reason: holidayReason || '휴무'
      }]);
      setHolidayStartDate('');
      setHolidayEndDate('');
      setHolidayReason('');
      setShowHolidaySheet(false);
    }
  };

  const removeHoliday = (idx) => {
    setSpecialHolidays(specialHolidays.filter((_, i) => i !== idx));
  };

  const formatDateRange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    if (start === end) {
      return s.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    }
    return `${s.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} ~ ${e.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}`;
  };

  return (
    <div>
      <Header title="픽업 시간 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <div style={{ padding: tokens.spacing.md, background: colors.green50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.green600 }}>설정한 요일과 시간에 고객이 픽업 예약을 할 수 있어요</div>
        </div>

        {/* 요일별 설정 */}
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.lg }}>요일별 픽업 시간</div>
          {pickupDays.map((day, idx) => (
            <div key={day.day} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: tokens.spacing.lg, background: colors.bgCard, borderRadius: tokens.radius.md,
              marginBottom: tokens.spacing.sm, boxShadow: `0 1px 3px ${colors.shadow}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 18, background: day.isOpen ? colors.green500 : colors.gray200,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: day.isOpen ? '#FFFFFF' : colors.textTertiary, fontWeight: 700, fontSize: tokens.fontSize.sm,
                }}>{day.day}</div>
                {day.isOpen && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                    <button onClick={() => setShowTimeSheet({ dayIdx: idx, field: 'startTime' })} style={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`, background: colors.gray100,
                      border: 'none', borderRadius: tokens.radius.sm, fontSize: tokens.fontSize.md, fontWeight: 500,
                      color: colors.text, cursor: 'pointer',
                    }}>{day.startTime}</button>
                    <span style={{ color: colors.textTertiary }}>~</span>
                    <button onClick={() => setShowTimeSheet({ dayIdx: idx, field: 'endTime' })} style={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`, background: colors.gray100,
                      border: 'none', borderRadius: tokens.radius.sm, fontSize: tokens.fontSize.md, fontWeight: 500,
                      color: colors.text, cursor: 'pointer',
                    }}>{day.endTime}</button>
                  </div>
                )}
                {!day.isOpen && <span style={{ color: colors.textTertiary, fontSize: tokens.fontSize.sm }}>휴무</span>}
              </div>
              <Toggle checked={day.isOpen} onChange={() => toggleDay(idx)} />
            </div>
          ))}
        </div>

        {/* 특별 휴무 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
            <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>특별 휴무</div>
            <Button size="sm" variant="ghost" onClick={() => setShowHolidaySheet(true)}>+ 추가</Button>
          </div>
          {specialHolidays.length === 0 ? (
            <div style={{ padding: tokens.spacing.xl, textAlign: 'center', color: colors.textTertiary, background: colors.gray50, borderRadius: tokens.radius.md }}>
              등록된 휴무일이 없어요
            </div>
          ) : (
            specialHolidays.map((h, idx) => (
              <div key={idx} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: tokens.spacing.lg, background: colors.bgCard, borderRadius: tokens.radius.md,
                marginBottom: tokens.spacing.sm, boxShadow: `0 1px 3px ${colors.shadow}`,
              }}>
                <div>
                  <div style={{ fontSize: tokens.fontSize.md, fontWeight: 500, color: colors.text }}>{formatDateRange(h.startDate, h.endDate)}</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{h.reason}</div>
                </div>
                <button onClick={() => removeHoliday(idx)} style={{
                  background: colors.red50, border: 'none', borderRadius: tokens.radius.sm,
                  padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`, color: colors.red500,
                  fontSize: tokens.fontSize.sm, cursor: 'pointer',
                }}>삭제</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 시간 선택 시트 */}
      <BottomSheet isOpen={!!showTimeSheet} onClose={() => setShowTimeSheet(null)} title="시간 선택">
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {timeOptions.map(time => (
            <button key={time} onClick={() => {
              if (showTimeSheet) {
                updateTime(showTimeSheet.dayIdx, showTimeSheet.field, time);
                setShowTimeSheet(null);
              }
            }} style={{
              width: '100%', padding: tokens.spacing.lg, background: 'none', border: 'none',
              borderBottom: `1px solid ${colors.border}`, fontSize: tokens.fontSize.md,
              color: colors.text, cursor: 'pointer', textAlign: 'center',
            }}>{time}</button>
          ))}
        </div>
      </BottomSheet>

      {/* 휴무 추가 시트 */}
      <BottomSheet isOpen={showHolidaySheet} onClose={() => setShowHolidaySheet(false)} title="특별 휴무일 추가">
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>시작일</div>
          <input type="date" value={holidayStartDate} onChange={(e) => setHolidayStartDate(e.target.value)}
            style={{ width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text }} />
        </div>
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>종료일 (2일 이상인 경우)</div>
          <input type="date" value={holidayEndDate} onChange={(e) => setHolidayEndDate(e.target.value)}
            style={{ width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text }} />
        </div>
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>사유 (선택)</div>
          <input type="text" value={holidayReason} onChange={(e) => setHolidayReason(e.target.value)} placeholder="예: 크리스마스, 재고 정리"
            style={{ width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text }} />
        </div>
        <Button fullWidth onClick={addHoliday} disabled={!holidayStartDate}>추가하기</Button>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 가게 정보 - 사진 + 카테고리
// ============================================
const ShopInfoScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const fields = [
    { key: 'shopName', label: '가게명' },
    { key: 'address', label: '주소' },
    { key: 'phone', label: '전화번호' },
  ];

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(shopData[field] || '');
  };

  const handleSave = () => {
    setShopData({ ...shopData, [editingField]: tempValue });
    setEditingField(null);
  };

  const addPhoto = () => {
    if ((shopData.photos || []).length < 5) {
      const newPhotos = [...(shopData.photos || []), `https://picsum.photos/400/300?random=${Date.now()}`];
      setShopData({ ...shopData, photos: newPhotos });
    }
  };

  const removePhoto = (idx) => {
    const newPhotos = (shopData.photos || []).filter((_, i) => i !== idx);
    setShopData({ ...shopData, photos: newPhotos });
  };

  return (
    <div>
      <Header title="가게 정보" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 가게 사진 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>가게 사진 (최대 5장)</div>
            <span style={{ fontSize: tokens.fontSize.sm, color: colors.green500 }}>{(shopData.photos || []).length}/5</span>
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm, overflowX: 'auto', paddingBottom: tokens.spacing.sm }}>
            {(shopData.photos || []).map((photo, idx) => (
              <div key={idx} style={{ position: 'relative', flexShrink: 0 }}>
                <img src={photo} alt={`가게 사진 ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: tokens.radius.md }} />
                <button onClick={() => removePhoto(idx)} style={{
                  position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: 12,
                  background: colors.red500, border: 'none', color: '#FFFFFF', fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>×</button>
              </div>
            ))}
            {(shopData.photos || []).length < 5 && (
              <button onClick={addPhoto} style={{
                width: 100, height: 100, borderRadius: tokens.radius.md, border: `2px dashed ${colors.gray300}`,
                background: colors.gray50, display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
              }}>
                <span style={{ fontSize: 24, color: colors.gray400 }}>+</span>
                <span style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 4 }}>추가</span>
              </button>
            )}
          </div>
        </Card>

        {/* 카테고리 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>카테고리</div>
          <div onClick={() => setShowCategorySheet(true)} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
          }}>
            <span style={{ fontSize: tokens.fontSize.md, fontWeight: 500, color: colors.text }}>
              {shopData.categoryId ? FOOD_CATEGORIES.find(c => c.id === shopData.categoryId)?.emoji + ' ' + FOOD_CATEGORIES.find(c => c.id === shopData.categoryId)?.name : shopData.category}
            </span>
            <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>변경</span>
          </div>
        </Card>

        {/* 기본 정보 */}
        <Card>
          {fields.map((field, idx) => (
            <div key={field.key} style={{
              padding: `${tokens.spacing.lg}px 0`,
              borderBottom: idx < fields.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>{field.label}</div>
              {editingField === field.key ? (
                <div>
                  <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} autoFocus
                    style={{
                      width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`,
                      borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text, outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                    <Button size="sm" onClick={handleSave}>저장</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                  </div>
                </div>
              ) : (
                <div onClick={() => handleEdit(field.key)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.text }}>{shopData[field.key]}</span>
                  <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
                </div>
              )}
            </div>
          ))}
        </Card>
      </div>

      {/* 카테고리 선택 시트 */}
      <BottomSheet isOpen={showCategorySheet} onClose={() => setShowCategorySheet(false)} title="카테고리 선택">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.sm }}>
          {FOOD_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => {
              setShopData({ ...shopData, categoryId: cat.id, category: cat.name });
              setShowCategorySheet(false);
            }} style={{
              padding: tokens.spacing.lg, border: `2px solid ${shopData.categoryId === cat.id ? colors.green500 : colors.border}`,
              borderRadius: tokens.radius.md, background: shopData.categoryId === cat.id ? colors.green50 : colors.bgCard,
              cursor: 'pointer', textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, marginBottom: tokens.spacing.xs }}>{cat.emoji}</div>
              <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: shopData.categoryId === cat.id ? colors.green600 : colors.text }}>{cat.name}</div>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 직원 관리 - 이름 추가, 수정/삭제
// ============================================
const EmployeesScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showInviteSheet, setShowInviteSheet] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(null);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState(PLACE_ROLE_GRADE.STAFF);

  const roleLabels = { [PLACE_ROLE_GRADE.ADMIN]: '관리자', [PLACE_ROLE_GRADE.MANAGER]: '매니저', [PLACE_ROLE_GRADE.STAFF]: '직원' };

  const handleInvite = () => {
    if (inviteName && inviteEmail) {
      setShopData({
        ...shopData,
        employees: [...shopData.employees, { name: inviteName, email: inviteEmail, phone: inviteEmail, grade: inviteRole }]
      });
      setInviteName('');
      setInviteEmail('');
      setInviteRole(PLACE_ROLE_GRADE.STAFF);
      setShowInviteSheet(false);
    }
  };

  const handleUpdate = () => {
    if (showEditSheet !== null) {
      const newEmployees = [...shopData.employees];
      newEmployees[showEditSheet.index] = { ...showEditSheet.employee };
      setShopData({ ...shopData, employees: newEmployees });
      setShowEditSheet(null);
    }
  };

  const handleDelete = (idx) => {
    const newEmployees = shopData.employees.filter((_, i) => i !== idx);
    setShopData({ ...shopData, employees: newEmployees });
    setShowEditSheet(null);
  };

  return (
    <div>
      <Header title="직원 관리" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {shopData.employees.map((emp, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md, cursor: 'pointer' }}
            onClick={() => setShowEditSheet({ index: idx, employee: { ...emp } })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>{emp.name}</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{emp.email || emp.phone}</div>
              </div>
              <Badge variant={emp.grade === PLACE_ROLE_GRADE.ADMIN ? 'primary' : 'default'}>
                {roleLabels[emp.grade]}
              </Badge>
            </div>
          </Card>
        ))}
        <Button variant="secondary" fullWidth onClick={() => setShowInviteSheet(true)}>+ 직원 초대</Button>
      </div>

      {/* 초대 시트 */}
      <BottomSheet isOpen={showInviteSheet} onClose={() => setShowInviteSheet(false)} title="직원 초대">
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>이름</div>
          <input type="text" value={inviteName} onChange={(e) => setInviteName(e.target.value)}
            placeholder="직원 이름을 입력하세요" style={{
            width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
            borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
          }} />
        </div>
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>이메일</div>
          <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="직원의 이메일을 입력하세요" style={{
            width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
            borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
          }} />
        </div>
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>권한</div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            {[PLACE_ROLE_GRADE.MANAGER, PLACE_ROLE_GRADE.STAFF].map(role => (
              <button key={role} onClick={() => setInviteRole(role)} style={{
                flex: 1, padding: tokens.spacing.md, border: `2px solid ${inviteRole === role ? colors.green500 : colors.border}`,
                borderRadius: tokens.radius.md, background: inviteRole === role ? colors.green50 : colors.bgCard,
                color: inviteRole === role ? colors.green600 : colors.text, fontWeight: 600, cursor: 'pointer',
              }}>
                {roleLabels[role]}
              </button>
            ))}
          </div>
        </div>
        <Button fullWidth onClick={handleInvite} disabled={!inviteName || !inviteEmail}>초대하기</Button>
      </BottomSheet>

      {/* 수정/삭제 시트 */}
      <BottomSheet isOpen={!!showEditSheet} onClose={() => setShowEditSheet(null)} title="직원 정보 수정">
        {showEditSheet && (
          <>
            <div style={{ marginBottom: tokens.spacing.lg }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>이름</div>
              <input type="text" value={showEditSheet.employee.name}
                onChange={(e) => setShowEditSheet({ ...showEditSheet, employee: { ...showEditSheet.employee, name: e.target.value } })}
                style={{
                  width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
                  borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
                }} />
            </div>
            <div style={{ marginBottom: tokens.spacing.lg }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>이메일</div>
              <input type="email" value={showEditSheet.employee.email || showEditSheet.employee.phone}
                onChange={(e) => setShowEditSheet({ ...showEditSheet, employee: { ...showEditSheet.employee, email: e.target.value } })}
                style={{
                  width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
                  borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
                }} />
            </div>
            <div style={{ marginBottom: tokens.spacing.xl }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>권한</div>
              <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                {[PLACE_ROLE_GRADE.MANAGER, PLACE_ROLE_GRADE.STAFF].map(role => (
                  <button key={role} onClick={() => setShowEditSheet({ ...showEditSheet, employee: { ...showEditSheet.employee, grade: role } })} style={{
                    flex: 1, padding: tokens.spacing.md, border: `2px solid ${showEditSheet.employee.grade === role ? colors.green500 : colors.border}`,
                    borderRadius: tokens.radius.md, background: showEditSheet.employee.grade === role ? colors.green50 : colors.bgCard,
                    color: showEditSheet.employee.grade === role ? colors.green600 : colors.text, fontWeight: 600, cursor: 'pointer',
                  }}>
                    {roleLabels[role]}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: tokens.spacing.md }}>
              <Button variant="danger" fullWidth onClick={() => handleDelete(showEditSheet.index)}>삭제</Button>
              <Button fullWidth onClick={handleUpdate}>저장</Button>
            </div>
          </>
        )}
      </BottomSheet>
    </div>
  );
};

// ============================================
// 정산 내역
// ============================================
const SettlementScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const [showTaxInfo, setShowTaxInfo] = useState(false);

  const settlements = [
    { month: '2024년 11월', amount: 1250000, status: 'completed', paidAt: '2024-12-02' },
    { month: '2024년 10월', amount: 980000, status: 'completed', paidAt: '2024-11-01' },
  ];

  return (
    <div>
      <Header title="정산 내역" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg, background: colors.green50, border: `1px solid ${colors.green100}` }} onClick={() => setShowTaxInfo(true)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.spacing.md }}>
            <span style={{ fontSize: 24 }}>💡</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.green600, marginBottom: 4 }}>2026년 1월부터 세무 처리가 간편해져요</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.green500 }}>세금계산서·현금영수증 발행, 이제 안 하셔도 돼요</div>
            </div>
            <span style={{ color: colors.green500 }}>›</span>
          </div>
        </Card>

        <Card style={{ marginBottom: tokens.spacing.lg, background: colors.green500 }}>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: tokens.fontSize.sm }}>12월 예상 정산금</div>
          <div style={{ color: '#FFFFFF', fontSize: tokens.fontSize.xxxl, fontWeight: 700, marginTop: tokens.spacing.sm }}>1,580,000원</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: tokens.fontSize.sm, marginTop: tokens.spacing.xs }}>1월 첫 영업일 지급 예정</div>
        </Card>

        {settlements.map((s, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: tokens.fontSize.md, color: colors.text }}>{s.month}</div>
                <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: tokens.spacing.xs }}>{s.amount.toLocaleString()}원</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{s.paidAt} 지급</div>
              </div>
              <Badge variant="success">지급완료</Badge>
            </div>
          </Card>
        ))}
      </div>

      <BottomSheet isOpen={showTaxInfo} onClose={() => setShowTaxInfo(false)} title="2026년 세무 처리 변경 안내">
        <div style={{ lineHeight: 1.7 }}>
          <div style={{ padding: tokens.spacing.lg, background: colors.green50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
            <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.green600 }}>매달 하시던 세금계산서·현금영수증 발행, 이제 안 하셔도 돼요.</div>
          </div>
          <div style={{ fontSize: tokens.fontSize.md, fontWeight: 700, color: colors.text, marginBottom: tokens.spacing.md }}>무엇이 달라지나요?</div>
          <div style={{ background: colors.gray50, borderRadius: tokens.radius.md, padding: tokens.spacing.lg, marginBottom: tokens.spacing.xl }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: tokens.spacing.md, fontSize: tokens.fontSize.sm }}>
              <div style={{ fontWeight: 600, color: colors.textTertiary }}></div>
              <div style={{ fontWeight: 600, color: colors.textTertiary }}>현재 (~2025)</div>
              <div style={{ fontWeight: 600, color: colors.green600 }}>앞으로 (2026~)</div>
              <div style={{ color: colors.textTertiary }}>날짜</div>
              <div style={{ color: colors.text }}>매월 1일마다</div>
              <div style={{ color: colors.green600 }}>부가세 신고 시에만</div>
              <div style={{ color: colors.textTertiary }}>대상</div>
              <div style={{ color: colors.text }}>실제 입금액</div>
              <div style={{ color: colors.green600 }}>거래내역 엑셀</div>
              <div style={{ color: colors.textTertiary }}>방법</div>
              <div style={{ color: colors.text }}>직접 발행</div>
              <div style={{ color: colors.green600 }}>신고자료에 포함</div>
            </div>
          </div>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textSecondary, marginBottom: tokens.spacing.lg }}>
            * 2026년 1월 1일 픽업 건부터 적용됩니다.<br />* 간이/일반/법인 사업자 모두 동일 적용
          </div>
          <Button fullWidth variant="secondary" onClick={() => setShowTaxInfo(false)}>확인</Button>
        </div>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 정산 정보 설정
// ============================================
const SettlementInfoScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [editingField, setEditingField] = useState(null);

  const [settlementInfo, setSettlementInfo] = useState({
    accountHolder: shopData.settlementInfo?.accountHolder || '',
    bankName: shopData.settlementInfo?.bankName || '',
    accountNumber: shopData.settlementInfo?.accountNumber || '',
    phone: shopData.settlementInfo?.phone || '',
    businessType: shopData.settlementInfo?.businessType || 'individual',
    representativeName: shopData.settlementInfo?.representativeName || '',
    businessEmail: shopData.settlementInfo?.businessEmail || '',
  });

  const handleSave = (field, value) => {
    const newInfo = { ...settlementInfo, [field]: value };
    setSettlementInfo(newInfo);
    setShopData({ ...shopData, settlementInfo: newInfo });
    setEditingField(null);
  };

  const fields = [
    { key: 'accountHolder', label: '예금주명', placeholder: '예금주명을 입력하세요' },
    { key: 'bankName', label: '은행', placeholder: '은행을 선택하세요' },
    { key: 'accountNumber', label: '계좌번호', placeholder: '- 없이 숫자만 입력', inputMode: 'numeric' },
    { key: 'phone', label: '휴대폰 번호', placeholder: '- 없이 숫자만 입력', inputMode: 'tel' },
    { key: 'representativeName', label: '사업자 대표자명', placeholder: '대표자명을 입력하세요' },
    { key: 'businessEmail', label: '사업자 이메일', placeholder: '이메일을 입력하세요', inputMode: 'email' },
  ];

  return (
    <div>
      <Header title="정산 정보 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>사업자 유형</div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            {[{ value: 'individual', label: '개인 사업자' }, { value: 'corporate', label: '법인 사업자' }].map(type => (
              <button key={type.value} onClick={() => handleSave('businessType', type.value)} style={{
                flex: 1, padding: tokens.spacing.md,
                border: `2px solid ${settlementInfo.businessType === type.value ? colors.green500 : colors.border}`,
                borderRadius: tokens.radius.md, background: settlementInfo.businessType === type.value ? colors.green50 : colors.bgCard,
                color: settlementInfo.businessType === type.value ? colors.green600 : colors.text, fontWeight: 600, cursor: 'pointer',
              }}>{type.label}</button>
            ))}
          </div>
        </Card>

        <Card>
          {fields.map((field, idx) => (
            <div key={field.key} style={{ padding: `${tokens.spacing.lg}px 0`, borderBottom: idx < fields.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>{field.label}</div>
              {editingField === field.key ? (
                <div>
                  <input type="text" inputMode={field.inputMode || 'text'} value={settlementInfo[field.key]}
                    onChange={(e) => setSettlementInfo({ ...settlementInfo, [field.key]: e.target.value })} placeholder={field.placeholder} autoFocus
                    style={{ width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text, outline: 'none' }} />
                  <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                    <Button size="sm" onClick={() => handleSave(field.key, settlementInfo[field.key])}>저장</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setEditingField(field.key)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: settlementInfo[field.key] ? colors.text : colors.textTertiary }}>{settlementInfo[field.key] || field.placeholder}</span>
                  <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
                </div>
              )}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ============================================
// 리뷰 관리
// ============================================
const ReviewsScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const reviews = [
    { id: 1, name: '김**', content: '빵이 정말 맛있어요! 양도 푸짐해요.', date: '2024-12-05', hasReply: false },
    { id: 2, name: '이**', content: '가성비 좋아요!', date: '2024-12-03', hasReply: true, reply: '감사합니다!' },
  ];

  return (
    <div>
      <Header title="리뷰 관리" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text }}>{reviews.length}</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>전체 리뷰</div>
            </div>
            <div>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.green500 }}>{reviews.filter(r => r.hasReply).length}</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>답글 작성</div>
            </div>
          </div>
        </Card>

        {reviews.map(review => (
          <Card key={review.id} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
              <span style={{ fontWeight: 600, color: colors.text }}>{review.name}</span>
              <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{review.date}</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.md, color: colors.text, lineHeight: 1.6, marginBottom: tokens.spacing.md }}>{review.content}</div>
            {review.hasReply ? (
              <div style={{ padding: tokens.spacing.md, background: colors.green50, borderRadius: tokens.radius.md, borderLeft: `3px solid ${colors.green500}` }}>
                <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.green600, marginBottom: 4 }}>사장님 답글</div>
                <div style={{ fontSize: tokens.fontSize.md, color: colors.text }}>{review.reply}</div>
              </div>
            ) : replyingTo === review.id ? (
              <div>
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="답글을 작성해 주세요"
                  style={{ width: '100%', minHeight: 80, padding: tokens.spacing.md, border: `1px solid ${colors.border}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, resize: 'none', background: colors.bgCard, color: colors.text, marginBottom: tokens.spacing.sm }} />
                <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                  <Button size="sm" onClick={() => { setReplyingTo(null); setReplyText(''); }}>등록</Button>
                  <Button size="sm" variant="secondary" onClick={() => setReplyingTo(null)}>취소</Button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setReplyingTo(review.id)} style={{ padding: 0 }}>답글 작성하기</Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 내 가게 미리보기
// ============================================
const ShopPreviewScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const previewUrl = 'https://www.luckymeal.io/customer/place/1875';

  return (
    <div>
      <Header title="내 가게 미리보기" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: tokens.spacing.lg }}>👀</div>
          <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.sm }}>소비자 화면에서 확인하기</div>
          <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary, marginBottom: tokens.spacing.xl, lineHeight: 1.6 }}>
            내 가게가 고객에게 어떻게 보이는지<br />럭키밀 앱에서 확인해 보세요
          </div>
          <Button fullWidth onClick={() => window.open(previewUrl, '_blank')}>새 창에서 보기 →</Button>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// 사장님 가이드 - 간단한 버전
// ============================================
const GuideScreen = ({ onBack }) => {
  const { colors } = useTheme();

  const guides = [
    { title: '럭키백이란?', content: '당일 판매가 어려운 음식을 할인된 가격에 판매하는 서비스예요. 음식물 쓰레기를 줄이고 환경에 기여할 수 있어요.' },
    { title: '예약 → 확정 → 픽업', content: '고객이 예약하면 픽업 시간 30분 전에 자동으로 확정돼요. 확정 후에는 취소가 불가능하니 럭키백을 준비해 주세요.' },
    { title: '정산은 언제?', content: '매월 판매한 금액은 익월 첫 영업일에 정산돼요. 정산 내역에서 확인할 수 있어요.' },
    { title: '문제가 생겼어요', content: '픽업 시간에 고객이 안 오거나 문제가 생기면 카카오톡 채널로 문의해 주세요. 24시간 연중무휴로 답변드려요.' },
  ];

  return (
    <div>
      <Header title="사장님 가이드" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {guides.map((guide, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.sm }}>{guide.title}</div>
            <div style={{ fontSize: tokens.fontSize.md, color: colors.textSecondary, lineHeight: 1.6 }}>{guide.content}</div>
          </Card>
        ))}
        <div style={{ marginTop: tokens.spacing.xl }}>
          <Button fullWidth onClick={() => window.open('http://pf.kakao.com/_xiJxmxdG/chat', '_blank')}>카카오톡으로 문의하기</Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 문의하기
// ============================================
const ContactScreen = ({ onBack }) => {
  const { colors } = useTheme();
  return (
    <div>
      <Header title="문의하기" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: tokens.spacing.xl }}>💬</div>
        <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.sm }}>도움이 필요하신가요?</div>
        <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary, marginBottom: tokens.spacing.xl, lineHeight: 1.6 }}>
          카카오톡 채널로 문의해 주세요.<br />24시간 연중무휴 답변드려요.
        </div>
        <Button fullWidth onClick={() => window.open('http://pf.kakao.com/_xiJxmxdG/chat', '_blank')}>카카오톡으로 문의하기</Button>
      </div>
    </div>
  );
};

// ============================================
// 앱 메인
// ============================================
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const colors = isDark ? darkColors : lightColors;
  const toggleTheme = () => setIsDark(!isDark);

  const [shopData, setShopData] = useState({
    shopName: '행복한 베이커리',
    category: '베이커리',
    categoryId: 1,
    address: '서울시 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    dailySalesCount: 5,
    soldCount: 2,
    paidCount: 2,
    confirmedCount: 1,
    pickedUpCount: 3,
    isSoldOut: false,
    luckyBagPrice: 3900,
    originalPrice: 7800,
    luckyBagDescription: '오늘의 빵 3-4종을 랜덤으로 담아드려요. 구성은 매일 달라져요!',
    foodCategory: 1,
    mainMenus: ['소금빵', '크루아상', '바게트'],
    purchaseLimit: '2',
    confirmMessage: '맛있는 럭키백 준비 중이에요! 픽업 시간에 방문해주세요.',
    cancelMessage: '',
    photos: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
    employees: [
      { name: '홍길동', email: 'hong@example.com', phone: '010-1234-5678', grade: PLACE_ROLE_GRADE.ADMIN },
      { name: '김직원', email: 'kim@example.com', phone: '010-9876-5432', grade: PLACE_ROLE_GRADE.STAFF },
    ],
    totalSold: 847,
    totalRevenue: 3305300,
  });

  const navigate = (screen) => {
    if (['home', 'orders', 'settings'].includes(screen)) setActiveTab(screen);
    setCurrentScreen(screen);
  };

  const goBack = () => setCurrentScreen(activeTab);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen onNavigate={navigate} shopData={shopData} setShopData={setShopData} />;
      case 'orders': return <OrdersScreen onNavigate={navigate} />;
      case 'settings': return <SettingsScreen onNavigate={navigate} shopData={shopData} />;
      case 'sales-history': return <SalesHistoryScreen onBack={goBack} />;
      case 'luckybag-settings': return <LuckyBagSettingsScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'pickup-settings': return <PickupSettingsScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'shop-info': return <ShopInfoScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'shop-preview': return <ShopPreviewScreen onBack={goBack} />;
      case 'employees': return <EmployeesScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'settlement': return <SettlementScreen onBack={goBack} />;
      case 'settlement-info': return <SettlementInfoScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'reviews': return <ReviewsScreen onBack={goBack} />;
      case 'guide': return <GuideScreen onBack={goBack} />;
      case 'contact': return <ContactScreen onBack={goBack} />;
      default: return <HomeScreen onNavigate={navigate} shopData={shopData} setShopData={setShopData} />;
    }
  };

  const showBottomNav = ['home', 'orders', 'settings'].includes(currentScreen);

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      <div style={{
        maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: colors.bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background 0.3s', position: 'relative',
      }}>
        <div style={{ paddingBottom: showBottomNav ? 80 : 0 }}>{renderScreen()}</div>
        {showBottomNav && <BottomNav activeTab={activeTab} onChange={navigate} />}
        <FloatingChatButton />
      </div>
    </ThemeContext.Provider>
  );
}
