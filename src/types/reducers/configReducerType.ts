export type ConfigType = 'SET_CONFIG' | 'RESET';

export interface ConfigReducerActionType {
  type: ConfigType;
  payload: {
    setInStore: boolean;
    key: string;
    value: string;
  };
}