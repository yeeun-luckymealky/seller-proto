import React, { useState, createContext, useContext, useEffect } from 'react';

// ============================================
// 테마 컨텍스트 (다크모드/라이트모드)
// ============================================
const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const lightColors = {
  bg: '#F9FAFB',
  bgCard: '#FFFFFF',
  bgElevated: '#FFFFFF',
  gray50: '#F9FAFB', gray100: '#F2F4F6', gray200: '#E5E8EB',
  gray300: '#D1D6DB', gray400: '#B0B8C1', gray500: '#8B95A1',
  gray600: '#6B7684', gray700: '#4E5968', gray800: '#333D4B', gray900: '#191F28',
  blue50: '#E8F3FF', blue100: '#C9E2FF', blue500: '#3182F6', blue600: '#1B64DA',
  green50: '#E8FAF0', green100: '#B1F1CC', green500: '#30C85E', green600: '#1DAB47',
  red50: '#FFEBEE', red100: '#FFCDD2', red500: '#F44336', red600: '#E53935',
  orange50: '#FFF3E0', orange100: '#FFE0B2', orange500: '#FF9800',
  white: '#FFFFFF',
  text: '#191F28',
  textSecondary: '#6B7684',
  textTertiary: '#8B95A1',
  border: '#E5E8EB',
  shadow: 'rgba(0,0,0,0.08)',
  overlay: 'rgba(0,0,0,0.4)',
};

const darkColors = {
  bg: '#17171C',
  bgCard: '#1E1E24',
  bgElevated: '#2C2C35',
  gray50: '#2C2C35', gray100: '#3D3D47', gray200: '#4E4E59',
  gray300: '#6B6B78', gray400: '#8B8B98', gray500: '#A8A8B3',
  gray600: '#C5C5CD', gray700: '#DCDCE3', gray800: '#ECECF1', gray900: '#F9F9FB',
  blue50: '#1A2744', blue100: '#1E3A5F', blue500: '#4B96FF', blue600: '#6EADFF',
  green50: '#1A3328', green100: '#1E4D35', green500: '#4ADE80', green600: '#6EE7A0',
  red50: '#3D1A1A', red100: '#5C2626', red500: '#FF6B6B', red600: '#FF8A8A',
  orange50: '#3D2E1A', orange100: '#5C4326', orange500: '#FFB347', orange600: '#FFC56B',
  white: '#1E1E24',
  text: '#F9F9FB',
  textSecondary: '#C5C5CD',
  textTertiary: '#A8A8B3',
  border: '#3D3D47',
  shadow: 'rgba(0,0,0,0.3)',
  overlay: 'rgba(0,0,0,0.6)',
};

// ============================================
// 디자인 토큰
// ============================================
const tokens = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 },
  fontSize: { xs: 11, sm: 12, md: 14, lg: 16, xl: 18, xxl: 20, xxxl: 24, xxxxl: 28 },
};

// ============================================
// 공통 컴포넌트
// ============================================
const Card = ({ children, style, onClick }) => {
  const { colors } = useTheme();
  return (
    <div onClick={onClick} style={{
      background: colors.bgCard,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.xl,
      boxShadow: `0 1px 3px ${colors.shadow}`,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 0.2s, box-shadow 0.2s',
      ...style
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
    new: { bg: colors.red500, color: '#FFFFFF' },
  };
  const v = variants[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 8px',
      borderRadius: tokens.radius.sm, fontSize: tokens.fontSize.xs,
      fontWeight: 600, background: v.bg, color: v.color,
      transition: 'background 0.2s, color 0.2s',
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
  const v = variants[variant];
  const s = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? colors.gray200 : v.bg,
      color: disabled ? colors.gray400 : v.color,
      border: 'none', borderRadius: tokens.radius.md,
      padding: s.padding, fontSize: s.fontSize, fontWeight: 600,
      width: fullWidth ? '100%' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer',
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
        background: checked ? colors.blue500 : colors.gray300,
        transition: 'background 0.2s',
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

const ListItem = ({ icon, title, subtitle, right, onClick, showArrow = true }) => {
  const { colors } = useTheme();
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', padding: `${tokens.spacing.lg}px 0`,
      borderBottom: `1px solid ${colors.border}`, cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 0.2s',
    }}>
      {icon && <div style={{ marginRight: tokens.spacing.md, fontSize: 20 }}>{icon}</div>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: tokens.fontSize.md, color: colors.text, fontWeight: 500, transition: 'color 0.2s' }}>{title}</div>
        {subtitle && <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2, transition: 'color 0.2s' }}>{subtitle}</div>}
      </div>
      {right && <div style={{ marginRight: tokens.spacing.sm }}>{right}</div>}
      {showArrow && onClick && <div style={{ color: colors.gray400 }}>›</div>}
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
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        {onBack && <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 4, color: colors.text }}>←</button>}
        <span style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.text, transition: 'color 0.2s' }}>{title}</span>
      </div>
      {right}
    </div>
  );
};

