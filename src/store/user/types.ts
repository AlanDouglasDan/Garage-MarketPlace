export interface UserState {
  loading: boolean;
  error: boolean | string;
  currentUser?: any;
}

export interface UserHookReturn extends UserState {
  setError: (error: boolean | string) => void;
  signUp: (data: SignupData) => any;
  logIn: (data: LoginData) => any;
  getUser: () => any;
  updateUser: (data: any) => any;
  logOut: () => any;
}

export interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
