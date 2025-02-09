import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AlertContextType {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}


const AlertContext = createContext<AlertContextType | undefined>(undefined);


export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(String);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <AlertContext.Provider value={{ alert, setAlert, message, setMessage, success, setSuccess }}>
      {children}
    </AlertContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider');
  }
  return context;
};
