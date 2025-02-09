import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    GridHeader,
    GridNav,
    Nav,
    SmallTextHeader,
    TitleHeader
} from '../nasaData/styles';
import UserInfo from './UserInfo';
import { GridHome } from './styles';
import { useAuth } from '../../hooks/hooks';
import { UserInfoType } from './homeInfoType';
import { useAlert } from '../../context/AlertContext';
import nasaImagesService from '../../services/nasaImagesService';
import { convertTitleText } from '../../utils/helpers';


const HomeHeader = () => {

    
    const { logout, token } = useAuth();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<UserInfoType>();
    const { setAlert, setMessage, setSuccess } = useAlert();

    const handlerLogOut = () => {
        logout();
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('rol');
    }

    const fetchData = async () => {
        const [ok, detail, status] = await nasaImagesService({
            url: `${import.meta.env.VITE_API_URL}users`,
            method: 'GET',
            auth: token || ''
        });
        if (!ok) {
            setAlert(true);
            setSuccess(false);
            setMessage(detail as string);
            setTimeout(() => { setAlert(false); }, 15000);
            if (status == 401) {
                setMessage('Session expired.');
                handlerLogOut();
            }
        }
        else {
            setUserData(detail as UserInfoType);
        }
    }

    const onSubmit = async (data: UserInfoType) => {
        setLoading(true);
        data.uuid = userData?.uuid;
        const [ok, detail, status] = await nasaImagesService({
            url:`${import.meta.env.VITE_API_URL}users`,
            body: data,
            method: 'PUT',
            auth: token || ''
        });
        setLoading(false);
        setAlert(true);
        if (!ok) {
            setMessage(detail as string);
            if (status == 401) {
                setMessage('Session expired.');
                handlerLogOut();
            }
        }
        else {
            setSuccess(true);
            setMessage('Update successfully!');
            window.location.reload();
        }
        setTimeout(() => { setAlert(false); }, 3000);
    }

    useEffect(() => {
        fetchData();
        setVisible(true);
    }, []);

    return (
        <GridHome>
            <GridHeader style={{ opacity: visible ? 1 : 0, marginTop: '3rem' }}>
                <TitleHeader>
                    H E L L O   {convertTitleText(userData?.names || '')}
                </TitleHeader>
                <SmallTextHeader>N A S A   I M A G E S</SmallTextHeader>
            </GridHeader>
            <GridNav>
                <Nav>
                    <Link to='/' style={{ color: 'white' }}>Images</Link>
                    <Link
                        to='/login'
                        style={{ color: 'white' }}
                        onClick={
                            token ? handlerLogOut : () => { }
                        }>
                        {token ? 'Logout' : 'Login'}
                    </Link>
                </Nav>
            </GridNav>
            <UserInfo
                userData={userData}
                onSubmit={onSubmit}
                loading={loading}
            />
        </GridHome>
    );
};

export default HomeHeader;
