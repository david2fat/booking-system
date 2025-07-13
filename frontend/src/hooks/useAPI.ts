import { useState, useEffect } from 'react';
import { bookingAPI, storeAPI, serviceAPI, userAPI, paymentAPI, promotionAPI, notificationAPI } from '../services/api';

// 通用 API Hook
export const useAPI = <T>(
  apiCall: () => Promise<{ data: T }>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message || '發生錯誤');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = () => {
    setLoading(true);
    apiCall()
      .then(response => setData(response.data))
      .catch(err => setError(err.response?.data?.detail || err.message || '發生錯誤'))
      .finally(() => setLoading(false));
  };

  return { data, loading, error, refetch };
};

// 預約相關 Hook
export const useBookings = () => {
  return useAPI(() => bookingAPI.getAll());
};

export const useBooking = (id: number) => {
  return useAPI(() => bookingAPI.getById(id), [id]);
};

export const useBookingsByDate = (date: string) => {
  return useAPI(() => bookingAPI.getByDate(date), [date]);
};

// 店舖相關 Hook
export const useStores = () => {
  return useAPI(() => storeAPI.getAll());
};

export const useStore = (id: number) => {
  return useAPI(() => storeAPI.getById(id), [id]);
};

// 服務相關 Hook
export const useServices = () => {
  return useAPI(() => serviceAPI.getAll());
};

export const useService = (id: number) => {
  return useAPI(() => serviceAPI.getById(id), [id]);
};

// 用戶相關 Hook
export const useUsers = () => {
  return useAPI(() => userAPI.getAll());
};

export const useUser = (id: number) => {
  return useAPI(() => userAPI.getById(id), [id]);
};

// 付款相關 Hook
export const usePayments = () => {
  return useAPI(() => paymentAPI.getAll());
};

export const usePaymentStats = () => {
  return useAPI(() => paymentAPI.getStats());
};

// 促銷相關 Hook
export const usePromotions = () => {
  return useAPI(() => promotionAPI.getAll());
};

export const usePromotion = (id: number) => {
  return useAPI(() => promotionAPI.getById(id), [id]);
};

// 通知相關 Hook
export const useNotifications = () => {
  return useAPI(() => notificationAPI.getAll());
};

export const useNotification = (id: number) => {
  return useAPI(() => notificationAPI.getById(id), [id]);
}; 