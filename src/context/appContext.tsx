import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextProps {
  data: any;
  loading: boolean;
  setData: Dispatch<SetStateAction<any>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

interface ProviderProps {
  children: JSX.Element;
}

const AppContext = createContext<AppContextProps>({
  data: {},
  loading: false,
  setData: () => {},
  setLoading: () => {},
});

const AppProvider = ({ children }: ProviderProps): JSX.Element => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        setData,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
