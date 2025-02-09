import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { PageNameSignUp, SignUpContainer } from './styles';
import SignUpForm from '../../components/signUpForm/SignUpForm';
import nasaImagesService from '../../services/nasaImagesService';
import { UserRegisterType } from '../../components/signUpForm/SignUpFormType';


const SignUpPage = () => {

    const navigate = useNavigate();
    const { setAlert, setMessage, setSuccess} = useAlert();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: UserRegisterType) => {
        setLoading(true);
        const [ok, detail] = await nasaImagesService({
            url:`${import.meta.env.VITE_API_URL}users`,
            body: data,
            method: 'POST'
        });
        setLoading(false);
        setAlert(true);
        if (!ok) {
            setMessage(detail as string);
        }
        else {
            setSuccess(true);
            setMessage('Register successfully!');
            navigate('/login');
        }
        setTimeout(() => { setAlert(false); }, 3000);
    }

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <SignUpContainer>
            <SignUpForm onSubmit={onSubmit} loading={loading}/>
            <PageNameSignUp style={{ opacity: visible ? 1 : 0 }}>N A S A    I M A G E S</PageNameSignUp>
        </SignUpContainer>
    )
}

export default SignUpPage;
