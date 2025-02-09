import { Link } from 'react-router-dom';
import { GridNav, Nav } from './styles';
import { useAuth } from '../../hooks/hooks';

const NasaDataNav = () => {

    const { logout, token } = useAuth();

    const handlerLogOut = () => {
        logout();
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('rol');
    }

    return (
        <GridNav>
            <Nav>
                <Link to='/home' style={{ color: 'white' }}>Home</Link>
                <Link
                    to='/login'
                    style={{ color: 'white' }}
                    onClick={
                        sessionStorage.getItem('token') ? handlerLogOut : () => { }
                    }>
                    {token ? 'Logout' : 'Login'}
                </Link>
            </Nav>
        </GridNav>
    );
};

export default NasaDataNav;
