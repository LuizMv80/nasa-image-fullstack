import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GridHome } from '../../components/home/styles';
import { GridHeader, GridNav, Nav, SmallTextHeader, TitleHeader } from '../../components/nasaData/styles';
import { NasaDataContainer } from '../NasaDataPage/styles';
import { useAuth } from '../../hooks/hooks';


const NotFound = () => {

    const { token, logout } = useAuth();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handlerLogOut = () => {
        logout();
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('rol');
    }

    return (
        <NasaDataContainer sx={{height:'-webkit-fill-available'}}>
            <GridHome>
                <GridHeader style={{ opacity: visible ? 1 : 0, marginTop: '3rem' }}>
                    <TitleHeader>
                        404
                    </TitleHeader>
                    <SmallTextHeader>U P S !  N O T  F O U N D</SmallTextHeader>
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
            </GridHome>
        </NasaDataContainer>
    );
};

export default NotFound;
