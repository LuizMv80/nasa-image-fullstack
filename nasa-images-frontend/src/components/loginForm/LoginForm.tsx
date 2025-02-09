import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import { LoginFormType, UserAuthType } from './LoginFormType';
import { GridLogin } from '../../pages/LoginPage/styles';
import {
    ErrorText,
    Input,
    SmallText,
    Text,
    Title,
    XSmallText
} from '../../styles/generalStyles';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { emailValidate, passwordValidate } from '../../utils/helpers';
import { CustomButton } from '../Button/CustomButton';


const LoginForm: FC<LoginFormType> = ({ onSubmit, loading }) => {

    const loginForm = useForm<UserAuthType>({ mode: 'onBlur' });
    const { register, handleSubmit, formState, watch, setValue } = loginForm;
    const { errors } = formState;
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        setVisible(true);
    }, []);

    const submit = async (data: UserAuthType) => {
        onSubmit(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <GridLogin style={{ opacity: visible ? 1 : 0 }}>
                    <Title>Sign In</Title>

                    <label htmlFor='email'><Text>Email</Text></label>
                    <Input
                        type='text'
                        id='email' {...register('email', emailValidate)}
                        onChange={(e) => setValue('email', e.target.value.trim())}
                        value={watch('email') || ''}
                    />
                    <ErrorText>{errors.email?.message}</ErrorText>

                    <label htmlFor='password'><Text>Password</Text></label>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id='password' {...register('password', passwordValidate)}
                        onChange={(e) => setValue('password', e.target.value.trim())}
                        value={watch('password') || ''}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <ErrorText>{errors.password?.message}</ErrorText>
                    <br />

                    <CustomButton loading={loading} text='Login' />
                    <br />

                    <SmallText>First time here?<Link to='/signup' style={{ color: 'black' }}> Create account now.</Link></SmallText>
                    <XSmallText>This page is protected by Google reCAPTCHA to verify that you are not a robot. <Link to='#' style={{ color: 'black' }}>More info</Link>.</XSmallText>
                </GridLogin>
            </form>
        </>
    )
}

export default LoginForm;
