import { api, extractData, handleApiError } from './client';

// Types for dashboard data
export interface DashboardSummary {
  total_balance: number;
  total_collections_today: number;
  total_payouts_today: number;
  total_transactions: number;
  collections_trend: Array<{
    date: string;
    amount: number;
  }>;
  payouts_trend: Array<{
    date: string;
    amount: number;
  }>;
  recent_transactions: Array<{
    id: string;
    type: string;
    amount: number;
    status: string;
    created_at: string;
    description: string;
  }>;
  top_collections: Array<{
    method: string;
    amount: number;
    percentage: number;
  }>;
}

export interface HeaderInfo {
  business_name: string;
  business_logo?: string;
  user_name: string;
  user_email: string;
}

// Dashboard API methods
export const dashboardApi = {
  // Get dashboard summary data
  getSummary: async (): Promise<DashboardSummary> => {
    try {
      const response = await api.get('/web/dashboard/summary/');
      return extractData<DashboardSummary>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get header information (business logo, name, user info)
  getHeaderInfo: async (): Promise<HeaderInfo> => {
    try {
      const response = await api.get('/web/header/');
      return extractData<HeaderInfo>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },
};

export default dashboardApi;
