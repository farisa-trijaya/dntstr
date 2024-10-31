export type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  permissions?: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "GENERAL";
  email_verified: boolean;
  verified_purchase: boolean;
  is_active: boolean;
  last_login: Date | null;
  csrf_token?: string;
  created_at: Date;
};

export type Transaction = {
  id: number;
  user_id?: number;
  sku: string;
  orderID: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address_1: string;
  address_2?: string | null;
  amount: string;
  quantity: string;
  payerID: string;
  paymentID: string;
  paymentSource: string;
  receipt_umber: string | null;
  order_status:
    | "ORDER_PREPARED"
    | "ORDER_SHIPPED"
    | "ORDER_ON_THE_WAY"
    | "ORDER_COMPLETED";
  tracking_info: object | null;
  status: boolean;
  date_created: DateTime;
  updated_at: Date | null;
};

export type ProviderUser = {
  id: number;
  provider: "GOOGLE";
  provider_user_id: string;
  user_id: number;
};

export type JSONResponse = {
  status: "success" | "fail";
  data?: any;
  error?: any;
};

export type TokensSession = {
  accessToken: string;
  refreshToken: string;
  sid?: string;
};

export type ClientPlatforms = "app" | "browser" | "browser-dev";

export type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
};

export type UserEditable = {
  name?: string;
  role?: string;
  csrf_token?: string;
  is_active?: boolean;
  permissions?: string;
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
  csrf_token?: string;
};

export type RefreshToken = {
  id: number;
  token_id: string;
  user_id: number;
  is_active: boolean;
  date_created: DateTime;
};

export type RefreshTokens = Array<RefreshToken>;

export type Session = {
  id: number;
  user_id: number;
  sid: string;
  start_time: DateTime;
  end_time?: DateTime;
  access_token: string;
  csrf_token: string;
  is_active: boolean;
  ip_address: string;
};

export enum Roles {
  "SUPER_ADMIN",
  "ADMIN",
  "GENERAL",
}

export enum StatusOrder {
  "ORDER_PREPARED",
  "ORDER_SHIPPED",
  "ORDER_ON_THE_WAY",
  "ORDER_COMPLETED",
}
export type NxFormInput = {
  label?: string;
  id: string;
  type?:
    | "input:text"
    | "input:password"
    | "input:email"
    | "input:number"
    | "textarea"
    | "select";
  options?: Array<string>;
  disabled?: boolean;
  show?: boolean;
  value?: string;
};

export type NxLink = {
  name: string;
  link?: string;
  disabled?: boolean;
  show?: boolean;
  hasBorder?: boolean;
  showChildren?: boolean;
  children?: Links;
  bold?: boolean;
  group?: string;
};

export type NxLinks = Array<NxLink>;

export type DataConfig = {
  clientID: string;
  currency: string;
  intent: string;
  webBaseUrl: string;
};

export type OrderIDUser = {
  email: string;
  transaction: Transaction;
};

export type ChangePassword = {
  currentPassword: string;
  password: string;
  confPassword: string;
};
