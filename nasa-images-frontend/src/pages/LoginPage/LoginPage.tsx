import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/hooks';
import { LoginSuccess } from './LoginTypes';
import { GridContent, PageName } from './styles';
import { useAlert } from '../../context/AlertContext';
import LoginForm from '../../components/loginForm/LoginForm';
import nasaImagesService from '../../services/nasaImagesService';
import { UserAuthType } from '../../components/loginForm/LoginFormType';


const LoginPage = () => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const { setAlert, setMessage, setSuccess} = useAlert();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: UserAuthType) => {
        setLoading(true);
        const [ok, detail] = await nasaImagesService({
            url:`${import.meta.env.VITE_API_URL}auth`,
            body: data,
            method: 'POST'
        });
        setLoading(false);
        if (!ok) {
            setAlert(true);
            setSuccess(false);
            setMessage(detail as string);
            setTimeout(() => { setAlert(false); }, 3000);
        }
        else {
            login((detail as LoginSuccess).token);
            sessionStorage.setItem('uuid', (detail as LoginSuccess).uuid);
            sessionStorage.setItem('rol', (detail as LoginSuccess).rol);
            navigate('/');
        }
    }

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <GridContent>
            <LoginForm onSubmit={onSubmit} loading={loading}/>
            <PageName
            style={{ opacity: visible ? 1 : 0 }}>
                N A S A    I M A G E S
            </PageName>
        </GridContent>
    )
}

export default LoginPage;
