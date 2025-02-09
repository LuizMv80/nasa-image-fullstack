import CustomAlert from './CustomAlert';
import { useAlert } from '../../context/AlertContext';

export const CustomAlertWrapper = () => {
    /** Componente para tener acceso al contexto de Alert **/
    const { alert, message, success } = useAlert();
  
    if (!alert) return null;
  
    return <CustomAlert message={message} typeMessage={success ? 'success' : 'error'} />;
  };