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
          background: 'none', border: 'none', cursor: 'pointer', padding: tokens.spacing.sm,
          color: activeTab === tab.id ? colors.green500 : colors.textTertiary,
        }}>
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontSize: tokens.fontSize.xs, fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </div>
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

// 인라인 편집 필드
const InlineEditField = ({ value, onChange, onSave, isEditing, setEditing, multiline, placeholder }) => {
  const { colors } = useTheme();
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => { setTempValue(value); }, [value]);

  if (isEditing) {
    const inputStyle = {
      width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`,
      borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, outline: 'none',
      background: colors.bgCard, color: colors.text, resize: 'none',
    };
    return (
      <div>
        {multiline ? (
          <textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)}
            style={{ ...inputStyle, minHeight: 80 }} placeholder={placeholder} autoFocus />
        ) : (
          <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)}
            style={inputStyle} placeholder={placeholder} autoFocus />
        )}
        <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
          <Button size="sm" onClick={() => { onChange(tempValue); onSave?.(); setEditing(false); }}>저장</Button>
          <Button size="sm" variant="secondary" onClick={() => { setTempValue(value); setEditing(false); }}>취소</Button>
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ color: colors.text, lineHeight: 1.5 }}>{value || placeholder}</span>
      <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm, marginLeft: tokens.spacing.sm }}>수정</span>
    </div>
  );
};

// ============================================
// 상수
// ============================================
const ORDER_STATUS = { PAID: 'PAID', CONFIRMED: 'CONFIRMED', USER_CANCEL: 'USER_CANCEL', PLACE_CANCEL: 'PLACE_CANCEL' };
const PLACE_ROLE_GRADE = { ADMIN: 0, MANAGER: 1, STAFF: 2 };
const DISCOUNT_RATE = 0.5; // 50% 고정 할인율
const PLATFORM_FEE = 0.098;
const PAYMENT_FEE = 0.03;
const CO2_PER_BAG = 2.5; // kg CO2 per lucky bag

// ============================================
// 홈 화면 - 대시보드 포함
// ============================================
const HomeScreen = ({ onNavigate, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);

  // 총 판매 통계
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
          {/* CO2 절감 */}
          <div style={{
            background: colors.bgCard,
            borderRadius: 20,
            padding: tokens.spacing.lg,
            textAlign: 'center',
            boxShadow: `0 2px 8px ${colors.shadow}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22, margin: '0 auto',
              background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: tokens.spacing.sm,
            }}>
              <span style={{ fontSize: 20 }}>🌿</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
              {totalStats.co2Saved.toFixed(0)}
              <span style={{ fontSize: tokens.fontSize.xs, fontWeight: 500, color: colors.textTertiary }}>kg</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 2 }}>CO₂ 절감</div>
          </div>

          {/* 판매 개수 */}
          <div style={{
            background: colors.bgCard,
            borderRadius: 20,
            padding: tokens.spacing.lg,
            textAlign: 'center',
            boxShadow: `0 2px 8px ${colors.shadow}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22, margin: '0 auto',
              background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: tokens.spacing.sm,
            }}>
              <span style={{ fontSize: 20 }}>🎁</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
              {totalStats.totalSold}
              <span style={{ fontSize: tokens.fontSize.xs, fontWeight: 500, color: colors.textTertiary }}>개</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 2 }}>럭키백 판매</div>
          </div>

          {/* 누적 매출 */}
          <div style={{
            background: colors.bgCard,
            borderRadius: 20,
            padding: tokens.spacing.lg,
            textAlign: 'center',
            boxShadow: `0 2px 8px ${colors.shadow}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22, margin: '0 auto',
              background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: tokens.spacing.sm,
            }}>
              <span style={{ fontSize: 20 }}>💰</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
              {(totalStats.totalRevenue / 10000).toFixed(0)}
              <span style={{ fontSize: tokens.fontSize.xs, fontWeight: 500, color: colors.textTertiary }}>만원</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary, marginTop: 2 }}>누적 매출</div>
          </div>
        </div>
      </div>

      {/* 오늘 현황 카드 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
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

      {/* 판매 종료 토글 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Toggle checked={shopData.isSoldOut} onChange={(v) => setShopData({ ...shopData, isSoldOut: v })} label="오늘 판매 종료" />
      </Card>

      {/* 확정 전 주문 알림 */}
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

      {/* 오늘의 수량 변경 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }} onClick={() => setShowQuantitySheet(true)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>오늘의 럭키백 수량</div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: 4 }}>{shopData.dailySalesCount}개</div>
          </div>
          <Button variant="secondary" size="sm">변경</Button>
        </div>
      </Card>

      {/* 빠른 액션 */}
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
// 주문 관리 화면 - 토글 확장 UI
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
              {/* 주문 헤더 - 클릭하면 토글 */}
              <div onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                style={{ padding: tokens.spacing.xl, cursor: 'pointer' }}>
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

              {/* 확장된 상세 정보 */}
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

                  {/* 액션 버튼 */}
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
// 판매 내역 화면 - 취소 건 포함 + 필터
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
          const filteredOrders = hideCanceled
            ? day.orders.filter(o => o.status === 'completed')
            : day.orders;
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
                      <div style={{ fontWeight: 600, color: order.status !== 'completed' ? colors.textTertiary : colors.text,
                        textDecoration: order.status !== 'completed' ? 'line-through' : 'none' }}>
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
      { icon: '🎁', title: '럭키백 설정', subtitle: '가격, 구성, 수량', screen: 'luckybag-settings' },
      { icon: '📅', title: '픽업 시간', subtitle: '요일별 시간 및 휴무 설정', screen: 'pickup-settings' },
    ]},
    { title: '가게 관리', items: [
      { icon: '🏪', title: '가게 정보', subtitle: '기본 정보, 사진', screen: 'shop-info' },
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
      {/* 소비자 앱으로 전환하기 버튼 */}
      <div style={{ padding: `${tokens.spacing.lg}px ${tokens.spacing.lg}px 0` }}>
        <button onClick={() => window.open('https://www.luckymeal.io', '_blank')} style={{
          width: '100%',
          padding: tokens.spacing.lg,
          background: colors.gray100,
          border: 'none',
          borderRadius: tokens.radius.lg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          cursor: 'pointer',
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
// 럭키백 설정 - 50% 고정 할인, 정가만 조절, 구성안내 인라인 수정
// ============================================
const LuckyBagSettingsScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [editingPrice, setEditingPrice] = useState(false);
  const [editingQty, setEditingQty] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [tempPriceStr, setTempPriceStr] = useState(String(shopData.originalPrice));

  const salePrice = Math.round(shopData.originalPrice * (1 - DISCOUNT_RATE));
  const netAmount = Math.round(salePrice * (1 - PLATFORM_FEE - PAYMENT_FEE));

  const handlePriceSave = () => {
    const numPrice = parseInt(tempPriceStr.replace(/[^0-9]/g, ''), 10) || 1000;
    const validPrice = Math.max(1000, numPrice);
    setShopData({ ...shopData, originalPrice: validPrice, luckyBagPrice: Math.round(validPrice * 0.5) });
    setEditingPrice(false);
  };

  return (
    <div>
      <Header title="럭키백 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 가격 설정 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>럭키백 정가</div>
          {editingPrice ? (
            <div>
              <div style={{ position: 'relative', marginBottom: tokens.spacing.md }}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={tempPriceStr}
                  onChange={(e) => setTempPriceStr(e.target.value.replace(/[^0-9]/g, ''))}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: `${tokens.spacing.lg}px ${tokens.spacing.md}px`,
                    paddingRight: 40,
                    fontSize: tokens.fontSize.xxl,
                    fontWeight: 700,
                    border: `2px solid ${colors.green500}`,
                    borderRadius: tokens.radius.md,
                    background: colors.bgCard,
                    color: colors.text,
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: tokens.spacing.lg,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: tokens.fontSize.lg,
                  color: colors.textTertiary,
                }}>원</span>
              </div>
              <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                <Button size="sm" onClick={handlePriceSave}>저장</Button>
                <Button size="sm" variant="secondary" onClick={() => { setTempPriceStr(String(shopData.originalPrice)); setEditingPrice(false); }}>취소</Button>
              </div>
            </div>
          ) : (
            <div onClick={() => { setTempPriceStr(String(shopData.originalPrice)); setEditingPrice(true); }} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>{shopData.originalPrice.toLocaleString()}원</div>
              </div>
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

          <div style={{ marginTop: tokens.spacing.md, fontSize: tokens.fontSize.xs, color: colors.textTertiary }}>
            * 플랫폼 수수료 9.8% + 결제 수수료 3% 공제
          </div>
        </Card>

        {/* 수량 설정 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>기본 판매 수량</div>
          {editingQty ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, marginBottom: tokens.spacing.md }}>
                <button onClick={() => setShopData({ ...shopData, dailySalesCount: Math.max(1, shopData.dailySalesCount - 1) })}
                  style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}>-</button>
                <span style={{ fontSize: tokens.fontSize.xxxl, fontWeight: 700, color: colors.text, flex: 1, textAlign: 'center' }}>{shopData.dailySalesCount}개</span>
                <button onClick={() => setShopData({ ...shopData, dailySalesCount: shopData.dailySalesCount + 1 })}
                  style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 20, cursor: 'pointer', color: colors.text }}>+</button>
              </div>
              <Button size="sm" onClick={() => setEditingQty(false)}>완료</Button>
            </div>
          ) : (
            <div onClick={() => setEditingQty(true)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>{shopData.dailySalesCount}개</span>
              <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
            </div>
          )}
        </Card>

        {/* 구성 안내 - 인라인 수정 */}
        <Card>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>구성 안내</div>
          <InlineEditField
            value={shopData.luckyBagDescription}
            onChange={(v) => setShopData({ ...shopData, luckyBagDescription: v })}
            isEditing={editingDesc}
            setEditing={setEditingDesc}
            multiline
            placeholder="럭키백 구성을 설명해주세요"
          />
        </Card>
      </div>
    </div>
  );
};

// ============================================
// 픽업 시간 설정 - 요일/시간 + 특별 휴무
// ============================================
const PickupSettingsScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showHolidaySheet, setShowHolidaySheet] = useState(false);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 백엔드 PlacePickupDay 구조: dayOfWeek (0-6), isOpen, placePickupTimes
  const [pickupDays, setPickupDays] = useState([
    { dayOfWeek: 1, isOpen: true, times: [{ start: '14:00', end: '15:00' }, { start: '20:00', end: '21:00' }] },
    { dayOfWeek: 2, isOpen: true, times: [{ start: '14:00', end: '15:00' }, { start: '20:00', end: '21:00' }] },
    { dayOfWeek: 3, isOpen: true, times: [{ start: '14:00', end: '15:00' }, { start: '20:00', end: '21:00' }] },
    { dayOfWeek: 4, isOpen: true, times: [{ start: '14:00', end: '15:00' }, { start: '20:00', end: '21:00' }] },
    { dayOfWeek: 5, isOpen: true, times: [{ start: '14:00', end: '15:00' }, { start: '20:00', end: '21:00' }] },
    { dayOfWeek: 6, isOpen: true, times: [{ start: '20:00', end: '21:00' }] },
    { dayOfWeek: 0, isOpen: false, times: [] },
  ]);

  // 특별 휴무일 (PlaceSpecialPickupDate)
  const [specialHolidays, setSpecialHolidays] = useState([
    { date: '2024-12-25', isOpen: false, reason: '크리스마스' },
    { date: '2025-01-01', isOpen: false, reason: '신정' },
  ]);

  const toggleDay = (dayOfWeek) => {
    setPickupDays(pickupDays.map(d => d.dayOfWeek === dayOfWeek ? { ...d, isOpen: !d.isOpen } : d));
  };

  return (
    <div>
      <Header title="픽업 시간 설정" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <div style={{ padding: tokens.spacing.md, background: colors.green50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.green600 }}>
            설정한 요일과 시간에 고객이 픽업 예약을 할 수 있어요
          </div>
        </div>

        {/* 요일별 설정 */}
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>요일별 운영</div>
          {pickupDays.sort((a, b) => (a.dayOfWeek === 0 ? 7 : a.dayOfWeek) - (b.dayOfWeek === 0 ? 7 : b.dayOfWeek)).map(day => (
            <Card key={day.dayOfWeek} style={{ marginBottom: tokens.spacing.sm, padding: tokens.spacing.lg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                  <span style={{ fontSize: tokens.fontSize.lg, fontWeight: 600, color: day.isOpen ? colors.text : colors.textTertiary }}>
                    {weekdays[day.dayOfWeek]}요일
                  </span>
                  {day.isOpen && day.times.length > 0 && (
                    <span style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>
                      {day.times.map(t => `${t.start}-${t.end}`).join(', ')}
                    </span>
                  )}
                </div>
                <Toggle checked={day.isOpen} onChange={() => toggleDay(day.dayOfWeek)} />
              </div>
            </Card>
          ))}
        </div>

        {/* 특별 휴무일 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
            <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary }}>이번 달 특별 휴무</span>
            <Button size="sm" variant="ghost" onClick={() => setShowHolidaySheet(true)}>+ 추가</Button>
          </div>
          {specialHolidays.length === 0 ? (
            <div style={{ padding: tokens.spacing.xl, textAlign: 'center', color: colors.textTertiary }}>
              등록된 휴무일이 없어요
            </div>
          ) : (
            specialHolidays.map((h, idx) => (
              <Card key={idx} style={{ marginBottom: tokens.spacing.sm, padding: tokens.spacing.lg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: tokens.fontSize.md, fontWeight: 500, color: colors.text }}>{h.date}</div>
                    <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>{h.reason}</div>
                  </div>
                  <Badge variant="danger">휴무</Badge>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <BottomSheet isOpen={showHolidaySheet} onClose={() => setShowHolidaySheet(false)} title="특별 휴무일 추가">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ marginBottom: tokens.spacing.lg }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>날짜</div>
            <input type="date" style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
            }} />
          </div>
          <div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>사유 (선택)</div>
            <input type="text" placeholder="예: 크리스마스, 재고 정리" style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
            }} />
          </div>
        </div>
        <Button fullWidth onClick={() => setShowHolidaySheet(false)}>추가하기</Button>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 가게 정보 - 인라인 수정
// ============================================
const ShopInfoScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [editingField, setEditingField] = useState(null);

  const fields = [
    { key: 'shopName', label: '가게명' },
    { key: 'category', label: '카테고리' },
    { key: 'address', label: '주소' },
    { key: 'phone', label: '전화번호' },
  ];

  return (
    <div>
      <Header title="가게 정보" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <Card>
          {fields.map((field, idx) => (
            <div key={field.key} style={{
              padding: `${tokens.spacing.lg}px 0`,
              borderBottom: idx < fields.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>{field.label}</div>
              <InlineEditField
                value={shopData[field.key]}
                onChange={(v) => setShopData({ ...shopData, [field.key]: v })}
                isEditing={editingField === field.key}
                setEditing={(editing) => setEditingField(editing ? field.key : null)}
              />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ============================================
// 직원 관리 - 이메일 초대 + 권한 선택
// ============================================
const EmployeesScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showInviteSheet, setShowInviteSheet] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState(PLACE_ROLE_GRADE.STAFF);

  const roleLabels = { [PLACE_ROLE_GRADE.ADMIN]: '관리자', [PLACE_ROLE_GRADE.MANAGER]: '매니저', [PLACE_ROLE_GRADE.STAFF]: '직원' };

  const handleInvite = () => {
    if (inviteEmail) {
      setShopData({
        ...shopData,
        employees: [...shopData.employees, { name: inviteEmail.split('@')[0], phone: inviteEmail, grade: inviteRole }]
      });
      setInviteEmail('');
      setShowInviteSheet(false);
    }
  };

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
        <Button variant="secondary" fullWidth onClick={() => setShowInviteSheet(true)}>+ 직원 초대</Button>
      </div>

      <BottomSheet isOpen={showInviteSheet} onClose={() => setShowInviteSheet(false)} title="직원 초대">
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ marginBottom: tokens.spacing.lg }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>이메일</div>
            <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="직원의 이메일을 입력하세요" style={{
              width: '100%', padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
              borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text,
            }} />
          </div>
          <div>
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
        </div>
        <Button fullWidth onClick={handleInvite} disabled={!inviteEmail}>초대하기</Button>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 정산 내역 - 익월 첫 영업일 + 2026년 세무 변경 안내
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
        {/* 2026년 세무 변경 안내 배너 */}
        <Card style={{ marginBottom: tokens.spacing.lg, background: colors.green50, border: `1px solid ${colors.green100}` }} onClick={() => setShowTaxInfo(true)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.spacing.md }}>
            <span style={{ fontSize: 24 }}>💡</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.green600, marginBottom: 4 }}>
                2026년 1월부터 세무 처리가 간편해져요
              </div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.green500 }}>
                세금계산서·현금영수증 발행, 이제 안 하셔도 돼요
              </div>
            </div>
            <span style={{ color: colors.green500 }}>›</span>
          </div>
        </Card>

        {/* 이번 달 예상 */}
        <Card style={{ marginBottom: tokens.spacing.lg, background: colors.green500 }}>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: tokens.fontSize.sm }}>12월 예상 정산금</div>
          <div style={{ color: '#FFFFFF', fontSize: tokens.fontSize.xxxl, fontWeight: 700, marginTop: tokens.spacing.sm }}>1,580,000원</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: tokens.fontSize.sm, marginTop: tokens.spacing.xs }}>
            1월 첫 영업일 지급 예정
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
                <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>
                  {s.paidAt} 지급
                </div>
              </div>
              <Badge variant="success">지급완료</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* 세무 변경 상세 안내 */}
      <BottomSheet isOpen={showTaxInfo} onClose={() => setShowTaxInfo(false)} title="2026년 세무 처리 변경 안내">
        <div style={{ lineHeight: 1.7 }}>
          <div style={{ padding: tokens.spacing.lg, background: colors.green50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
            <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.green600, marginBottom: tokens.spacing.sm }}>
              매달 하시던 세금계산서·현금영수증 발행, 이제 안 하셔도 돼요.
            </div>
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

          <div style={{ fontSize: tokens.fontSize.md, fontWeight: 700, color: colors.text, marginBottom: tokens.spacing.md }}>예시로 볼게요</div>
          <div style={{ padding: tokens.spacing.lg, background: colors.gray50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>
              고객 결제금액 100만원, 럭키밀 수수료 20만원일 때
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.text }}>
              <strong>지금까지</strong> → 80만원에 대해 세금계산서 직접 발행<br />
              <strong>앞으로는</strong> → 100만원에 대해 신고자료에 취합, 수수료 20만원은 럭키밀이 비용 처리
            </div>
          </div>

          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textSecondary, marginBottom: tokens.spacing.lg }}>
            * 2026년 1월 1일 픽업 건부터 적용됩니다.<br />
            * 간이/일반/법인 사업자 모두 동일 적용
          </div>

          <Button fullWidth variant="secondary" onClick={() => setShowTaxInfo(false)}>확인</Button>
        </div>
      </BottomSheet>
    </div>
  );
};

