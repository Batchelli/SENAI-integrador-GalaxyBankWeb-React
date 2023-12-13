import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import { PiIdentificationCardFill as Id } from 'react-icons/pi';
import styles from './Home.module.css';
import Img1 from '../../assets/Bg/img2.svg';
import Img2 from '../../assets/Bg/img3.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const Home = () => {

  const [cpf, setCpf] = useState('')

  const navigate = useNavigate();

  const handleCpfChange = (e) => {
    const value = e.target.value;

    // Limita o CPF a 11 caracteres
    if (value.length <= 11) {
      setCpf(value);
    }
  };

  const passaCpf = () => {
    navigate(`/register`, { state: { cpf } });
  };

  return (
    <div className={styles.container}>
      <section className={styles.s1}>
        <div className={styles.cont_cad}>
          <article className={styles.text}>
            <h2>Venha fazer parte da nossa história</h2>
            <p>GalaxyBank o banco certo para te levar até a lua</p>
          </article>
          <div className={styles.inp}>
            <Id className={styles.icon} />
            <Input
              type='number'
              text='Cpf'
              name="cpf"
              onChange={handleCpfChange}
              value={cpf}
            />
          </div>
          <p id={styles.cad}>Informe seu cpf para se cadastrar</p>
          <div className={styles.btn}>
            <Button text='Continuar' onClick={passaCpf} />
          </div>
        </div>
      </section>

      <section className={styles.s2} id="oBanco">
        <div className={styles.contdesc1}>
          <article className={styles.contS2}>
            <div className={styles.desc}>
              <h1>UM BANCO PRA QUEM</h1>
              <h1>PENSA NO FUTURO</h1>
              <p>
                Feito com investidores<br />
                Para investidores<br />
                Para quem está em constante<br />
                <strong>EVOLUÇÃO</strong>
              </p>
            </div>
            <div className={styles.imgmask}>
              <img src={Img1} alt="Background 1" />
            </div>
          </article>
        </div>

        <div className={styles.contdesc1}>
          <article className={styles.contS2}>
            <div className={styles.imgmask}>
              <img src={Img2} alt="Background 2" />
            </div>
            <div className={styles.desc}>
              <h1>LEVAMOS SEU DINHEIRO</h1>
              <h1>PARA O CAMINHO CERTO</h1>
              <p>Garanta ganhos galácticos</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;
