// Main API exports
export * from './client';
export * from './auth';
export * from './dashboard';
export * from './wallet';
export * from './collections';
export * from './settings';

// Re-export types
export type { User, LoginResponse, SignupRequest, WebAuthnChallenge } from './auth';
export type { DashboardSummary, HeaderInfo } from './dashboard';
export type { WalletBalance, WalletTransaction, DepositRequest, DepositResponse } from './wallet';
export type {
  CollectionTransaction,
  CollectionSummary,
  TrxCollectionDetails,
  VaCollectionDetails,
  UsdtCollectionDetails
} from './collections';
export type {
  GeneralSettings,
  ProfileSettings,
  SecuritySettings,
  NotificationSettings,
  ApiKeysSettings,
  FeesSettings,
  TeamsSettings,
  SettlementSettings,
  ApiKey,
  FeeRule,
  TeamMember,
  SettlementAccount
} from './settings';
