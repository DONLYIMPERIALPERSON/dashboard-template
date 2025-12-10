import { api, extractData, handleApiError } from './client';

// Types for wallet data
export interface WalletBalance {
  available_balance: number;
  pending_balance: number;
  total_balance: number;
  currency: string;
  last_updated: string;
}

export interface WalletTransaction {
  id: string;
  type: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  reference: string;
  created_at: string;
  status: string;
}

export interface DepositRequest {
  amount: number;
  currency: string;
  payment_method: 'virtual_account' | 'usdt' | 'checkout_link';
  description?: string;
}

export interface DepositResponse {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  payment_details: {
    account_number?: string;
    bank_name?: string;
    usdt_address?: string;
    checkout_link?: string;
  };
  created_at: string;
  expires_at?: string;
}

// Wallet API methods
export const walletApi = {
  // Get wallet balance
  getBalance: async (): Promise<WalletBalance> => {
    try {
      const response = await api.get('/web/wallet/balance/');
      return extractData<WalletBalance>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get wallet transaction history
  getTransactions: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
  }): Promise<{
    transactions: WalletTransaction[];
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const response = await api.get('/web/wallet/transactions/', { params });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Create deposit request
  createDeposit: async (data: DepositRequest): Promise<DepositResponse> => {
    try {
      const response = await api.post('/web/wallet/deposit/', data);
      return extractData<DepositResponse>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get deposit details
  getDeposit: async (depositId: string): Promise<DepositResponse> => {
    try {
      const response = await api.get(`/web/wallet/deposit/${depositId}/`);
      return extractData<DepositResponse>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },
};

export default walletApi;
