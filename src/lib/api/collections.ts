import { api, extractData, handleApiError } from './client';

// Types for collections data
export interface CollectionTransaction {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  reference: string;
  customer_email?: string;
  customer_name?: string;
  description?: string;
  created_at: string;
  completed_at?: string;
}

export interface CollectionSummary {
  total_collections: number;
  total_amount: number;
  pending_collections: number;
  completed_collections: number;
  today_collections: number;
  today_amount: number;
  collections_trend: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
}

export interface TrxCollectionDetails {
  trx_address: string;
  network: string;
  expected_amount?: number;
  expected_currency?: string;
  expires_at?: string;
  qr_code?: string;
}

export interface VaCollectionDetails {
  account_number: string;
  bank_name: string;
  account_name: string;
  expected_amount?: number;
  expected_currency?: string;
  expires_at?: string;
}

export interface UsdtCollectionDetails {
  usdt_address: string;
  network: string;
  expected_amount?: number;
  expected_currency?: string;
  qr_code?: string;
}

// Collections API methods
export const collectionsApi = {
  // Get all collections summary
  getSummary: async (): Promise<CollectionSummary> => {
    try {
      const response = await api.get('/web/collections/summary/');
      return extractData<CollectionSummary>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get TRX collections
  getTrxCollections: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    collections: CollectionTransaction[];
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const response = await api.get('/web/collections/trx/', { params });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Create TRX collection
  createTrxCollection: async (data: {
    amount: number;
    currency: string;
    description?: string;
    customer_email?: string;
  }): Promise<{
    collection: CollectionTransaction;
    payment_details: TrxCollectionDetails;
  }> => {
    try {
      const response = await api.post('/web/collections/trx/', data);
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get VA collections
  getVaCollections: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    collections: CollectionTransaction[];
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const response = await api.get('/web/collections/va/', { params });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Create VA collection
  createVaCollection: async (data: {
    amount: number;
    currency: string;
    description?: string;
    customer_email?: string;
  }): Promise<{
    collection: CollectionTransaction;
    payment_details: VaCollectionDetails;
  }> => {
    try {
      const response = await api.post('/web/collections/va/', data);
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get USDT collections
  getUsdtCollections: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    collections: CollectionTransaction[];
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const response = await api.get('/web/collections/usdt/', { params });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get static VA collections
  getStaticVaCollections: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    collections: CollectionTransaction[];
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const response = await api.get('/web/collections/static-va/', { params });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Get collection details
  getCollectionDetails: async (collectionId: string): Promise<CollectionTransaction> => {
    try {
      const response = await api.get(`/web/collections/${collectionId}/`);
      return extractData<CollectionTransaction>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },
};

export default collectionsApi;
