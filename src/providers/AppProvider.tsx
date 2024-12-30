import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { settings } from '../config'
import {getItemFromStore, isTokenValid, setItemInStore} from '../helpers/utils';
import { ConfigStateType } from '../types/states/configStateType';

const AppContext = createContext<ConfigStateType | undefined>(undefined);

const AppProvider = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState<string | undefined>(getItemFromStore('token', settings.token!));
  const [name, setName] = useState<string | undefined>(getItemFromStore('name', settings.name!));

  useEffect(() => {
    if (token && isTokenValid(token)) {
      setToken(token);
      setName(name);
    } else {
      setItemInStore('token', '');
      setItemInStore('name', '');
    }
  }, [name, token]);

  useEffect(() => {
    if (token) {
      setItemInStore('token', token);
      setItemInStore('name', name!);
    } else {
      setItemInStore('token', '');
      setItemInStore('name', '');
    }
  }, [name, token]);

  return (
    <AppContext.Provider value={{token, setToken, name, setName}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppProvider;