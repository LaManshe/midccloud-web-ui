import React, { useContext } from 'react';
import { AuthContext } from '../../../context';
import './Header.css';

const Header = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        <header>
            <div className='container'>
                <div className="row">
                    <div className="col text-start">
                        <h1>MIDCloud</h1>
                        <h3>My cloud</h3>
                    </div>
                    {
                        isAuth && <div className="col text-end"><button className='btn btn-primary'>Log out</button></div>
                    }
                    
                </div>
            </div>
        </header>
    );
};

export default Header;