// Claude API 연동 서비스
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Claude API 호출 헬퍼
 * @param {string} systemPrompt - 시스템 프롬프트
 * @param {string} userMessage - 사용자 메시지
 * @returns {Promise<string>} AI 응답
 */
export const callClaude = async (systemPrompt, userMessage) => {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
};

// ============================================
// 1. 리뷰 답변 자동 생성
// ============================================
export const generateReviewReply = async (placeName, reviewContent, rating) => {
  const systemPrompt = `당신은 음식점 사장님을 대신해 고객 리뷰에 답변을 작성하는 AI입니다.
따뜻하고 진심 어린 답변을 작성해주세요.
- 고객 닉네임을 언급하며 시작
- 가게의 철학이나 노력을 자연스럽게 녹여내기
- 감사함과 앞으로의 다짐 표현
- 이모티콘은 최소한만 사용 (1-2개)
- 200자 내외로 작성`;

  const userMessage = `가게명: ${placeName}
고객 리뷰: "${reviewContent}"
별점: ${rating}점

이 리뷰에 대한 사장님 답변을 작성해주세요.`;

  return callClaude(systemPrompt, userMessage);
};

// ============================================
// 2. 럭키백 확정 문구 추천
// ============================================
export const generateConfirmMessage = async (placeInfo) => {
  const { name, category, address, description } = placeInfo;

  const systemPrompt = `당신은 음식점의 럭키백 주문 확정 메시지를 작성하는 AI입니다.
따뜻하고 설레는 느낌의 메시지를 작성해주세요.
- 가게 특색과 분위기를 녹여내기
- 고객이 방문할 때 기대감을 높이기
- 픽업 시 주의사항 안내
- 150-200자 내외`;

  const userMessage = `가게명: ${name}
카테고리: ${category}
주소: ${address}
가게 설명: ${description || ''}

럭키백 주문 확정 메시지를 작성해주세요.`;

  return callClaude(systemPrompt, userMessage);
};

// ============================================
// 3. 주문 취소 메시지 추천
// ============================================
export const generateCancelMessage = async (placeInfo, cancelReason) => {
  const { name, category } = placeInfo;

  const systemPrompt = `당신은 음식점의 럭키백 주문 취소 메시지를 작성하는 AI입니다.
정중하고 진심 어린 사과의 메시지를 작성해주세요.
- 취소 사유에 맞는 사과 표현
- 고객의 실망감에 공감
- 다음 방문을 기대하는 마무리
- 가게 특색을 살짝 녹여내기
- 150-200자 내외`;

  const userMessage = `가게명: ${name}
카테고리: ${category}
취소 사유: ${cancelReason || '재고 소진'}

럭키백 주문 취소 메시지를 작성해주세요.`;

  return callClaude(systemPrompt, userMessage);
};

// ============================================
// 4. 럭키백 설명 문구 추천
// ============================================
export const generateLuckyBagDescription = async (placeInfo, menuItems) => {
  const { name, category, address } = placeInfo;

  const systemPrompt = `당신은 음식점의 럭키백 설명 문구를 작성하는 AI입니다.
매력적이고 신뢰감을 주는 설명을 작성해주세요.
- 대표 메뉴와 재료의 특별함 강조
- 가게의 철학이나 자부심 표현
- 고객에게 전하고 싶은 가치 담기
- 150-250자 내외
- 줄바꿈으로 가독성 높이기`;

  const userMessage = `가게명: ${name}
카테고리: ${category}
위치: ${address}
주요 메뉴: ${menuItems.join(', ')}

럭키백 설명 문구를 작성해주세요.`;

  return callClaude(systemPrompt, userMessage);
};

// ============================================
// 5. 판매 수량 추천 (취소율 기반)
// ============================================
export const recommendSalesQuantity = async (statsData) => {
  const {
    currentQuantity,
    weeklyOrders,
    weeklyCancellations,
    dayOfWeek,
    weather,
    previousWeekSales,
  } = statsData;

  const cancellationRate = weeklyOrders > 0
    ? ((weeklyCancellations / weeklyOrders) * 100).toFixed(1)
    : 0;

  const systemPrompt = `당신은 럭키백 판매 데이터를 분석하는 AI입니다.
취소율과 판매 패턴을 분석하여 오늘의 최적 판매 수량을 추천해주세요.

응답 형식:
1. 추천 수량: [숫자]개
2. 분석 근거: (2-3줄)
3. 팁: (1줄)

숫자와 근거를 명확하게 제시해주세요.`;

  const userMessage = `현재 설정 수량: ${currentQuantity}개
이번주 총 주문: ${weeklyOrders}건
이번주 취소: ${weeklyCancellations}건
취소율: ${cancellationRate}%
오늘 요일: ${dayOfWeek}
날씨: ${weather || '맑음'}
지난주 같은 요일 판매: ${previousWeekSales || '데이터 없음'}개

오늘의 최적 판매 수량을 추천해주세요.`;

  return callClaude(systemPrompt, userMessage);
};

export default {
  generateReviewReply,
  generateConfirmMessage,
  generateCancelMessage,
  generateLuckyBagDescription,
  recommendSalesQuantity,
};
