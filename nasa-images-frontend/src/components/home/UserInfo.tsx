import { useForm } from 'react-hook-form'
import { FC, useEffect, useState } from 'react';
import { UserInfoType } from './homeInfoType';
import { GridSignUp } from '../../pages/SignUpPage/styles';
import { ErrorText, Input, Text, Title } from '../../styles/generalStyles';
import { emailValidate, namesValidate, phoneValidate } from '../../utils/helpers';
import { CustomButton } from '../Button/CustomButton';


interface Props {
    onSubmit: (data: UserInfoType) => Promise<void>;
    userData?: UserInfoType;
    loading: boolean
}

const UserInfo: FC<Props> = ({ userData, onSubmit, loading }) => {

    const loginForm = useForm<UserInfoType>({
        mode: 'onBlur',
        defaultValues: {
            names: userData?.names,
            email: userData?.email,
            last_names: userData?.last_names,
            phone_number: userData?.phone_number,
        }
    });
    const { register, handleSubmit, formState, reset, setValue, watch } = loginForm;
    const { errors } = formState;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        reset({
            names: userData?.names,
            email: userData?.email,
            last_names: userData?.last_names,
            phone_number: userData?.phone_number,
        });
    }, [userData, reset]);

    const submit = (data: UserInfoType) => {
        onSubmit(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <GridSignUp style={{ opacity: visible ? 1 : 0 }}>
                    <Title>{userData?.names} Info</Title>

                    <label htmlFor='names'><Text>Names</Text></label>
                    <Input 
                    type='text'
                    id='names' 
                    {...register('names', namesValidate)} 
                    onChange={(e) => setValue('names', e.target.value.trim())}
                    value={watch('names') || ''}
                    />
                    <ErrorText>{errors.names?.message}</ErrorText>

                    <label htmlFor='last_names'><Text>Last Names</Text></label>
                    <Input 
                    type='text'
                    id='last_names' 
                    {...register('last_names', namesValidate)}
                    onChange={(e) => setValue('last_names', e.target.value.trim())}
                    value={watch('last_names') || ''}
                    />
                    <ErrorText>{errors.last_names?.message}</ErrorText>

                    <label htmlFor='phone_number'><Text>Phone Number</Text></label>
                    <Input
                    type='text'
                    id='phone_number'
                    {...register('phone_number', phoneValidate)}
                    onChange={(e) => setValue('phone_number', e.target.value.trim())}
                    value={watch('phone_number') || ''}
                    />
                    <ErrorText>{errors.phone_number?.message}</ErrorText>

                    <label htmlFor='email'><Text>Email</Text></label>
                    <Input
                        type='text'
                        id='email' {...register('email', emailValidate)}
                        disabled={true}
                        style={{ color: '#b0b0b0' }}
                    />
                    <ErrorText>{errors.email?.message}</ErrorText>

                    <CustomButton loading={loading} text='Update Data'/>
                    <br />
                </GridSignUp>
            </form>
            <br />
        </div>
    )
}

export default UserInfo;
