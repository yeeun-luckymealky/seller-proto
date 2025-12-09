// API 기본 설정 (나중에 실제 API 연동 시 사용)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// API 요청 헬퍼
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

// Place (가게) API
export const placeApi = {
  // 가게 정보 조회
  getPlace: (placeId) => apiRequest(`/place/${placeId}`),
  // 가게 정보 수정
  updatePlace: (placeId, data) => apiRequest(`/place/${placeId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  // 럭키백 정보 수정
  updateLuckyBag: (placeId, data) => apiRequest(`/place/${placeId}/lucky-bag`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  // 픽업 설정 수정
  updatePickupDays: (placeId, data) => apiRequest(`/place/${placeId}/pickup-days`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Order (주문) API
export const orderApi = {
  // 주문 목록 조회
  getOrders: (placeId, params) => apiRequest(`/place/${placeId}/orders?${new URLSearchParams(params)}`),
  // 주문 확정
  confirmOrder: (orderId) => apiRequest(`/place/orders/${orderId}/confirm`, {
    method: 'POST',
  }),
  // 주문 취소
  cancelOrder: (orderId, reason) => apiRequest(`/place/orders/${orderId}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  }),
  // 픽업 확인
  checkPickup: (orderId) => apiRequest(`/place/orders/${orderId}/pickup`, {
    method: 'POST',
  }),
};

// Auth (인증) API
export const authApi = {
  // 로그인
  signIn: (email, password) => apiRequest('/auth/place/sign-in', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  // 토큰 갱신
  renewToken: (refreshToken) => apiRequest('/auth/token/renew', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  }),
};

// Settlement (정산) API
export const settlementApi = {
  // 월별 정산 조회
  getMonthlySettlement: (placeId, year, month) =>
    apiRequest(`/place/${placeId}/settlement/${year}/${month}`),
};
