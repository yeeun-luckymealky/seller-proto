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
  { id: 1, name: '샐러드', emoji: '🥗' },
  { id: 2, name: '피자', emoji: '🍕' },
  { id: 3, name: '한식', emoji: '🍚' },
  { id: 4, name: '디저트', emoji: '🍰' },
  { id: 5, name: '빵', emoji: '🥐' },
  { id: 6, name: '과일', emoji: '🍎' },
  { id: 7, name: '식사빵', emoji: '🥖' },
];

// 한국 은행 목록
const KOREAN_BANKS = [
  { value: 'KB', label: 'KB국민은행' },
  { value: 'SHINHAN', label: '신한은행' },
  { value: 'WOORI', label: '우리은행' },
  { value: 'HANA', label: '하나은행' },
  { value: 'NH', label: 'NH농협은행' },
  { value: 'IBK', label: 'IBK기업은행' },
  { value: 'SC', label: 'SC제일은행' },
  { value: 'CITI', label: '한국씨티은행' },
  { value: 'KAKAO', label: '카카오뱅크' },
  { value: 'TOSS', label: '토스뱅크' },
  { value: 'KBANK', label: '케이뱅크' },
  { value: 'DGB', label: 'DGB대구은행' },
  { value: 'BNK_BUSAN', label: 'BNK부산은행' },
  { value: 'BNK_KYUNGNAM', label: 'BNK경남은행' },
  { value: 'GWANGJU', label: '광주은행' },
  { value: 'JEONBUK', label: '전북은행' },
  { value: 'JEJU', label: '제주은행' },
  { value: 'SUHYUP', label: '수협은행' },
  { value: 'SHINHYUP', label: '신협' },
  { value: 'SAEMAUL', label: '새마을금고' },
  { value: 'POST', label: '우체국' },
  { value: 'CUSTOM', label: '직접 입력' },
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

// 토스 스타일 아이콘 SVG 컴포넌트
const IconHome = ({ active, color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" />
    <path d="M9 21V14H15V21" stroke={active ? '#FFFFFF' : color} strokeWidth="2" />
  </svg>
);

const IconOrder = ({ active, color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" stroke={active ? '#FFFFFF' : color} />
    <line x1="7" y1="12" x2="17" y2="12" stroke={active ? '#FFFFFF' : color} />
    <line x1="7" y1="16" x2="12" y2="16" stroke={active ? '#FFFFFF' : color} />
  </svg>
);

const IconSettings = ({ active, color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    {active && <>
      <circle cx="8" cy="6" r="2" fill={color} />
      <circle cx="16" cy="12" r="2" fill={color} />
      <circle cx="10" cy="18" r="2" fill={color} />
    </>}
  </svg>
);

const BottomNav = ({ activeTab, onChange }) => {
  const { colors } = useTheme();
  const tabs = [
    { id: 'home', label: '홈', Icon: IconHome },
    { id: 'orders', label: '주문', Icon: IconOrder },
    { id: 'settings', label: '전체', Icon: IconSettings },
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)', maxWidth: 400, zIndex: 100,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 16px',
        background: colors.bgCard, borderRadius: 50,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const iconColor = isActive ? colors.gray800 : colors.gray400;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 20px',
            }}>
              <tab.Icon active={isActive} color={iconColor} />
              <span style={{
                fontSize: 11, fontWeight: isActive ? 600 : 400,
                color: isActive ? colors.gray800 : colors.gray400,
              }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 플로팅 챗봇 버튼
const FloatingChatButton = () => {
  return (
    <a
      href="http://pf.kakao.com/_xiJxmxdG/chat"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 100,
        right: 16,
        width: 52,
        height: 52,
        borderRadius: 26,
        background: '#FEE500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 99,
        textDecoration: 'none',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#3C1E1E">
        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.62 1.69 4.94 4.27 6.38L5 21l4.41-2.31C10.25 18.89 11.11 19 12 19c5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
      </svg>
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
// 홈 화면 - 사장님용
// ============================================
const HomeScreen = ({ onNavigate, shopData, setShopData }) => {
  const { colors } = useTheme();
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);

  // 오늘 픽업 시간 (예: 19:00-20:00)
  const pickupStartTime = '19:00';
  const pickupEndTime = '20:00';

  // 타임라인 계산
  const getTimelineSteps = () => {
    const [startHour, startMin] = pickupStartTime.split(':').map(Number);
    const reserveOpenTime = `어제 ${startHour - 1}:${String(startMin + 30).padStart(2, '0')}`;
    const confirmTime = `오늘 ${startHour - 1}:${String(startMin + 30).padStart(2, '0')}`;

    // 현재 진행 상태 (데모용)
    const currentStep = 1; // 0: 예약오픈 전, 1: 예약 중, 2: 확정됨, 3: 픽업 중, 4: 마감

    return [
      { id: 0, label: '예약 오픈', time: reserveOpenTime, desc: '고객이 예약할 수 있어요' },
      { id: 1, label: '확정', time: confirmTime, desc: '자동 확정돼요' },
      { id: 2, label: '픽업 시작', time: `오늘 ${pickupStartTime}`, desc: '고객이 방문해요' },
      { id: 3, label: '픽업 마감', time: `오늘 ${pickupEndTime}`, desc: '판매 종료' },
    ];
  };

  const timelineSteps = getTimelineSteps();
  const currentStep = 1; // 현재 예약 진행 중

  const totalStats = {
    co2Saved: shopData.totalSold * CO2_PER_BAG,
    totalSold: shopData.totalSold,
    totalRevenue: shopData.totalRevenue,
  };

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* 사장님 인사 */}
      <div style={{ padding: `${tokens.spacing.xl}px ${tokens.spacing.lg}px ${tokens.spacing.md}px` }}>
        <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text }}>
          안녕하세요, 사장님
        </div>
        <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary, marginTop: 4 }}>
          {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
        </div>
      </div>

      {/* 오늘 현황 타임라인 */}
      <Card style={{ margin: `${tokens.spacing.sm}px ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>오늘의 럭키백</div>
        </div>

        {/* 타임라인 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: tokens.spacing.xl }}>
          {timelineSteps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isLast = idx === timelineSteps.length - 1;

            return (
              <div key={step.id} style={{ flex: 1, position: 'relative' }}>
                {/* 연결선 */}
                {!isLast && (
                  <div style={{
                    position: 'absolute', top: 10, left: '50%', right: '-50%',
                    height: 2, background: isCompleted ? colors.green500 : colors.gray200,
                    zIndex: 0,
                  }} />
                )}

                {/* 점 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: isCurrent ? 24 : 20, height: isCurrent ? 24 : 20,
                    borderRadius: '50%',
                    background: isCompleted || isCurrent ? colors.green500 : colors.bgCard,
                    border: `2px solid ${isCompleted || isCurrent ? colors.green500 : colors.gray300}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {(isCompleted || isCurrent) && (
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: '#FFFFFF' }} />
                    )}
                  </div>

                  {/* 라벨 */}
                  <div style={{
                    marginTop: tokens.spacing.sm, textAlign: 'center',
                    color: isCurrent ? colors.green600 : isCompleted ? colors.text : colors.textTertiary,
                    fontWeight: isCurrent ? 600 : 400, fontSize: tokens.fontSize.xs,
                  }}>
                    {step.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 현재 상태 설명 */}
        <div style={{
          padding: tokens.spacing.md, background: colors.green50, borderRadius: tokens.radius.md,
          border: `1px dashed ${colors.green500}`,
        }}>
          <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.green600 }}>
            {timelineSteps[currentStep].label}
          </div>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.green500, marginTop: 2 }}>
            {timelineSteps[currentStep].desc} · {timelineSteps[currentStep].time}
          </div>
        </div>

        {/* 수량 정보 */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: tokens.spacing.lg, padding: tokens.spacing.md, background: colors.gray50, borderRadius: tokens.radius.md }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>남은 수량</div>
            <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.green500 }}>
              {shopData.dailySalesCount - shopData.soldCount}개
              <span style={{ fontSize: tokens.fontSize.sm, fontWeight: 400, color: colors.textTertiary }}> / {shopData.dailySalesCount}개</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setShowQuantitySheet(true)}>수량 변경</Button>
        </div>
      </Card>

      {/* 대기 중인 주문 */}
      {shopData.paidCount > 0 && (
        <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px`, background: colors.blue50, border: `1px solid ${colors.blue100}` }} onClick={() => onNavigate('orders')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.blue600 }}>확정 대기 주문 {shopData.paidCount}건</div>
              <div style={{ fontSize: tokens.fontSize.sm, color: colors.blue500, marginTop: 4 }}>픽업 시간 전에 확정해 주세요</div>
            </div>
            <span style={{ color: colors.blue500, fontSize: 20 }}>›</span>
          </div>
        </Card>
      )}

      {/* 오늘 판매 종료 토글 */}
      <Card style={{ margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Toggle checked={shopData.isSoldOut} onChange={(v) => setShopData({ ...shopData, isSoldOut: v })} label="오늘 판매 마감하기" />
        {shopData.isSoldOut && (
          <div style={{ marginTop: tokens.spacing.sm, fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>
            마감하면 고객이 예약할 수 없어요
          </div>
        )}
      </Card>

      {/* 환경 기여 카드들 */}
      <div style={{ padding: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 600, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>
          사장님의 환경 기여
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: tokens.spacing.sm }}>
          <div style={{ background: colors.bgCard, borderRadius: tokens.radius.lg, padding: tokens.spacing.md, textAlign: 'center', boxShadow: `0 1px 3px ${colors.shadow}` }}>
            <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.green500 }}>
              {totalStats.co2Saved.toFixed(0)}
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary }}>kg CO₂ 절감</div>
          </div>
          <div style={{ background: colors.bgCard, borderRadius: tokens.radius.lg, padding: tokens.spacing.md, textAlign: 'center', boxShadow: `0 1px 3px ${colors.shadow}` }}>
            <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.orange500 }}>
              {totalStats.totalSold}
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary }}>개 럭키백 판매</div>
          </div>
          <div style={{ background: colors.bgCard, borderRadius: tokens.radius.lg, padding: tokens.spacing.md, textAlign: 'center', boxShadow: `0 1px 3px ${colors.shadow}` }}>
            <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.blue500 }}>
              {(totalStats.totalRevenue / 10000).toFixed(0)}
            </div>
            <div style={{ fontSize: tokens.fontSize.xs, color: colors.textTertiary }}>만원 매출</div>
          </div>
        </div>
      </div>

      {/* 바로가기 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md, margin: `0 ${tokens.spacing.lg}px ${tokens.spacing.lg}px` }}>
        <Card onClick={() => onNavigate('luckybag-settings')} style={{ padding: tokens.spacing.lg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: colors.orange50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.orange500}>
                <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4z"/>
              </svg>
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: colors.text }}>럭키백 설정</div>
          </div>
        </Card>
        <Card onClick={() => onNavigate('pickup-settings')} style={{ padding: tokens.spacing.lg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: colors.blue50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.blue500}>
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
              </svg>
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, fontWeight: 500, color: colors.text }}>픽업 시간</div>
          </div>
        </Card>
      </div>

      <BottomSheet isOpen={showQuantitySheet} onClose={() => setShowQuantitySheet(false)} title="오늘 럭키백 수량">
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>
            오늘 판매할 럭키백 수량을 설정해 주세요
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl, padding: tokens.spacing.xl, background: colors.gray50, borderRadius: tokens.radius.lg }}>
            <button onClick={() => setShopData({ ...shopData, dailySalesCount: Math.max(1, shopData.dailySalesCount - 1) })}
              style={{ width: 48, height: 48, borderRadius: 24, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 24, cursor: 'pointer', color: colors.text }}>−</button>
            <span style={{ fontSize: 40, fontWeight: 700, color: colors.text, minWidth: 60, textAlign: 'center' }}>{shopData.dailySalesCount}</span>
            <button onClick={() => setShopData({ ...shopData, dailySalesCount: shopData.dailySalesCount + 1 })}
              style={{ width: 48, height: 48, borderRadius: 24, border: `1px solid ${colors.gray300}`, background: colors.bgCard, fontSize: 24, cursor: 'pointer', color: colors.text }}>+</button>
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
const SettlementScreen = ({ onBack, shopData }) => {
  const { colors } = useTheme();
  const [showTaxInfo, setShowTaxInfo] = useState(false);
  const [showExportSheet, setShowExportSheet] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [exportMonth, setExportMonth] = useState('');

  const settlements = [
    {
      month: '2024년 11월',
      monthKey: '2024-11',
      amount: 1250000,
      status: 'completed',
      paidAt: '2024-12-02',
      details: [
        { pickupDate: '2024-11-08', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 2, transactionAmount: 7800, platformFee: 764, paymentFee: 234, settlementAmount: 6802 },
        { pickupDate: '2024-11-10', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 3, transactionAmount: 11700, platformFee: 1146, paymentFee: 351, settlementAmount: 10203 },
        { pickupDate: '2024-11-14', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 5, transactionAmount: 19500, platformFee: 1911, paymentFee: 585, settlementAmount: 17004 },
        { pickupDate: '2024-11-18', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 4, transactionAmount: 15600, platformFee: 1528, paymentFee: 468, settlementAmount: 13604 },
        { pickupDate: '2024-11-22', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 6, transactionAmount: 23400, platformFee: 2293, paymentFee: 702, settlementAmount: 20405 },
        { pickupDate: '2024-11-25', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 3, transactionAmount: 11700, platformFee: 1146, paymentFee: 351, settlementAmount: 10203 },
        { pickupDate: '2024-11-28', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 2, transactionAmount: 7800, platformFee: 764, paymentFee: 234, settlementAmount: 6802 },
      ],
    },
    {
      month: '2024년 10월',
      monthKey: '2024-10',
      amount: 980000,
      status: 'completed',
      paidAt: '2024-11-01',
      details: [
        { pickupDate: '2024-10-05', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 4, transactionAmount: 15600, platformFee: 1528, paymentFee: 468, settlementAmount: 13604 },
        { pickupDate: '2024-10-12', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 5, transactionAmount: 19500, platformFee: 1911, paymentFee: 585, settlementAmount: 17004 },
        { pickupDate: '2024-10-20', productName: '행복한 베이커리 럭키백', originalPrice: 7800, salePrice: 3900, quantity: 3, transactionAmount: 11700, platformFee: 1146, paymentFee: 351, settlementAmount: 10203 },
      ],
    },
  ];

  const exportMonths = [
    { value: '2024-11', label: '2024년 11월' },
    { value: '2024-10', label: '2024년 10월' },
    { value: '2024-09', label: '2024년 9월' },
  ];

  const handleExport = (type) => {
    const fileName = type === 'all'
      ? `${shopData?.shopName || '가게'}_전체_정산상세.xlsx`
      : `${shopData?.shopName || '가게'}_${exportMonth.replace('-', '년')}월_정산상세.xlsx`;
    alert(`${fileName} 파일이 다운로드됩니다.\n(프로토타입 - 실제로는 다운로드되지 않습니다)`);
    setShowExportSheet(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div>
      <Header
        title="정산 내역"
        onBack={selectedMonth ? () => setSelectedMonth(null) : onBack}
        right={!selectedMonth && (
          <button onClick={() => setShowExportSheet(true)} style={{
            background: colors.green500, border: 'none', borderRadius: tokens.radius.sm,
            padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`, fontSize: tokens.fontSize.sm,
            fontWeight: 600, color: '#FFFFFF', cursor: 'pointer',
          }}>Excel 내보내기</button>
        )}
      />

      {selectedMonth ? (
        // 일자별 상세 보기
        <div style={{ padding: tokens.spacing.lg }}>
          <div style={{ marginBottom: tokens.spacing.lg }}>
            <div style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.text, marginBottom: tokens.spacing.sm }}>
              {selectedMonth.month} 정산 상세
            </div>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary }}>
              플랫폼 수수료 9.8% + 결제 수수료 3.0%
            </div>
          </div>

          {/* 테이블 헤더 */}
          <div style={{ background: colors.gray100, borderRadius: `${tokens.radius.md}px ${tokens.radius.md}px 0 0`, padding: tokens.spacing.md, overflowX: 'auto' }}>
            <div style={{ display: 'flex', minWidth: 800, fontSize: tokens.fontSize.xs, fontWeight: 600, color: colors.textTertiary }}>
              <div style={{ width: 60 }}>픽업일</div>
              <div style={{ flex: 1, minWidth: 120 }}>상품명</div>
              <div style={{ width: 60, textAlign: 'right' }}>정가</div>
              <div style={{ width: 60, textAlign: 'right' }}>판매가</div>
              <div style={{ width: 40, textAlign: 'right' }}>수량</div>
              <div style={{ width: 70, textAlign: 'right' }}>거래금액</div>
              <div style={{ width: 70, textAlign: 'right' }}>플랫폼</div>
              <div style={{ width: 60, textAlign: 'right' }}>결제</div>
              <div style={{ width: 80, textAlign: 'right' }}>정산금액</div>
            </div>
          </div>

          {/* 테이블 바디 */}
          <div style={{ background: colors.bgCard, borderRadius: `0 0 ${tokens.radius.md}px ${tokens.radius.md}px`, boxShadow: `0 1px 3px ${colors.shadow}`, overflowX: 'auto' }}>
            {selectedMonth.details.map((row, idx) => (
              <div key={idx} style={{
                display: 'flex', minWidth: 800, padding: tokens.spacing.md,
                borderBottom: idx < selectedMonth.details.length - 1 ? `1px solid ${colors.border}` : 'none',
                fontSize: tokens.fontSize.xs, color: colors.text,
              }}>
                <div style={{ width: 60 }}>{formatDate(row.pickupDate)}</div>
                <div style={{ flex: 1, minWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.productName}</div>
                <div style={{ width: 60, textAlign: 'right' }}>{row.originalPrice.toLocaleString()}</div>
                <div style={{ width: 60, textAlign: 'right' }}>{row.salePrice.toLocaleString()}</div>
                <div style={{ width: 40, textAlign: 'right' }}>{row.quantity}</div>
                <div style={{ width: 70, textAlign: 'right' }}>{row.transactionAmount.toLocaleString()}</div>
                <div style={{ width: 70, textAlign: 'right', color: colors.red500 }}>-{row.platformFee.toLocaleString()}</div>
                <div style={{ width: 60, textAlign: 'right', color: colors.red500 }}>-{row.paymentFee.toLocaleString()}</div>
                <div style={{ width: 80, textAlign: 'right', fontWeight: 600, color: colors.green600 }}>{row.settlementAmount.toLocaleString()}</div>
              </div>
            ))}

            {/* 합계 */}
            <div style={{
              display: 'flex', minWidth: 800, padding: tokens.spacing.md,
              background: colors.green50, fontSize: tokens.fontSize.sm, fontWeight: 600,
            }}>
              <div style={{ width: 60 }}>합계</div>
              <div style={{ flex: 1, minWidth: 120 }}></div>
              <div style={{ width: 60, textAlign: 'right' }}></div>
              <div style={{ width: 60, textAlign: 'right' }}></div>
              <div style={{ width: 40, textAlign: 'right' }}>{selectedMonth.details.reduce((sum, r) => sum + r.quantity, 0)}</div>
              <div style={{ width: 70, textAlign: 'right' }}>{selectedMonth.details.reduce((sum, r) => sum + r.transactionAmount, 0).toLocaleString()}</div>
              <div style={{ width: 70, textAlign: 'right', color: colors.red500 }}>-{selectedMonth.details.reduce((sum, r) => sum + r.platformFee, 0).toLocaleString()}</div>
              <div style={{ width: 60, textAlign: 'right', color: colors.red500 }}>-{selectedMonth.details.reduce((sum, r) => sum + r.paymentFee, 0).toLocaleString()}</div>
              <div style={{ width: 80, textAlign: 'right', color: colors.green600 }}>{selectedMonth.details.reduce((sum, r) => sum + r.settlementAmount, 0).toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginTop: tokens.spacing.xl, padding: tokens.spacing.lg, background: colors.gray50, borderRadius: tokens.radius.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
              <span style={{ color: colors.textTertiary }}>패널티 차감</span>
              <span style={{ color: colors.text }}>0원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: tokens.spacing.sm, borderTop: `1px solid ${colors.gray200}` }}>
              <span style={{ fontWeight: 600, color: colors.text }}>최종 정산금액</span>
              <span style={{ fontWeight: 700, color: colors.green600, fontSize: tokens.fontSize.lg }}>{selectedMonth.amount.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      ) : (
        // 월별 목록
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
            <Card key={idx} style={{ marginBottom: tokens.spacing.md, cursor: 'pointer' }} onClick={() => setSelectedMonth(s)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: tokens.fontSize.md, color: colors.text }}>{s.month}</div>
                  <div style={{ fontSize: tokens.fontSize.xxl, fontWeight: 700, color: colors.text, marginTop: tokens.spacing.xs }}>{s.amount.toLocaleString()}원</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{s.paidAt} 지급</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                  <Badge variant="success">지급완료</Badge>
                  <span style={{ color: colors.gray400 }}>›</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 세무 안내 시트 */}
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

      {/* Excel 내보내기 시트 */}
      <BottomSheet isOpen={showExportSheet} onClose={() => setShowExportSheet(false)} title="Excel 내보내기">
        <div>
          <div style={{ marginBottom: tokens.spacing.xl }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.md }}>내보낼 기간 선택</div>
            <Select
              value={exportMonth}
              onChange={setExportMonth}
              options={exportMonths}
              placeholder="월을 선택하세요"
            />
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.md }}>
            <Button variant="secondary" fullWidth onClick={() => handleExport('all')}>전체 내보내기</Button>
            <Button fullWidth onClick={() => handleExport('month')} disabled={!exportMonth}>선택 월 내보내기</Button>
          </div>
          <div style={{ marginTop: tokens.spacing.lg, fontSize: tokens.fontSize.xs, color: colors.textTertiary, textAlign: 'center' }}>
            엑셀 파일에는 픽업일, 상품명, 정가, 판매가, 판매개수,<br />거래금액, 플랫폼 수수료, 결제 수수료, 정산금액이 포함됩니다.
          </div>
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
  const [showBankSheet, setShowBankSheet] = useState(false);
  const [customBankName, setCustomBankName] = useState('');

  const [settlementInfo, setSettlementInfo] = useState({
    accountHolder: shopData.settlementInfo?.accountHolder || '',
    bankCode: shopData.settlementInfo?.bankCode || '',
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

  const selectBank = (bank) => {
    if (bank.value === 'CUSTOM') {
      setCustomBankName('');
      setEditingField('customBank');
    } else {
      const newInfo = { ...settlementInfo, bankCode: bank.value, bankName: bank.label };
      setSettlementInfo(newInfo);
      setShopData({ ...shopData, settlementInfo: newInfo });
    }
    setShowBankSheet(false);
  };

  const saveCustomBank = () => {
    if (customBankName) {
      const newInfo = { ...settlementInfo, bankCode: 'CUSTOM', bankName: customBankName };
      setSettlementInfo(newInfo);
      setShopData({ ...shopData, settlementInfo: newInfo });
    }
    setEditingField(null);
  };

  const fields = [
    { key: 'accountHolder', label: '예금주명', placeholder: '예금주명을 입력하세요' },
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
          {/* 예금주명 */}
          <div style={{ padding: `${tokens.spacing.lg}px 0`, borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>예금주명</div>
            {editingField === 'accountHolder' ? (
              <div>
                <input type="text" value={settlementInfo.accountHolder}
                  onChange={(e) => setSettlementInfo({ ...settlementInfo, accountHolder: e.target.value })} placeholder="예금주명을 입력하세요" autoFocus
                  style={{ width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text, outline: 'none' }} />
                <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                  <Button size="sm" onClick={() => handleSave('accountHolder', settlementInfo.accountHolder)}>저장</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                </div>
              </div>
            ) : (
              <div onClick={() => setEditingField('accountHolder')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: settlementInfo.accountHolder ? colors.text : colors.textTertiary }}>{settlementInfo.accountHolder || '예금주명을 입력하세요'}</span>
                <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>수정</span>
              </div>
            )}
          </div>

          {/* 은행 선택 */}
          <div style={{ padding: `${tokens.spacing.lg}px 0`, borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginBottom: tokens.spacing.sm }}>은행</div>
            {editingField === 'customBank' ? (
              <div>
                <input type="text" value={customBankName}
                  onChange={(e) => setCustomBankName(e.target.value)} placeholder="은행명을 입력하세요" autoFocus
                  style={{ width: '100%', padding: tokens.spacing.md, border: `2px solid ${colors.green500}`, borderRadius: tokens.radius.md, fontSize: tokens.fontSize.md, background: colors.bgCard, color: colors.text, outline: 'none' }} />
                <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
                  <Button size="sm" onClick={saveCustomBank}>저장</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingField(null)}>취소</Button>
                </div>
              </div>
            ) : (
              <div onClick={() => setShowBankSheet(true)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: settlementInfo.bankName ? colors.text : colors.textTertiary }}>{settlementInfo.bankName || '은행을 선택하세요'}</span>
                <span style={{ color: colors.green500, fontSize: tokens.fontSize.sm }}>선택</span>
              </div>
            )}
          </div>

          {/* 나머지 필드들 */}
          {fields.slice(1).map((field, idx) => (
            <div key={field.key} style={{ padding: `${tokens.spacing.lg}px 0`, borderBottom: idx < fields.length - 2 ? `1px solid ${colors.border}` : 'none' }}>
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
              {/* 이메일 안내 문구 */}
              {field.key === 'businessEmail' && (
                <div style={{ marginTop: tokens.spacing.sm, fontSize: tokens.fontSize.xs, color: colors.textTertiary }}>
                  이 주소로 세금계산서 메일이 발행되니 꼭 작성해주세요
                </div>
              )}
            </div>
          ))}
        </Card>
      </div>

      {/* 은행 선택 바텀시트 */}
      <BottomSheet isOpen={showBankSheet} onClose={() => setShowBankSheet(false)} title="은행 선택">
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {KOREAN_BANKS.map((bank, idx) => (
            <button key={bank.value} onClick={() => selectBank(bank)} style={{
              width: '100%', padding: tokens.spacing.lg, background: 'none', border: 'none',
              borderBottom: idx < KOREAN_BANKS.length - 1 ? `1px solid ${colors.border}` : 'none',
              fontSize: tokens.fontSize.md, color: bank.value === 'CUSTOM' ? colors.blue500 : colors.text,
              fontWeight: bank.value === 'CUSTOM' ? 600 : 400, cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>{bank.label}</span>
              {settlementInfo.bankCode === bank.value && <span style={{ color: colors.green500 }}>✓</span>}
            </button>
          ))}
        </div>
      </BottomSheet>
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
// 사장님 가이드 - JTBD 기반 주요 행동 가이드
// ============================================
const GuideScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const [expandedGuide, setExpandedGuide] = useState(null);

  const guides = [
    {
      id: 1,
      emoji: '🎁',
      title: '럭키백 등록하기',
      subtitle: '판매할 럭키백을 설정해요',
      steps: [
        '홈 화면에서 "럭키백 설정" 클릭',
        '음식 카테고리 선택 (샐러드, 피자, 한식 등)',
        '주요 메뉴 1~3개 입력',
        '럭키백 설명 작성',
        '정가 입력 (판매가는 50% 할인 자동 적용)',
        '구매 갯수 제한 설정',
      ],
    },
    {
      id: 2,
      emoji: '📅',
      title: '픽업 시간 설정하기',
      subtitle: '요일별 픽업 가능 시간을 설정해요',
      steps: [
        '설정 > 픽업 시간 메뉴 선택',
        '요일별 운영 여부 토글로 설정',
        '시작/종료 시간 터치해서 변경',
        '특별 휴무일 추가 (2일 이상 기간도 가능)',
      ],
    },
    {
      id: 3,
      emoji: '✅',
      title: '주문 확정하기',
      subtitle: '예약된 주문을 확정해요',
      steps: [
        '하단 탭 "주문" 클릭',
        '"예약" 뱃지가 붙은 주문 카드 터치',
        '"주문 확정" 버튼 클릭',
        '픽업 시간까지 럭키백 준비',
        '고객 방문 시 "픽업 완료" 처리',
      ],
    },
    {
      id: 4,
      emoji: '🔢',
      title: '오늘 판매 수량 조정하기',
      subtitle: '남은 재료에 맞게 수량을 조절해요',
      steps: [
        '홈 화면 "오늘의 럭키백 수량" 카드 클릭',
        '+/- 버튼으로 수량 조절',
        '"저장하기" 클릭',
        '또는 "오늘 판매 종료" 토글로 마감 처리',
      ],
    },
    {
      id: 5,
      emoji: '💰',
      title: '정산금 확인하기',
      subtitle: '매출과 정산 내역을 확인해요',
      steps: [
        '설정 > 정산 내역 메뉴 선택',
        '예상 정산금 확인',
        '월별 카드 클릭하면 일자별 상세 확인',
        'Excel 내보내기로 세무 자료 다운로드',
      ],
    },
    {
      id: 6,
      emoji: '👥',
      title: '직원 초대하기',
      subtitle: '함께 운영할 직원을 추가해요',
      steps: [
        '설정 > 직원 관리 메뉴 선택',
        '"+ 직원 초대" 버튼 클릭',
        '이름, 이메일, 권한 입력',
        '"초대하기" 클릭',
        '기존 직원 카드 클릭하면 수정/삭제 가능',
      ],
    },
  ];

  return (
    <div>
      <Header title="사장님 가이드" onBack={onBack} />
      <div style={{ padding: tokens.spacing.lg }}>
        <div style={{ padding: tokens.spacing.md, background: colors.green50, borderRadius: tokens.radius.md, marginBottom: tokens.spacing.xl }}>
          <div style={{ fontSize: tokens.fontSize.sm, color: colors.green600, lineHeight: 1.6 }}>
            럭키밀 셀러앱 사용법을 안내해 드려요.<br />
            각 항목을 터치하면 상세 단계를 확인할 수 있어요.
          </div>
        </div>

        {guides.map((guide) => (
          <Card key={guide.id} style={{ marginBottom: tokens.spacing.md, cursor: 'pointer', padding: 0, overflow: 'hidden' }}
            onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}>
            <div style={{ padding: tokens.spacing.xl }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 22, background: colors.green50,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{guide.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.fontSize.md, fontWeight: 600, color: colors.text }}>{guide.title}</div>
                  <div style={{ fontSize: tokens.fontSize.sm, color: colors.textTertiary, marginTop: 2 }}>{guide.subtitle}</div>
                </div>
                <span style={{ color: colors.gray400, transform: expandedGuide === guide.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
              </div>
            </div>
            {expandedGuide === guide.id && (
              <div style={{ padding: `0 ${tokens.spacing.xl}px ${tokens.spacing.xl}px`, borderTop: `1px solid ${colors.border}`, background: colors.gray50 }}>
                <div style={{ paddingTop: tokens.spacing.lg }}>
                  {guide.steps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.spacing.md, marginBottom: tokens.spacing.md }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 12, background: colors.green500,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: tokens.fontSize.xs, fontWeight: 700, color: '#FFFFFF', flexShrink: 0,
                      }}>{idx + 1}</div>
                      <div style={{ fontSize: tokens.fontSize.md, color: colors.text, lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
    category: '빵',
    categoryId: 5,
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
    foodCategory: 5,
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
      case 'settlement': return <SettlementScreen onBack={goBack} shopData={shopData} />;
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
        <div style={{ paddingBottom: showBottomNav ? 100 : 0 }}>{renderScreen()}</div>
        {showBottomNav && <BottomNav activeTab={activeTab} onChange={navigate} />}
        <FloatingChatButton />
      </div>
    </ThemeContext.Provider>
  );
}
