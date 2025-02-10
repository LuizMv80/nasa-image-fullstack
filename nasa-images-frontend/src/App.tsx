import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomeHeader from './components/home/HomeHeader';
import { AlertProvider } from './context/AlertContext';
import NasaDataPage from './pages/NasaDataPage/NasaDataPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { CustomAlertWrapper } from './components/alert/CustomAlertWrapper';
import NotFound from './pages/NotFound/NotFoundPage';


function App() {

  return (
    <AlertProvider>
      <CustomAlertWrapper />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/' element={<NasaDataPage />} />
            <Route path='/*' element={<NotFound />} />
            <Route element={<PrivateRoute />}>
              <Route path='/home' element={<HomeHeader />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  )
}

export default App
