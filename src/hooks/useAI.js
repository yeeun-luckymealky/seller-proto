import { useState, useCallback } from 'react';
import {
  generateReviewReply,
  generateConfirmMessage,
  generateCancelMessage,
  generateLuckyBagDescription,
  recommendSalesQuantity,
} from '../api/claude';

/**
 * AI 기능을 쉽게 사용하기 위한 커스텀 훅
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 리뷰 답변 생성
  const getReviewReply = useCallback(async (placeName, reviewContent, rating) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateReviewReply(placeName, reviewContent, rating);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 확정 문구 생성
  const getConfirmMessage = useCallback(async (placeInfo) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateConfirmMessage(placeInfo);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 취소 메시지 생성
  const getCancelMessage = useCallback(async (placeInfo, cancelReason) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCancelMessage(placeInfo, cancelReason);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 럭키백 설명 생성
  const getLuckyBagDescription = useCallback(async (placeInfo, menuItems) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateLuckyBagDescription(placeInfo, menuItems);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 판매 수량 추천
  const getSalesRecommendation = useCallback(async (statsData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await recommendSalesQuantity(statsData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getReviewReply,
    getConfirmMessage,
    getCancelMessage,
    getLuckyBagDescription,
    getSalesRecommendation,
  };
};

export default useAI;