// ============================================
// 정산 정보 설정 - 계좌, 사업자 정보
// ============================================
const SettlementInfoScreen = ({ onBack, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [editingField, setEditingField] = useState(null);

  // 정산 정보 (초기값)
  const [settlementInfo, setSettlementInfo] = useState({
    accountHolder: shopData.settlementInfo?.accountHolder || '',
    bankName: shopData.settlementInfo?.bankName || '',
    accountNumber: shopData.settlementInfo?.accountNumber || '',
    phone: shopData.settlementInfo?.phone || '',
    businessType: shopData.settlementInfo?.businessType || 'individual', // individual or corporate
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
        {/* 사업자 유형 선택 */}
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>사업자 유형</div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            {[
              { value: 'individual', label: '개인 사업자' },
              { value: 'corporate', label: '법인 사업자' },
            ].map(type => (
              <button key={type.value} onClick={() => handleSave('businessType', type.value)} style={{
                flex: 1, padding: tokens.spacing.md,
                border: `2px solid ${settlementInfo.businessType === type.value ? colors.green500 : colors.border}`,
                borderRadius: tokens.radius.md,
                background: settlementInfo.businessType === type.value ? colors.green50 : colors.bgCard,
                color: settlementInfo.businessType === type.value ? colors.green600 : colors.text,
                fontWeight: 600, cursor: 'pointer',
              }}>
                {type.label}
              </button>
            ))}
          </div>
        </Card>

        {/* 계좌 정보 */}
        <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary, marginBottom: tokens.spacing.sm, paddingLeft: 4 }}>계좌 정보</div>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          {fields.slice(0, 3).map((field, idx) => (
            <div key={field.key} style={{
              padding: `${tokens.spacing.lg}px 0`,
              borderBottom: idx < 2 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>{field.label}</div>
              {editingField === field.key ? (
                <div>
                  <input
                    type="text"
                    inputMode={field.inputMode || 'text'}
                    value={settlementInfo[field.key]}
                    onChange={(e) => setSettlementInfo({ ...settlementInfo, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    autoFocus
                    style={{
                      width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`,
                      borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
                      color: colors.text, outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                    <Button size="sm" onClick={() => handleSave(field.key, settlementInfo[field.key])}>저장</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setEditingField(field.key)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: settlementInfo[field.key] ? colors.text : colors.textTertiary }}>
                    {settlementInfo[field.key] || field.placeholder}
                  </span>
                  <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
                </div>
              )}
            </div>
          ))}
        </Card>

        {/* 사업자 정보 */}
        <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary, marginBottom: tokens.spacing.sm, paddingLeft: 4 }}>사업자 정보</div>
        <Card style={{ marginBottom: tokens.spacing.lg }}>
          {fields.slice(4).map((field, idx) => (
            <div key={field.key} style={{
              padding: `${tokens.spacing.lg}px 0`,
              borderBottom: idx < fields.slice(4).length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>{field.label}</div>
              {editingField === field.key ? (
                <div>
                  <input
                    type="text"
                    inputMode={field.inputMode || 'text'}
                    value={settlementInfo[field.key]}
                    onChange={(e) => setSettlementInfo({ ...settlementInfo, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    autoFocus
                    style={{
                      width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`,
                      borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
                      color: colors.text, outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                    <Button size="sm" onClick={() => handleSave(field.key, settlementInfo[field.key])}>저장</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setEditingField(field.key)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: settlementInfo[field.key] ? colors.text : colors.textTertiary }}>
                    {settlementInfo[field.key] || field.placeholder}
                  </span>
                  <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
                </div>
              )}
            </div>
          ))}
        </Card>

        {/* 연락처 */}
        <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary, marginBottom: tokens.spacing.sm, paddingLeft: 4 }}>연락처</div>
        <Card>
          <div style={{ padding: `${tokens.spacing.lg}px 0` }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>휴대폰 번호</div>
            {editingField === 'phone' ? (
              <div>
                <input
                  type="tel"
                  inputMode="tel"
                  value={settlementInfo.phone}
                  onChange={(e) => setSettlementInfo({ ...settlementInfo, phone: e.target.value.replace(/[^0-9]/g, '') })}
                  placeholder="- 없이 숫자만 입력"
                  autoFocus
                  style={{
                    width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`,
                    borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard,
                    color: colors.text, outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                  <Button size="sm" onClick={() => handleSave('phone', settlementInfo.phone)}>저장</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                </div>
              </div>
            ) : (
              <div onClick={() => setEditingField('phone')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: settlementInfo.phone ? colors.text : colors.textTertiary }}>
                  {settlementInfo.phone || '- 없이 숫자만 입력'}
                </span>
                <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
              </div>
            )}
          </div>
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
                  style={{ width: '100%', minHeight: 80, padding: tokens.spacing.md, border: `1px solid ${colors.border}`,
                    borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, resize: 'none', background: colors.bgCard, color: colors.text, marginBottom: tokens.spacing.sm }} />
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
// 사장님 가이드 - 책자 느낌 타임라인 UI
// ============================================
const GuideScreen = ({ onBack }) => {
  const { colors } = useTheme();

  const guideColors = {
    step1: '#90908E',
    step2: '#578FFF',
    step3: '#16CC83',
    step4: '#16CC83',
  };

  return (
    <div>
      <Header title="사장님 가이드" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        {/* 책자 스타일 가이드 */}
        <div style={{
          background: '#F2F1ED',
          borderRadius: tokens.radius.lg,
          boxShadow: '0 4px 40px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}>
          {/* 헤더 */}
          <div style={{
            padding: tokens.spacing.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <div style={{ width: 24, height: 24, background: colors.green500, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700 }}>🌱</span>
              </div>
              <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 800, color: colors.green600 }}>럭키밀 운영 가이드</span>
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: '#545453', textAlign: 'right' }}>
              카카오채널 문의<br />24시간 연중무휴
            </div>
          </div>

          {/* 타임라인 컨텐츠 */}
          <div style={{ background: '#FFFFFF', borderRadius: tokens.radius.lg, margin: `0 ${tokens.spacing.sm}px ${tokens.spacing.sm}px`, padding: tokens.spacing.lg }}>
            {/* Step 1: 예약 오픈 */}
            <div style={{ display: 'flex', marginBottom: tokens.spacing.xl }}>
              <div style={{ width: 60, flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 29, top: 24, bottom: -20, width: 2, background: '#E3E3DF' }} />
                <div style={{ fontSize: tokens.fontSize.xs, color: '#545453', fontWeight: 700 }}>:</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                  background: '#FFFFFF', border: '0.5px solid #C6C6C4', borderRadius: 8, marginBottom: tokens.spacing.sm,
                }}>
                  <div style={{ width: 14, height: 14, background: guideColors.step1, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 8, color: '#FFFFFF', fontWeight: 600 }}>1</span>
                  </div>
                  <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#545453' }}>예약 오픈</span>
                </div>
                <div style={{ fontSize: tokens.fontSize.sm, color: '#545453' }}>손님·사장님 모두 자유롭게 취소 가능</div>
              </div>
            </div>

            {/* Step 2: 자동 확정 */}
            <div style={{ display: 'flex', marginBottom: tokens.spacing.xl }}>
              <div style={{ width: 60, flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 29, top: 0, bottom: -20, width: 2, background: guideColors.step2 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px',
                  background: '#E6F2FF', border: '0.5px solid #BBD4FF', borderRadius: 8, marginBottom: tokens.spacing.sm,
                }}>
                  <div style={{ width: 14, height: 14, background: guideColors.step2, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 8, color: '#FFFFFF', fontWeight: 600 }}>2</span>
                  </div>
                  <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#545453' }}>자동 확정</span>
                  <span style={{ fontSize: tokens.fontSize.xs, color: guideColors.step2, background: '#FFFFFF', border: `1px solid #BBD4FF`, padding: '2px 6px', borderRadius: 4 }}>
                    픽업시작 30분 전
                  </span>
                </div>
                <div style={{ fontSize: tokens.fontSize.sm, color: '#545453', marginBottom: 4 }}>필요한 수량만큼 럭키백을 준비해주세요</div>
                <div style={{ fontSize: tokens.fontSize.sm, color: '#545453' }}>확정 이후에는 양쪽 모두 주문 취소 불가</div>

                {/* 문제 발생 시 */}
                <div style={{ background: '#F9F8F5', borderRadius: 8, padding: tokens.spacing.md, marginTop: tokens.spacing.md }}>
                  <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#545453', marginBottom: tokens.spacing.sm }}>문제 발생 시 취소</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: '#545453' }}>
                    1. 고객에게 미리 연락<br />
                    2. 이미 찾아왔다면, '주문코드' 기억<br />
                    3. 럭키밀 고객센터 문의
                  </div>
                </div>
              </div>
            </div>

            {/* 픽업 시작 전 손님 도착 */}
            <div style={{ display: 'flex', marginBottom: tokens.spacing.lg }}>
              <div style={{ width: 60, flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 29, top: 0, bottom: -20, width: 2, background: '#E3E3DF' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ borderLeft: `2px solid #ABABA9`, paddingLeft: tokens.spacing.sm }}>
                  <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#6D6D6B' }}>픽업 시작 전 손님 도착 시</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: '#6D6D6B' }}>"조금만 기다려주세요" 안내</div>
                </div>
              </div>
            </div>

            {/* Step 3: 픽업 시작 */}
            <div style={{ display: 'flex', marginBottom: tokens.spacing.xl }}>
              <div style={{ width: 60, flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 29, top: 0, bottom: -20, width: 2, background: guideColors.step3 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                  background: '#FFFFFF', border: '0.5px solid #C6C6C4', borderRadius: 8, marginBottom: tokens.spacing.sm,
                }}>
                  <div style={{ width: 14, height: 14, background: guideColors.step3, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 8, color: '#FFFFFF', fontWeight: 600 }}>3</span>
                  </div>
                  <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#545453' }}>픽업 시작</span>
                </div>
                <div style={{ fontSize: tokens.fontSize.sm, color: '#545453' }}>
                  1. 손님의 주문 코드 확인<br />
                  2. 구매 수량 확인<br />
                  3. 판매가에 맞게 담겼는지 확인
                </div>
              </div>
            </div>

            {/* Step 4: 픽업 종료 */}
            <div style={{ display: 'flex', marginBottom: tokens.spacing.lg }}>
              <div style={{ width: 60, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                  background: '#FFFFFF', border: '0.5px solid #C6C6C4', borderRadius: 8, marginBottom: tokens.spacing.sm,
                }}>
                  <div style={{ width: 14, height: 14, background: guideColors.step4, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 8, color: '#FFFFFF', fontWeight: 600 }}>4</span>
                  </div>
                  <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#545453' }}>픽업 종료</span>
                </div>
              </div>
            </div>

            {/* 손님 미수령 시 */}
            <div style={{ display: 'flex' }}>
              <div style={{ width: 60, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ borderLeft: `2px solid #ABABA9`, paddingLeft: tokens.spacing.sm }}>
                  <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 700, color: '#6D6D6B' }}>손님 미수령 시</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: '#6D6D6B' }}>자체 처리 후 마감 (정산금은 정상 지급)</div>
                </div>
              </div>
            </div>
          </div>
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
    employees: [
      { name: '홍길동', phone: '010-1234-5678', grade: PLACE_ROLE_GRADE.ADMIN },
      { name: '김직원', phone: '010-9876-5432', grade: PLACE_ROLE_GRADE.STAFF },
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
        <div style={{ paddingBottom: showBottomNav ? 60 : 0 }}>{renderScreen()}</div>
        {showBottomNav && <BottomNav activeTab={activeTab} onChange={navigate} />}
      </div>
    </ThemeContext.Provider>
  );
}
