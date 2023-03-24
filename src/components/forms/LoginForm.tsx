import React, {useState, useContext} from 'react';
import AuthService from '../../api/AuthService';
import { AuthContext } from '../../context';
import './LoginForm.css';


const LoginForm = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const [login, setlogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState({
        login: {
            text: '',
            errorClass: ''
        },
        password: {
            text: '',
            errorClass: ''
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        var errors = validate(login, password);
    
        if (errors.login.errorClass !== '' && errors.password.errorClass !== ''){
            setErrors(errors);
            return;
        }

        const token = AuthService.login(login, password);

        token.then((tokenStr) => {
            if (tokenStr){
                localStorage.setItem('token', tokenStr);

                setIsAuth(true);
            }
        });
    };

    function validate(login: string, password: string){
        const errors = {
            login: {
                text: '',
                errorClass: ''
            },
            password: {
                text: '',
                errorClass: ''
            }
        };
    
        if (!login.trim()) {
          errors.login.text = 'Логин обязательно';
          errors.login.errorClass = 'error-border';
        }
      
        if (!password.trim()) {
          errors.password.text = 'Пароль обязательно';
          errors.password.errorClass = 'error-border';
        }
    
        return errors;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card-login-page">
                <div className="form-group">
                <label htmlFor="login">Логин:</label>
                <input type="text" id="login" name="login" value={login} onChange={e => setlogin(e.target.value)} className={`form-control ${errors.login.errorClass}`} />
                {errors.login.text !== '' && <div className='error'>{errors.login.text}</div>}
                </div>
                <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className={`form-control ${errors.password.errorClass}`} />
                {errors.password.text !== '' && <div className='error'>{errors.password.text}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </div>
        </form>
    );
};

export default LoginForm;