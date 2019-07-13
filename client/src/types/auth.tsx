export interface AuthStoreState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: object;
}
