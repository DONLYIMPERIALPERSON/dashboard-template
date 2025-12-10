import { api, extractData, handleApiError } from './client';

// Types for settings data
export interface GeneralSettings {
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  timezone: string;
  currency: string;
  language: string;
}

export interface ProfileSettings {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar?: string;
  business_description?: string;
  website?: string;
}

export interface SecuritySettings {
  two_factor_enabled: boolean;
  session_timeout: number;
  password_last_changed?: string;
  login_notifications: boolean;
  suspicious_activity_alerts: boolean;
}

export interface NotificationSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  payment_notifications: boolean;
  security_notifications: boolean;
  marketing_emails: boolean;
  weekly_reports: boolean;
  monthly_reports: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used?: string;
  permissions: string[];
  status: 'active' | 'inactive' | 'revoked';
}

export interface ApiKeysSettings {
  api_keys: ApiKey[];
  rate_limit: number;
  webhook_url?: string;
}

export interface FeeRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_amount?: number;
  max_amount?: number;
  currency: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface FeesSettings {
  fee_rules: FeeRule[];
  default_fee_percentage: number;
  minimum_fee: number;
}

export interface TeamMember {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  permissions: string[];
  status: 'active' | 'inactive' | 'pending';
  invited_at: string;
  joined_at?: string;
}

export interface TeamsSettings {
  team_members: TeamMember[];
  available_roles: string[];
  invite_link?: string;
}

export interface SettlementAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  currency: string;
  is_default: boolean;
  status: 'active' | 'inactive' | 'pending_verification';
  created_at: string;
}

export interface SettlementSettings {
  settlement_accounts: SettlementAccount[];
  settlement_schedule: 'daily' | 'weekly' | 'monthly';
  minimum_settlement_amount: number;
  settlement_fee: number;
}

// Settings API methods
export const settingsApi = {
  // General Settings
  getGeneralSettings: async (): Promise<GeneralSettings> => {
    try {
      const response = await api.get('/web/settings/general/');
      return extractData<GeneralSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateGeneralSettings: async (data: Partial<GeneralSettings>): Promise<GeneralSettings> => {
    try {
      const response = await api.put('/web/settings/general/', data);
      return extractData<GeneralSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Profile Settings
  getProfileSettings: async (): Promise<ProfileSettings> => {
    try {
      const response = await api.get('/web/settings/profile/');
      return extractData<ProfileSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateProfileSettings: async (data: Partial<ProfileSettings>): Promise<ProfileSettings> => {
    try {
      const response = await api.put('/web/settings/profile/', data);
      return extractData<ProfileSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Security Settings
  getSecuritySettings: async (): Promise<SecuritySettings> => {
    try {
      const response = await api.get('/web/settings/security/');
      return extractData<SecuritySettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateSecuritySettings: async (data: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    try {
      const response = await api.put('/web/settings/security/', data);
      return extractData<SecuritySettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Notification Settings
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    try {
      const response = await api.get('/web/settings/notifications/');
      return extractData<NotificationSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateNotificationSettings: async (data: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    try {
      const response = await api.put('/web/settings/notifications/', data);
      return extractData<NotificationSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // API Keys Settings
  getApiKeysSettings: async (): Promise<ApiKeysSettings> => {
    try {
      const response = await api.get('/web/settings/api_keys/');
      return extractData<ApiKeysSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  createApiKey: async (data: { name: string; permissions: string[] }): Promise<ApiKey> => {
    try {
      const response = await api.post('/web/settings/api_keys/', data);
      return extractData<ApiKey>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  revokeApiKey: async (keyId: string): Promise<{ success: boolean }> => {
    try {
      const response = await api.delete(`/web/settings/api_keys/${keyId}/`);
      return extractData<{ success: boolean }>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Fees Settings
  getFeesSettings: async (): Promise<FeesSettings> => {
    try {
      const response = await api.get('/web/settings/fees/');
      return extractData<FeesSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  createFeeRule: async (data: Omit<FeeRule, 'id' | 'created_at'>): Promise<FeeRule> => {
    try {
      const response = await api.post('/web/settings/fees/', data);
      return extractData<FeeRule>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateFeeRule: async (ruleId: string, data: Partial<FeeRule>): Promise<FeeRule> => {
    try {
      const response = await api.put(`/web/settings/fees/${ruleId}/`, data);
      return extractData<FeeRule>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  deleteFeeRule: async (ruleId: string): Promise<{ success: boolean }> => {
    try {
      const response = await api.delete(`/web/settings/fees/${ruleId}/`);
      return extractData<{ success: boolean }>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Teams Settings
  getTeamsSettings: async (): Promise<TeamsSettings> => {
    try {
      const response = await api.get('/web/settings/teams/');
      return extractData<TeamsSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  inviteTeamMember: async (data: { email: string; role: string; permissions: string[] }): Promise<TeamMember> => {
    try {
      const response = await api.post('/web/settings/teams/', data);
      return extractData<TeamMember>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateTeamMember: async (memberId: string, data: Partial<TeamMember>): Promise<TeamMember> => {
    try {
      const response = await api.put(`/web/settings/teams/${memberId}/`, data);
      return extractData<TeamMember>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  removeTeamMember: async (memberId: string): Promise<{ success: boolean }> => {
    try {
      const response = await api.delete(`/web/settings/teams/${memberId}/`);
      return extractData<{ success: boolean }>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Settlement Settings
  getSettlementSettings: async (): Promise<SettlementSettings> => {
    try {
      const response = await api.get('/web/settings/settlement/');
      return extractData<SettlementSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  addSettlementAccount: async (data: Omit<SettlementAccount, 'id' | 'created_at'>): Promise<SettlementAccount> => {
    try {
      const response = await api.post('/web/settings/settlement/', data);
      return extractData<SettlementAccount>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateSettlementAccount: async (accountId: string, data: Partial<SettlementAccount>): Promise<SettlementAccount> => {
    try {
      const response = await api.put(`/web/settings/settlement/${accountId}/`, data);
      return extractData<SettlementAccount>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  removeSettlementAccount: async (accountId: string): Promise<{ success: boolean }> => {
    try {
      const response = await api.delete(`/web/settings/settlement/${accountId}/`);
      return extractData<{ success: boolean }>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  updateSettlementSettings: async (data: Partial<SettlementSettings>): Promise<SettlementSettings> => {
    try {
      const response = await api.put('/web/settings/settlement/settings/', data);
      return extractData<SettlementSettings>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },
};

export default settingsApi;
