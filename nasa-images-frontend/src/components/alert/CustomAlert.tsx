import { Snackbar, Alert } from '@mui/material';
import { Slide } from '@mui/material';
import { useAlert } from '../../context/AlertContext';
import { FC } from 'react';
import { CustomAlertType } from './CustomAlertType';


const CustomAlert: FC<CustomAlertType> = ({ message, typeMessage }) => {

  const { alert, setAlert } = useAlert();

  return (
    <div>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setAlert(false)}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity={typeMessage}
          sx={{
            width: '100%',
            backgroundColor: '#3d3d3d',
            color: '#e7e7e7'
          }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomAlert;
