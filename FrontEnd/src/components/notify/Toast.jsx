import { toast } from 'react-toastify';

export const notify = () =>
    toast.warning('User/Password incorrect!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });

export const notifyBlocked = () => {
    toast.error('Login blocked. Please wait.', {
        position: 'top-center',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

export const notifyLoged = () => {
    toast.success('Successfully logged.', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

export const notifyFill = () =>
    toast.warning('Please fill in all fields.', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });

export const notifySignUp = () =>
    toast.success('Usuário cadastrado!!.', {
        position: 'top-center',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });

export const notifyTranfer = () =>
    toast.success('Tranferência realizada!!!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
