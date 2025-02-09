import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { FC, useEffect, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpFormType, UserRegisterType } from './SignUpFormType';
import { GridSignUp } from '../../pages/SignUpPage/styles';
import {
    ErrorText,
    Input,
    SmallText,
    Text,
    Title,
    XSmallText
} from '../../styles/generalStyles';
import {
    emailValidate,
    namesValidate,
    passwordValidate, phoneValidate
} from '../../utils/helpers';
import { CustomButton } from '../Button/CustomButton';


const SignUpForm: FC<SignUpFormType> = ({ onSubmit, loading }) => {

    const loginForm = useForm<UserRegisterType>({ mode: 'onBlur' });
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

    const submit = (data: UserRegisterType) => {
        onSubmit(data);
    }

    const validatePasswordMatch = (value: string) => {
        const password = watch('password');
        return value === password || 'Passwords do not match';
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <GridSignUp style={{ opacity: visible ? 1 : 0 }}>
                    <Title>Create Account</Title>

                    <label htmlFor='names'><Text>Names</Text></label>
                    <Input
                        type='text' id='names' {...register('names', namesValidate)}
                        onChange={(e) => setValue('names', e.target.value.trim())}
                        value={watch('names') || ''}
                    />
                    <ErrorText>{errors.names?.message}</ErrorText>

                    <label htmlFor='lastNames'><Text>Last Names</Text></label>
                    <Input
                        type='text'
                        id='lastNames' {...register('last_names', namesValidate)}
                        onChange={(e) => setValue('last_names', e.target.value.trim())}
                        value={watch('last_names') || ''}
                    />
                    <ErrorText>{errors.last_names?.message}</ErrorText>

                    <label htmlFor='phoneNumber'><Text>Phone Number</Text></label>
                    <Input
                        type='text'
                        id='phoneNumber' {...register('phone_number', phoneValidate)}
                        onChange={(e) => setValue('phone_number', e.target.value.trim())}
                        value={watch('phone_number') || ''}
                    />
                    <ErrorText>{errors.phone_number?.message}</ErrorText>

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

                    <label htmlFor='confirmPassword'><Text>Confirm Password</Text></label>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id='confirmPassword'
                        {...register('confirm_password', { validate: validatePasswordMatch })}
                        onChange={(e) => setValue('confirm_password', e.target.value.trim())}
                        value={watch('confirm_password') || ''}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={togglePasswordVisibility} edge='end'>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }} />
                    <ErrorText>{errors.confirm_password?.message}</ErrorText>
                    <br />

                    <CustomButton loading={loading} text='Get Started' />
                    <br />

                    <SmallText>Do you already have an account? <Link to='/login' style={{ color: 'black' }}>Login</Link></SmallText>
                    <XSmallText>
                        By creating an account, you agree to
                        <Link to='#' style={{ color: 'black' }}>
                            Nasa Images Terms
                        </Link>
                        of
                        <Link to='#' style={{ color: 'black' }}>
                            Use and Privacy Notice
                        </Link>.
                    </XSmallText>
                </GridSignUp>
            </form>
            <br />
        </div>
    )
}

export default SignUpForm;
