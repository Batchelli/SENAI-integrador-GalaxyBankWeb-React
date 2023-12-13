import React, { useState, useRef } from 'react';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import User from '../../assets/Icons/user.svg?react';
import { FaUser, FaLock } from 'react-icons/fa';
import Button from '../../components/button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify, notifyBlocked, notifyLoged } from '../../components/notify/Toast';

const Login = () => {
    const navigate = useNavigate();
    const loginAttempts = useRef(0);
    const isBlocked = useRef(false);


    const [loginData, setLoginData] = useState({
        cpf: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cpf' && value.length > 11) {
            return;
        }
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const logar = async (e) => {
        e.preventDefault();
        if (isBlocked.current) {
            notifyBlocked();
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', loginData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('cpf', loginData.cpf); 
            notifyLoged()
            setTimeout(() => {
                navigate('/userArea');
            }, 2200)
            console.log('troco de tela');
        } catch (error) {
            console.error('Erro durante o login:', error.response.data);
            loginAttempts.current += 1;
            if (loginAttempts.current >= 3) {
                blockLogin();
            }
            notify();
        }
    };

    const blockLogin = () => {
        isBlocked.current = true;
        setTimeout(() => {
            isBlocked.current = false;
            loginAttempts.current = 0;
        }, 10000);
    };

    return (
        <div className={styles.tudo}>
            <div className={styles.container}>
                <form onSubmit={logar} className={styles.inputContainer}>
                    <User className={styles.img} />
                    <div className={styles.inp}>
                        <FaUser className={styles.icon} />
                        <Input text='CPF' type='text' name='cpf' value={loginData.cpf} onChange={handleChange} />
                    </div>

                    <div className={styles.inp}>
                        <FaLock className={styles.icon} />
                        <Input
                            text='Password'
                            type='password'
                            name='password'
                            value={loginData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.remember}>
                        <div className={styles.check}>
                            <input className={styles.ml} type='checkbox' id='remember' name='remember' />
                            <label className={styles.ml} htmlFor='remember'>
                                Manter logado?
                            </label>
                        </div>
                        <p>Esqueceu a senha?</p>
                    </div>
                    <div className={styles.cad}></div>
                    <div className={styles.btn}>
                        <Button type='submit' text='Login' />
                    </div>
                </form>
            </div>
            <ToastContainer
                position='top-center'
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme='colored'
            />
        </div>
    );
};

export default Login;
