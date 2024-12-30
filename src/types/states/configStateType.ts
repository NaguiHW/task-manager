export interface ConfigStateType {
  name?: string;
  token?: string;
  setName?: (name: string) => void;
  setToken?: (token: string) => void;
}
