import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from '../context';
import CloudPage from './pages/CloudPage';
import LoginPage from './pages/LoginPage';

const AppRouter= () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading){
        return (
            <div>
                <h1>Is LOADING</h1>
            </div>
        );
    }

    return (
        !isAuth
            ?
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
            :
            <Routes>
                <Route path='/' element={<CloudPage />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
    );
};

export default AppRouter;