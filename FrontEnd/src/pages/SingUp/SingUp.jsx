import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import styles from './SignUp.module.css';
import User from '../../assets/Icons/user.svg?react';
import { FaUnlock, FaUser } from 'react-icons/fa';
import { PiIdentificationCardFill as Id } from 'react-icons/pi';
import { MdEmail, MdAddPhotoAlternate as Ft } from 'react-icons/md';
import Button from '../../components/button/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyFill, notifySignUp } from '../../components/notify/Toast';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    cpf: location.state?.cpf || '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: null,
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf' && value.length > 11) {
      return;
    }
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({ ...prevData, profile_picture: file }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    for (const key in userData) {
      if (!userData[key]) {

        return;
      }
    }

    const formData = new FormData();
    formData.append('cpf', userData.cpf);
    formData.append('email', userData.email);
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('profile_picture', userData.profile_picture);
    formData.append('password', userData.password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      console.log('Cadastro bem-sucedido!', response.data);
      setTimeout(() => {
        navigate('/login');
      }, 2200)
      notifySignUp()
    } catch (error) {
      console.error('Erro durante o cadastro:', error.response.data);
      notifyFill();
    }
  };

  return (
    <div className={styles.tudo}>
      <div className={styles.container}>
        <form onSubmit={handleRegistration} className={styles.inputContainer}>
          <User className={styles.img} />
          <div className={styles.inp}>
            <Id size={20} className={styles.icon} />
            <Input type='number' text='Cpf' name="cpf" onChange={handleInputChange} value={userData.cpf} />
          </div>
          <div className={styles.inp}>
            <MdEmail size={20} className={styles.icon} />
            <Input text='Email' type='email' name="email" value={userData.email} onChange={handleInputChange} />
          </div>
          <div className={styles.inp}>
            <FaUser size={20} className={styles.icon} />
            <Input text='Nome' type='text' name="first_name" value={userData.first_name} onChange={handleInputChange} />
          </div>
          <div className={styles.inp}>
            <FaUser size={20} className={styles.icon} />
            <Input text='Sobrenome' type='text' name="last_name" value={userData.last_name} onChange={handleInputChange} />
          </div>
          <div className={styles.inp}>
            <Ft size={25} className={styles.icon} />
            <Input text='Foto' type='file' name="profile_picture" onChange={handleFileChange} />
          </div>
          <div className={styles.inp}>
            <FaUnlock size={20} className={styles.icon} />
            <Input text='Password' type='password' name="password" value={userData.password} onChange={handleInputChange} />
          </div>
          <div className={styles.cad}></div>
          <div className={styles.btn}>
            <Button text='Sign Up' type="submit" />
          </div>
          <div className={styles.back}>
            <Link to="/login" className={styles.link}>
              <p>
                Already have an account? Login here.
              </p>
            </Link>
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

export default SignUp;
