import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Logado.module.css';
import Input from '../../components/Input/Input';
import { MdAttachMoney as Money } from "react-icons/md";
import { HiIdentification as Id } from "react-icons/hi2";
import { ToastContainer} from 'react-toastify';
import { notifyTranfer } from '../../components/notify/Toast';

const formatarCPF = (cpf) => {
    const cpfString = cpf.toString();
    return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const Logado = () => {
    const [userData, setUserData] = useState(null);
    const cpf = localStorage.getItem('cpf');
    const [transactions, setTransactions] = useState([]);
    const [transferData, setTransferData] = useState({
        sender_cpf: cpf,  // Use o CPF do usuário logado como remetente
        receiver_cpf: '',
        amount: '',
    });
    const [saldo, setSaldo] = useState(null);

    // Função para obter o histórico de transações
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/transactions/${cpf}/`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Erro ao obter o histórico de transações:', error);
            }
        };
        fetchTransactions();
        const transactionsIntervalTimer = setInterval(fetchTransactions, 5000);
        return () => clearInterval(transactionsIntervalTimer);
    }, [cpf]);

    // Função para obter dados do usuário
    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setUserData(response.data);
                setSaldo(response.data.saldo);
            } catch (error) {
                console.error('Erro ao obter informações do usuário:', error.response.data);
            }
        };
        fetchDados();
        const fetchDadosTimer = setInterval(fetchDados, 5000);
        return () => clearInterval(fetchDadosTimer);
    }, []);

    const handleInputChange = (e) => {
        setTransferData({ ...transferData, [e.target.name]: e.target.value });
    };

    // Função para realizar tranferencias
    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/transfer/', transferData);
            console.log('Resposta da transferência:', response.data);
            notifyTranfer()

            // Lógica após uma transferência bem-sucedida
        } catch (error) {
            console.error('Erro na transferência:', error.response.data.detail);
            // Lógica adicional em caso de falha na transferência
        }
    };

    return (
        <div className={styles.container}>
            {userData && (
                <div className={styles.userArea}>
                    <div className={styles.user}>
                        <div className={styles.imgArea}>
                            {userData.profile_picture && (
                                <img src={userData.profile_picture} alt="Foto de Perfil" className={styles.img} />
                            )}
                        </div>
                        <div>
                            <p id={styles.name}>{userData.first_name} {userData.last_name}</p>
                            <p id={styles.saldo}>R$: {saldo !== null ? saldo : 'Carregando...'}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.userCont}>
                <div className={styles.userHistory}>
                    <h1 id={styles.transf}>Transação</h1>
                    <form onSubmit={handleTransfer} className={styles.transCont}>
                        <div className={styles.inps}>
                            <p id={styles.transf}>CPF do Destinatário:</p>
                            <br />
                            <Id size={18} className={styles.icon} />
                            <input
                                className={styles.inp}
                                type="number"
                                name="receiver_cpf"
                                value={transferData.receiver_cpf}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inps}>
                            <p id={styles.transf}>Valor:</p>
                            <br />
                            <Money size={18} className={styles.icon} />
                            <input
                                className={styles.inp}
                                type="number"
                                name="amount"
                                value={transferData.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.btnArea}>
                            <button type="submit" className={styles.btn}>Transferir</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles.userCont}>
                <div className={styles.userHistory}>
                    <h1 id={styles.transf}>Histórico de Transações</h1>
                    {transactions.map(transaction => (
                        <div key={transaction.id} className={styles.history}>
                            <div className={styles.teste2}>
                                {`Transferência de ${transaction.sender_name} para ${transaction.receiver_name}`}
                            </div>
                            <div className={styles.teste}>
                                <p>R$:</p>
                                {`${transaction.amount}`}
                            </div>
                        </div>
                    ))}
                </div>
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

export default Logado;