const TabBar = ({ tabs, activeTab, onChange }) => {
  const { colors } = useTheme();
  return (
    <div style={{ display: 'flex', background: colors.bgCard, borderBottom: `1px solid ${colors.border}`, transition: 'background 0.2s, border-color 0.2s' }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          flex: 1, padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`,
          background: 'none', border: 'none', cursor: 'pointer',
          color: activeTab === tab.id ? colors.blue500 : colors.textTertiary,
          fontWeight: activeTab === tab.id ? 600 : 400, fontSize: tokens.fontSize.md,
          borderBottom: activeTab === tab.id ? `2px solid ${colors.blue500}` : '2px solid transparent',
          transition: 'color 0.2s',
        }}>{tab.label}</button>
      ))}
    </div>
  );
};

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  const { colors } = useTheme();
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0, bottom: 0, left: 0, right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: colors.overlay, transition: 'background 0.2s' }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        maxWidth: 480,
        background: colors.bgElevated,
        borderRadius: `${tokens.radius.xl}px ${tokens.radius.xl}px 0 0`,
        maxHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.2s',
      }}>
        <div style={{ padding: tokens.spacing.lg, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ width: 40, height: 4, background: colors.gray300, borderRadius: 2, margin: '0 auto 12px' }} />
          <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.text, transition: 'color 0.2s' }}>{title}</div>
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
      display: 'flex',
      justifyContent: 'space-around',
      padding: `${tokens.spacing.md}px 0`,
      paddingBottom: `calc(${tokens.spacing.md}px + env(safe-area-inset-bottom, 0px))`,
      background: colors.bgCard,
      borderTop: `1px solid ${colors.border}`,
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 480,
      transition: 'background 0.2s, border-color 0.2s',
      zIndex: 100,
    }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer', padding: tokens.spacing.sm,
          color: activeTab === tab.id ? colors.blue500 : colors.textTertiary,
          transition: 'color 0.2s',
        }}>
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontSize: tokens.fontSize.xs, fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const EmptyState = ({ icon, title, description, action }) => {
  const { colors } = useTheme();
  return (
    <div style={{ textAlign: 'center', padding: `${tokens.spacing.xxxl}px ${tokens.spacing.xl}px` }}>
      <div style={{ fontSize: 48, marginBottom: tokens.spacing.lg }}>{icon}</div>
      <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.sm, transition: 'color 0.2s' }}>{title}</div>
      <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary, marginBottom: tokens.spacing.xl, transition: 'color 0.2s' }}>{description}</div>
      {action}
    </div>
  );
};

// ============================================
// 상수 (백엔드 매핑)
// ============================================
const ORDER_STATUS = {
  ORDER: 'ORDER',
  PAID: 'PAID',
  CONFIRMED: 'CONFIRMED',
  USER_CANCEL: 'USER_CANCEL',
  PLACE_CANCEL: 'PLACE_CANCEL',
  ADMIN_CANCEL: 'ADMIN_CANCEL',
  FAILED: 'FAILED',
};

const PLACE_CURRENT_STATUS = {
  TODAY_OPEN: 'TODAY_OPEN',
  TOMORROW_OPEN: 'TOMORROW_OPEN',
  CLOSED: 'CLOSED',
  SOLD_OUT: 'SOLD_OUT',
};

const PLACE_ROLE_GRADE = {
  ADMIN: 0,
  MANAGER: 1,
  STAFF: 2,
};

// ============================================
// 홈 화면 - JTBD: 오늘 현황 한눈에 파악, 판매 종료/재개
// ============================================
const HomeScreen = ({ onNavigate, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);

  const getCurrentStatus = () => {
    if (shopData.isSoldOut) return PLACE_CURRENT_STATUS.SOLD_OUT;
    if (shopData.isClosed) return PLACE_CURRENT_STATUS.CLOSED;
    return PLACE_CURRENT_STATUS.TODAY_OPEN;
  };

  const currentStatus = getCurrentStatus();
  const stats = [
    { label: '예약', value: shopData.paidCount, color: colors.orange500, status: ORDER_STATUS.PAID },
    { label: '확정', value: shopData.confirmedCount, color: colors.blue500, status: ORDER_STATUS.CONFIRMED },
    { label: '픽업완료', value: shopData.pickedUpCount, color: colors.green500 },
  ];

  const inventory = {
    totalCount: shopData.dailySalesCount,
    soldCount: shopData.soldCount,
    remainCount: shopData.dailySalesCount - shopData.soldCount,
  };

  return (
    <div>
      {/* 오늘 현황 카드 */}
      <Card style={{ margin: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.lg }}>
          <span style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>오늘 현황</span>
          <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>
            {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
          </span>
        </div>

        {/* 재고 현황 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: tokens.spacing.lg, background: colors.gray50,
          borderRadius: tokens.radius.md, marginBottom: tokens.spacing.lg,
          transition: 'background 0.2s',
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.xxxxl, fontWeight: 700, color: colors.blue500 }}>
              {inventory.remainCount}
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>남은 수량</div>
          </div>
          <div style={{ width: 1, height: 40, background: colors.gray200 }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.xxxxl, fontWeight: 700, color: colors.gray400 }}>
              {inventory.totalCount}
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>전체 수량</div>
          </div>
        </div>

        {/* 주문 상태별 현황 */}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 판매 종료 토글 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Toggle
          checked={currentStatus === PLACE_CURRENT_STATUS.SOLD_OUT}
          onChange={(v) => setShopData({ ...shopData, isSoldOut: v })}
          label="오늘 판매 종료"
        />
        {currentStatus === PLACE_CURRENT_STATUS.SOLD_OUT && (
          <div style={{ marginTop: tokens.spacing.md, padding: tokens.spacing.md, background: colors.gray50, borderRadius: tokens.radius.sm, transition: 'background 0.2s' }}>
            <span style={{ fontSize: tokens.fontSize.sm, color: colors.textSecondary }}>
              판매가 종료되었어요. 다시 판매하려면 토글을 꺼주세요.
            </span>
          </div>
        )}
      </Card>

      {/* 확정 전 주문 알림 배너 */}
      {shopData.paidCount > 0 && (
        <Card
          style={{
            margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`,
            background: colors.blue50,
            border: `1px solid ${colors.blue100}`,
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onClick={() => onNavigate('orders')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.blue600 }}>
                확정 대기 주문 {shopData.paidCount}건
              </div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.blue500, marginTop: 4 }}>
                픽업 시간 전에 확정해 주세요
              </div>
            </div>
            <span style={{ color: colors.blue500 }}>›</span>
          </div>
        </Card>
      )}

      {/* 오늘의 수량 변경 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }} onClick={() => setShowQuantitySheet(true)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>오늘의 럭키백 수량</div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: 4 }}>
              {shopData.dailySalesCount}개
            </div>
          </div>
          <Button variant="secondary" size="sm">변경</Button>
        </div>
      </Card>

      {/* 빠른 액션 */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: tokens.spacing.md, margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`
      }}>
        <Card onClick={() => onNavigate('luckybag-settings')} style={{ textAlign: 'center', padding: tokens.spacing.lg }}>
          <div style={{ fontSize: 24, marginBottom: tokens.spacing.sm }}>🎁</div>
          <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: colors.text }}>럭키백 설정</div>
        </Card>
        <Card onClick={() => onNavigate('pickup-settings')} style={{ textAlign: 'center', padding: tokens.spacing.lg }}>
          <div style={{ fontSize: 24, marginBottom: tokens.spacing.sm }}>📅</div>
          <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: colors.text }}>픽업 시간</div>
        </Card>
      </div>

      {/* 수량 변경 바텀시트 */}
      <BottomSheet isOpen={showQuantitySheet} onClose={() => setShowQuantitySheet(false)} title="럭키백 수량 변경">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: tokens.spacing.lg, background: colors.gray50, borderRadius: tokens.radius.md, transition: 'background 0.2s' }}>
            <button
              onClick={() => setShopData({ ...shopData, dailySalesCount: Math.max(1, shopData.dailySalesCount - 1) })}
              style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text, transition: 'background 0.2s, border-color 0.2s' }}
            >-</button>
            <span style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text }}>{shopData.dailySalesCount}</span>
            <button
              onClick={() => setShopData({ ...shopData, dailySalesCount: shopData.dailySalesCount + 1 })}
              style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text, transition: 'background 0.2s, border-color 0.2s' }}
            >+</button>
          </div>
        </div>
        <div style={{ padding: tokens.spacing.md, background: colors.blue50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl, transition: 'background 0.2s' }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.blue600 }}>
            오늘 판매 수량만 변경돼요. 기본 설정은 럭키백 설정에서 변경할 수 있어요.
          </div>
        </div>
        <Button fullWidth onClick={() => setShowQuantitySheet(false)}>저장하기</Button>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 주문 관리 화면 - JTBD: 오늘 주문 확인, 확정, 픽업 완료, 취소
// ============================================
const OrdersScreen = ({ onNavigate }) => {
  const { colors } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelSheet, setCancelSheet] = useState(null);

  // 오늘의 주문 (탭 없이 일렬 리스팅, 상태별 컬러 칩)
  const todayOrders = [
    { id: 1, code: 'A001', orderUid: 'ORD-2024120801', name: '김**', mannerScore: 85, luckyBagCount: 2, price: 7800, discountPrice: 3900, pickupStartTime: '14:00', pickupEndTime: '15:00', status: ORDER_STATUS.PAID, isPickupChecked: false },
    { id: 2, code: 'A002', orderUid: 'ORD-2024120802', name: '이**', mannerScore: 92, luckyBagCount: 1, price: 3900, discountPrice: 3900, pickupStartTime: '14:00', pickupEndTime: '15:00', status: ORDER_STATUS.PAID, isPickupChecked: false },
    { id: 3, code: 'A003', orderUid: 'ORD-2024120803', name: '박**', mannerScore: 78, luckyBagCount: 1, price: 3900, discountPrice: 3900, pickupStartTime: '15:00', pickupEndTime: '16:00', status: ORDER_STATUS.CONFIRMED, isPickupChecked: false },
    { id: 4, code: 'A004', orderUid: 'ORD-2024120804', name: '최**', mannerScore: 88, luckyBagCount: 2, price: 7800, discountPrice: 7800, pickupStartTime: '12:00', pickupEndTime: '13:00', status: ORDER_STATUS.CONFIRMED, isPickupChecked: true },
  ];

  const getStatusBadge = (order) => {
    if (order.isPickupChecked) return <Badge variant="success">픽업완료</Badge>;
    if (order.status === ORDER_STATUS.CONFIRMED) return <Badge variant="primary">확정</Badge>;
    if (order.status === ORDER_STATUS.PAID) return <Badge variant="warning">예약</Badge>;
    return null;
  };

  const getMannerScoreColor = (score) => {
    if (score >= 90) return colors.green500;
    if (score >= 70) return colors.blue500;
    if (score >= 50) return colors.orange500;
    return colors.red500;
  };

  // 주문 상태에 따른 액션 버튼
  const renderActionButtons = (order) => {
    if (order.isPickupChecked) {
      return <Button variant="secondary" fullWidth onClick={() => setSelectedOrder(null)}>닫기</Button>;
    }
    if (order.status === ORDER_STATUS.CONFIRMED) {
      return <Button fullWidth onClick={() => setSelectedOrder(null)}>픽업 완료</Button>;
    }
    if (order.status === ORDER_STATUS.PAID) {
      return (
        <div style={{ display: 'flex', gap: tokens.spacing.md }}>
          <Button variant="secondary" fullWidth onClick={() => { setCancelSheet(order); setSelectedOrder(null); }}>취소</Button>
          <Button fullWidth onClick={() => setSelectedOrder(null)}>주문 확정</Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* 헤더 - 판매 내역 보기 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.spacing.lg,
        background: colors.bgCard,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <span style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.text }}>오늘 주문</span>
        <button
          onClick={() => onNavigate('sales-history')}
          style={{
            background: 'none',
            border: 'none',
            color: colors.blue500,
            fontSize: tokens.fontSize.md,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          판매 내역 보기 ›
        </button>
      </div>

      {todayOrders.length === 0 ? (
        <EmptyState
          icon="📋"
          title="오늘 주문이 없어요"
          description="새로운 예약이 들어오면 알려드릴게요"
        />
      ) : (
        <div style={{ padding: tokens.spacing.lg }}>
          {todayOrders.map(order => (
            <Card key={order.id} style={{ marginBottom: tokens.spacing.md }} onClick={() => setSelectedOrder(order)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.md }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                  <span style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.blue500 }}>{order.code}</span>
                  {getStatusBadge(order)}
                </div>
                <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{order.name}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>럭키백 {order.luckyBagCount}개</div>
                  <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text, marginTop: 2 }}>
                    {order.discountPrice.toLocaleString()}원
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>픽업</div>
                  <div style={{ fontSize: tokens.fontSize.md, fontWeight: 500, color: colors.text }}>
                    {order.pickupStartTime} - {order.pickupEndTime}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 주문 상세 바텀시트 */}
      <BottomSheet isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`주문 ${selectedOrder?.code}`}>
        {selectedOrder && (
          <>
            <div style={{ marginBottom: tokens.spacing.xl }}>
              <div style={{ padding: tokens.spacing.lg, background: colors.gray50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.lg, transition: 'background 0.2s' }}>
                {/* 주문 코드 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span style={{ color: colors.textTertiary }}>주문 코드</span>
                  <span style={{ fontWeight: 600, color: colors.blue500 }}>{selectedOrder.code}</span>
                </div>
                {/* 주문번호 (orderUid) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span style={{ color: colors.textTertiary }}>주문번호</span>
                  <span style={{ fontWeight: 500, color: colors.text, fontSize: tokens.fontSize.sm }}>{selectedOrder.orderUid}</span>
                </div>
                {/* 고객 정보 + 매너지수 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span style={{ color: colors.textTertiary }}>고객</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                    <span style={{ fontWeight: 500, color: colors.text }}>{selectedOrder.name}</span>
                    <span style={{
                      fontSize: tokens.fontSize.xs,
                      fontWeight: 600,
                      color: getMannerScoreColor(selectedOrder.mannerScore),
                      background: colors.gray100,
                      padding: '2px 6px',
                      borderRadius: tokens.radius.sm,
                    }}>
                      매너 {selectedOrder.mannerScore}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span style={{ color: colors.textTertiary }}>수량</span>
                  <span style={{ fontWeight: 500, color: colors.text }}>럭키백 {selectedOrder.luckyBagCount}개</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span style={{ color: colors.textTertiary }}>픽업 시간</span>
                  <span style={{ fontWeight: 500, color: colors.text }}>{selectedOrder.pickupStartTime} - {selectedOrder.pickupEndTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: tokens.spacing.md, borderTop: `1px solid ${colors.gray200}`, marginTop: tokens.spacing.sm }}>
                  <span style={{ fontWeight: 600, color: colors.text }}>결제 금액</span>
                  <span style={{ fontWeight: 700, color: colors.blue500 }}>{selectedOrder.discountPrice.toLocaleString()}원</span>
                </div>
              </div>
            </div>

            {renderActionButtons(selectedOrder)}
          </>
        )}
      </BottomSheet>

      {/* 취소 바텀시트 */}
      <BottomSheet isOpen={!!cancelSheet} onClose={() => setCancelSheet(null)} title="주문 취소">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.md, color: colors.text, marginBottom: tokens.spacing.lg }}>
            주문 {cancelSheet?.code}를 취소하시겠어요?
          </div>
          <div style={{ padding: tokens.spacing.md, background: colors.red50, borderRadius: tokens.radius.md, transition: 'background 0.2s' }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.red600 }}>
              취소하면 고객에게 자동으로 알림이 전송되고, 결제 금액이 환불됩니다.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacing.md }}>
          <Button variant="secondary" fullWidth onClick={() => setCancelSheet(null)}>아니요</Button>
          <Button variant="danger" fullWidth onClick={() => setCancelSheet(null)}>취소하기</Button>
        </div>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 판매 내역 화면 - 완료된 판매 목록
// ============================================
const SalesHistoryScreen = ({ onBack }) => {
  const { colors } = useTheme();

  const salesHistory = [
    { date: '2024-12-07', orders: [
      { id: 101, code: 'A010', name: '김**', luckyBagCount: 2, discountPrice: 7800, pickupTime: '14:32' },
      { id: 102, code: 'A011', name: '이**', luckyBagCount: 1, discountPrice: 3900, pickupTime: '15:15' },
    ]},
    { date: '2024-12-06', orders: [
      { id: 103, code: 'A008', name: '박**', luckyBagCount: 3, discountPrice: 11700, pickupTime: '13:22' },
      { id: 104, code: 'A009', name: '최**', luckyBagCount: 1, discountPrice: 3900, pickupTime: '20:45' },
    ]},
    { date: '2024-12-05', orders: [
      { id: 105, code: 'A005', name: '정**', luckyBagCount: 2, discountPrice: 7800, pickupTime: '14:10' },
    ]},
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) return '오늘';
    if (dateStr === yesterday.toISOString().split('T')[0]) return '어제';
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
  };

  return (
    <div>
      <Header title="판매 내역" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {salesHistory.map((day, idx) => (
          <div key={idx} style={{ marginBottom: tokens.spacing.xl }}>
            <div style={{
              fontSize: tokens.fontSize.sm,
              fontWeight: 600,
              color: colors.textTertiary,
              marginBottom: tokens.spacing.md,
            }}>
              {formatDate(day.date)} · {day.orders.length}건
            </div>
            {day.orders.map(order => (
              <Card key={order.id} style={{ marginBottom: tokens.spacing.sm, padding: tokens.spacing.lg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                    <span style={{ fontWeight: 600, color: colors.blue500 }}>{order.code}</span>
                    <span style={{ color: colors.textTertiary }}>{order.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: colors.text }}>{order.discountPrice.toLocaleString()}원</div>
                    <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>
                      럭키백 {order.luckyBagCount}개 · {order.pickupTime}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 설정 화면 - JTBD: 가게/직원/정산 관리
// ============================================
const SettingsScreen = ({ onNavigate, shopData }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  const menuGroups = [
    {
      title: '판매 설정',
      items: [
        { icon: '🎁', title: '럭키백 설정', subtitle: '가격, 구성, 수량', screen: 'luckybag-settings' },
        { icon: '📅', title: '픽업 시간', subtitle: '픽업 가능 시간대 설정', screen: 'pickup-settings' },
      ]
    },
    {
      title: '가게 관리',
      items: [
        { icon: '🏪', title: '가게 정보', subtitle: '기본 정보, 사진', screen: 'shop-info' },
        { icon: '👀', title: '내 가게 미리보기', subtitle: '소비자 화면에서 보이는 모습', screen: 'shop-preview' },
        { icon: '👥', title: '직원 관리', subtitle: '직원 초대 및 권한', screen: 'employees' },
      ]
    },
    {
      title: '매출 관리',
      items: [
        { icon: '💰', title: '정산 내역', subtitle: '월별 정산 확인', screen: 'settlement' },
        { icon: '⭐', title: '리뷰 관리', subtitle: '고객 리뷰 확인 및 답글', screen: 'reviews' },
      ]
    },
    {
      title: '고객센터',
      items: [
        { icon: '📖', title: '사장님 가이드', subtitle: '앱 사용법 안내', screen: 'guide' },
        { icon: '💬', title: '문의하기', subtitle: '1:1 문의', screen: 'contact' },
      ]
    },
  ];

  return (
    <div>
      {/* 가게 정보 요약 */}
      <Card style={{ margin: tokens.spacing.lg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.lg }}>
          <div style={{
            width: 56, height: 56, borderRadius: tokens.radius.md,
            background: colors.gray100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, transition: 'background 0.2s',
          }}>🏪</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.text }}>{shopData.shopName}</div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{shopData.category}</div>
          </div>
          <Badge variant="success">운영중</Badge>
        </div>
      </Card>

      {/* 다크모드 토글 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <span style={{ fontSize: 20 }}>{isDark ? '🌙' : '☀️'}</span>
            <span style={{ fontSize: tokens.fontSize.md, color: colors.text }}>다크 모드</span>
          </div>
          <Toggle checked={isDark} onChange={toggleTheme} />
        </div>
      </Card>

      {/* 메뉴 그룹 */}
      {menuGroups.map((group, idx) => (
        <div key={idx} style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ padding: `0 ${tokens.spacing.lg}px`, marginBottom: tokens.spacing.sm }}>
            <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary }}>{group.title}</span>
          </div>
          <Card style={{ margin: `0 ${tokens.spacing.lg}px`, padding: `0 ${tokens.spacing.lg}px` }}>
            {group.items.map((item, i) => (
              <ListItem
                key={i}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onClick={() => onNavigate(item.screen)}
              />
            ))}
          </Card>
        </div>
      ))}

      {/* 소비자앱 전환 */}
      <div style={{ padding: `0 ${tokens.spacing.lg}px`, marginTop: tokens.spacing.xl }}>
        <Button variant="ghost" fullWidth onClick={() => onNavigate('consumer-mode')}>
          소비자앱으로 전환 →
        </Button>
      </div>
    </div>
  );
};

// ============================================
// 서브 화면들
// ============================================

// 럭키백 설정
const LuckyBagSettingsScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showPriceSheet, setShowPriceSheet] = useState(false);
  const [showQtySheet, setShowQtySheet] = useState(false);
  const [tempPrice, setTempPrice] = useState(shopData.luckyBagPrice);
  const [tempQty, setTempQty] = useState(shopData.dailySalesCount);

  return (
    <div>
      <Header title="럭키백 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card style={{ marginBottom: tokens.spacing.lg }} onClick={() => { setTempPrice(shopData.luckyBagPrice); setShowPriceSheet(true); }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>판매 가격</div>
              <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: 4 }}>
                {shopData.luckyBagPrice.toLocaleString()}원
              </div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>
                정가 {shopData.originalPrice.toLocaleString()}원 ({Math.round((1 - shopData.luckyBagPrice / shopData.originalPrice) * 100)}% 할인)
              </div>
            </div>
            <span style={{ color: colors.gray400, fontSize: 20 }}>›</span>
          </div>
        </Card>

        <Card style={{ marginBottom: tokens.spacing.lg }} onClick={() => { setTempQty(shopData.dailySalesCount); setShowQtySheet(true); }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>기본 판매 수량</div>
              <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: 4 }}>
                {shopData.dailySalesCount}개
              </div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>
                매일 이 수량으로 판매 시작
              </div>
            </div>
            <span style={{ color: colors.gray400, fontSize: 20 }}>›</span>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>구성 안내</div>
          <div style={{ fontSize: tokens.fontSize.md, color: colors.text, lineHeight: 1.6 }}>
            {shopData.luckyBagDescription}
          </div>
        </Card>
      </div>

      {/* 가격 변경 시트 */}
      <BottomSheet isOpen={showPriceSheet} onClose={() => setShowPriceSheet(false)} title="판매 가격 변경">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.lg }}>
            <button
              onClick={() => setTempPrice(Math.max(100, tempPrice - 100))}
              style={{ width: 48, height: 48, borderRadius: 24, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}
            >-</button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text }}>{tempPrice.toLocaleString()}원</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 4 }}>
                {Math.round((1 - tempPrice / shopData.originalPrice) * 100)}% 할인
              </div>
            </div>
            <button
              onClick={() => setTempPrice(tempPrice + 100)}
              style={{ width: 48, height: 48, borderRadius: 24, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}
            >+</button>
          </div>
        </div>
        <Button fullWidth onClick={() => { setShopData({ ...shopData, luckyBagPrice: tempPrice }); setShowPriceSheet(false); }}>저장하기</Button>
      </BottomSheet>

      {/* 수량 변경 시트 */}
      <BottomSheet isOpen={showQtySheet} onClose={() => setShowQtySheet(false)} title="기본 판매 수량 변경">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl }}>
            <button
              onClick={() => setTempQty(Math.max(1, tempQty - 1))}
              style={{ width: 48, height: 48, borderRadius: 24, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}
            >-</button>
            <span style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text }}>{tempQty}개</span>
            <button
              onClick={() => setTempQty(tempQty + 1)}
              style={{ width: 48, height: 48, borderRadius: 24, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}
            >+</button>
          </div>
        </div>
        <Button fullWidth onClick={() => { setShopData({ ...shopData, dailySalesCount: tempQty }); setShowQtySheet(false); }}>저장하기</Button>
      </BottomSheet>
    </div>
  );
};

// 픽업 시간 설정
const PickupSettingsScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div>
      <Header title="픽업 시간 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <div style={{ padding: tokens.spacing.md, background: colors.blue50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.lg, transition: 'background 0.2s' }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.blue600 }}>
            설정한 시간에 고객이 픽업 예약을 할 수 있어요
          </div>
        </div>

        {shopData.pickupSlots.map((slot, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: colors.text }}>
                  {slot.start} - {slot.end}
                </div>
                <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 4 }}>
                  {slot.days.map(d => weekdays[d]).join(', ')}
                </div>
              </div>
              <Button variant="ghost" size="sm">수정</Button>
            </div>
          </Card>
        ))}

        <Button variant="secondary" fullWidth onClick={() => {
          setShopData({
            ...shopData,
            pickupSlots: [...shopData.pickupSlots, { start: '18:00', end: '19:00', days: [0, 1, 2, 3, 4] }]
          });
        }}>+ 픽업 시간 추가</Button>
      </div>
    </div>
  );
};

// 가게 정보
const ShopInfoScreen = ({ onBack, shopData }) => {
  const { colors } = useTheme();
  return (
    <div>
      <Header title="가게 정보" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card>
          <ListItem title="가게명" right={<span style={{ color: colors.text }}>{shopData.shopName}</span>} showArrow={false} />
          <ListItem title="카테고리" right={<span style={{ color: colors.text }}>{shopData.category}</span>} showArrow={false} />
          <ListItem title="주소" right={<span style={{ color: colors.text }}>{shopData.address}</span>} showArrow={false} />
          <ListItem title="전화번호" right={<span style={{ color: colors.text }}>{shopData.phone}</span>} showArrow={false} />
        </Card>
      </div>
    </div>
  );
};

// 직원 관리
const EmployeesScreen = ({ onBack, shopData }) => {
  const { colors } = useTheme();
  const roleLabels = { [PLACE_ROLE_GRADE.ADMIN]: '관리자', [PLACE_ROLE_GRADE.MANAGER]: '매니저', [PLACE_ROLE_GRADE.STAFF]: '직원' };

  return (
    <div>
      <Header title="직원 관리" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {shopData.employees.map((emp, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>{emp.name}</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{emp.phone}</div>
              </div>
              <Badge variant={emp.grade === PLACE_ROLE_GRADE.ADMIN ? 'primary' : 'default'}>
                {roleLabels[emp.grade]}
              </Badge>
            </div>
          </Card>
        ))}
        <Button variant="secondary" fullWidth>+ 직원 초대</Button>
      </div>
    </div>
  );
};

// 정산 내역
const SettlementScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const settlements = [
    { month: '2024년 11월', amount: 1250000, status: 'completed', paidAt: '2024-12-15' },
    { month: '2024년 10월', amount: 980000, status: 'completed', paidAt: '2024-11-15' },
  ];

  return (
    <div>
      <Header title="정산 내역" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 이번 달 예상 */}
        <Card style={{ marginBottom: tokens.spacing.lg, background: colors.blue500 }}>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: tokens.fontSize.sm }}>12월 예상 정산금</div>
          <div style={{ color: '#FFFFFF', fontSize: tokens.fontSize.xxxl, fontWeight: 700, marginTop: tokens.spacing.sm }}>
            1,580,000원
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: tokens.fontSize.sm, marginTop: tokens.spacing.xs }}>
            1/15 지급 예정
          </div>
        </Card>

        {settlements.map((s, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: tokens.fontSize.md, color: colors.text }}>{s.month}</div>
                <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: tokens.spacing.xs }}>
                  {s.amount.toLocaleString()}원
                </div>
              </div>
              <Badge variant="success">지급완료</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 리뷰 관리 (별점 없음, 답글 기능 있음 - 백엔드 구조 반영)
const ReviewsScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const [replySheet, setReplySheet] = useState(null);
  const [replyText, setReplyText] = useState('');

  // 백엔드 PlaceReview 구조 반영: content, reviewImages, reviewReply
  const reviews = [
    {
      id: 1,
      userAccount: { name: '김**' },
      content: '빵이 정말 맛있어요! 다음에 또 올게요. 양도 푸짐하고 종류도 다양해서 만족합니다.',
      createdAt: '2024-12-05',
      reviewImages: [{ id: 1, imageUrl: 'photo1.jpg' }],
      reviewReply: null,
    },
    {
      id: 2,
      userAccount: { name: '이**' },
      content: '가성비 좋아요. 마감 할인이라 저렴하게 잘 샀어요!',
      createdAt: '2024-12-03',
      reviewImages: [],
      reviewReply: {
        content: '감사합니다! 또 방문해 주세요 😊',
        createdAt: '2024-12-03',
      },
    },
    {
      id: 3,
      userAccount: { name: '박**' },
      content: '픽업 시간에 맞춰 잘 받았어요. 신선하고 좋았습니다.',
      createdAt: '2024-12-01',
      reviewImages: [{ id: 2, imageUrl: 'photo2.jpg' }, { id: 3, imageUrl: 'photo3.jpg' }],
      reviewReply: null,
    },
  ];

  const handleReplySubmit = () => {
    // 실제로는 API 호출
    console.log('Reply to review', replySheet?.id, replyText);
    setReplySheet(null);
    setReplyText('');
  };

  return (
    <div>
      <Header title="리뷰 관리" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 리뷰 요약 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>전체 리뷰</div>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text, marginTop: 4 }}>
                {reviews.length}개
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>답글 작성</div>
              <div style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.blue500, marginTop: 4 }}>
                {reviews.filter(r => r.reviewReply).length}개
              </div>
            </div>
          </div>
        </Card>

        {reviews.length === 0 ? (
          <EmptyState
            icon="💬"
            title="아직 리뷰가 없어요"
            description="첫 리뷰를 기다리고 있어요"
          />
        ) : (
          reviews.map(review => (
            <Card key={review.id} style={{ marginBottom: tokens.spacing.md }}>
              {/* 리뷰 헤더 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                <span style={{ fontWeight: 600, color: colors.text }}>{review.userAccount.name}</span>
                <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{review.createdAt}</span>
              </div>

              {/* 리뷰 내용 */}
              <div style={{ fontSize: tokens.fontSize.md, color: colors.text, lineHeight: 1.6, marginBottom: tokens.spacing.md }}>
                {review.content}
              </div>

              {/* 사진 표시 */}
              {review.reviewImages.length > 0 && (
                <div style={{ display: 'flex', gap: tokens.spacing.sm, marginBottom: tokens.spacing.md }}>
                  {review.reviewImages.map((img, idx) => (
                    <div key={img.id} style={{
                      width: 60, height: 60,
                      borderRadius: tokens.radius.sm,
                      background: colors.gray200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                    }}>📷</div>
                  ))}
                </div>
              )}

              {/* 사장님 답글 */}
              {review.reviewReply ? (
                <div style={{
                  padding: tokens.spacing.md,
                  background: colors.blue50,
                  borderRadius: tokens.radius.md,
                  borderLeft: `3px solid ${colors.blue500}`,
                }}>
                  <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.blue600, marginBottom: 4 }}>
                    사장님 답글
                  </div>
                  <div style={{ fontSize: tokens.fontSize.md, color: colors.text, lineHeight: 1.5 }}>
                    {review.reviewReply.content}
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplySheet(review)}
                  style={{ padding: 0 }}
                >
                  답글 작성하기
                </Button>
              )}
            </Card>
          ))
        )}
      </div>

      {/* 답글 작성 바텀시트 */}
      <BottomSheet isOpen={!!replySheet} onClose={() => { setReplySheet(null); setReplyText(''); }} title="답글 작성">
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{
            padding: tokens.spacing.md,
            background: colors.gray50,
            borderRadius: tokens.radius.md,
            marginBottom: tokens.spacing.lg,
          }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: 4 }}>
              {replySheet?.userAccount.name}님의 리뷰
            </div>
            <div style={{ fontSize: tokens.fontSize.md, color: colors.text, lineHeight: 1.5 }}>
              {replySheet?.content}
            </div>
          </div>

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답글을 작성해 주세요"
            style={{
              width: '100%',
              minHeight: 120,
              padding: tokens.spacing.md,
              border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md,
              fontSize: tokens.fontSize.md,
              resize: 'none',
              outline: 'none',
              background: colors.bgCard,
              color: colors.text,
            }}
          />
        </div>
        <Button fullWidth onClick={handleReplySubmit} disabled={!replyText.trim()}>
          답글 등록
        </Button>
      </BottomSheet>
    </div>
  );
};

// 내 가게 미리보기 (소비자 화면 WebView)
const ShopPreviewScreen = ({ onBack, shopData }) => {
  const { colors } = useTheme();
  // 실제로는 shopData.placeId를 사용
  const previewUrl = 'https://www.luckymeal.io/customer/place/1875';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="내 가게 미리보기"
        onBack={onBack}
        right={
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: colors.blue500,
              fontSize: tokens.fontSize.sm,
              textDecoration: 'none',
            }}
          >
            새 탭에서 열기
          </a>
        }
      />
      <div style={{
        flex: 1,
        background: colors.gray100,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 안내 배너 */}
        <div style={{
          padding: tokens.spacing.md,
          background: colors.blue50,
          borderBottom: `1px solid ${colors.blue100}`,
        }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.blue600, textAlign: 'center' }}>
            👀 소비자에게 보이는 내 가게 페이지예요
          </div>
        </div>

        {/* iframe으로 실제 페이지 미리보기 */}
        <iframe
          src={previewUrl}
          style={{
            flex: 1,
            width: '100%',
            border: 'none',
          }}
          title="가게 미리보기"
        />
      </div>
    </div>
  );
};

// 가이드
const GuideScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const guides = [
    { icon: '🚀', title: '시작하기', desc: '럭키백 판매 시작하는 방법' },
    { icon: '📦', title: '주문 관리', desc: '예약, 확정, 픽업 완료 처리 방법' },
    { icon: '💵', title: '정산 안내', desc: '정산 주기와 수수료 안내' },
  ];

  return (
    <div>
      <Header title="사장님 가이드" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {guides.map((guide, idx) => (
          <Card key={idx} style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
              <div style={{ fontSize: 32 }}>{guide.icon}</div>
              <div>
                <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>{guide.title}</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{guide.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 문의하기
const ContactScreen = ({ onBack }) => {
  const { colors } = useTheme();
  return (
    <div>
      <Header title="문의하기" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: tokens.spacing.xl }}>💬</div>
        <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 600, color: colors.text, marginBottom: tokens.spacing.sm }}>
          도움이 필요하신가요?
        </div>
        <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary, marginBottom: tokens.spacing.xl, lineHeight: 1.6 }}>
          카카오톡 채널로 문의해 주세요.<br />
          평일 10:00 - 18:00 답변드려요.
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
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  // 시스템 테마 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const colors = isDark ? darkColors : lightColors;
  const toggleTheme = () => setIsDark(!isDark);

  const [shopData, setShopData] = useState({
    shopName: '행복한 베이커리',
    category: '베이커리',
    address: '서울시 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    dailySalesCount: 5,
    soldCount: 2,
    paidCount: 2,
    confirmedCount: 1,
    pickedUpCount: 3,
    isSoldOut: false,
    isClosed: false,
    luckyBagPrice: 3900,
    originalPrice: 7800,
    luckyBagDescription: '오늘의 빵 3-4종을 랜덤으로 담아드려요. 구성은 매일 달라져요!',
    pickupSlots: [
      { start: '14:00', end: '15:00', days: [0, 1, 2, 3, 4] },
      { start: '20:00', end: '21:00', days: [0, 1, 2, 3, 4, 5, 6] },
    ],
    employees: [
      { name: '홍길동', phone: '010-1234-5678', grade: PLACE_ROLE_GRADE.ADMIN },
      { name: '김직원', phone: '010-9876-5432', grade: PLACE_ROLE_GRADE.STAFF },
    ],
  });

  const navigate = (screen) => {
    if (['home', 'orders', 'settings'].includes(screen)) {
      setActiveTab(screen);
    }
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen(activeTab);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigate} shopData={shopData} setShopData={setShopData} />;
      case 'orders':
        return <OrdersScreen onNavigate={navigate} />;
      case 'settings':
        return <SettingsScreen onNavigate={navigate} shopData={shopData} />;
      case 'sales-history':
        return <SalesHistoryScreen onBack={goBack} />;
      case 'luckybag-settings':
        return <LuckyBagSettingsScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'pickup-settings':
        return <PickupSettingsScreen onBack={goBack} shopData={shopData} setShopData={setShopData} />;
      case 'shop-info':
        return <ShopInfoScreen onBack={goBack} shopData={shopData} />;
      case 'shop-preview':
        return <ShopPreviewScreen onBack={goBack} shopData={shopData} />;
      case 'employees':
        return <EmployeesScreen onBack={goBack} shopData={shopData} />;
      case 'settlement':
        return <SettlementScreen onBack={goBack} />;
      case 'reviews':
        return <ReviewsScreen onBack={goBack} />;
      case 'guide':
        return <GuideScreen onBack={goBack} />;
      case 'contact':
        return <ContactScreen onBack={goBack} />;
      default:
        return <HomeScreen onNavigate={navigate} shopData={shopData} setShopData={setShopData} />;
    }
  };

  const showBottomNav = ['home', 'orders', 'settings'].includes(currentScreen);

  const BOTTOM_NAV_HEIGHT = 60;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      <div style={{
        maxWidth: 480,
        margin: '0 auto',
        minHeight: '100vh',
        background: colors.bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background 0.3s',
        position: 'relative',
      }}>
        <div style={{ paddingBottom: showBottomNav ? BOTTOM_NAV_HEIGHT : 0 }}>
          {renderScreen()}
        </div>
        {showBottomNav && <BottomNav activeTab={activeTab} onChange={navigate} />}
      </div>
    </ThemeContext.Provider>
  );
}
