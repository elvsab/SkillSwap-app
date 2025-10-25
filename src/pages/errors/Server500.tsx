import Error500 from '../../shared/assets/images/errors/error-500.svg';
import { Button } from '@/shared/ui/button';
import styles from './Error.module.scss';
import { useNavigate } from 'react-router-dom';

export const Server500 = () => {
  const navigate = useNavigate();

  const handleError = () => {
    console.log("Error button clicked");
  };

  const handleMain = () => {
    navigate('/');
  }

  return (
    <section className={styles.error__container}>
      <Error500 className={styles.err__img}/>
      <div className={styles.err__text}>
        <h2>На сервере произошла ошибка</h2>
        <p>Попробуйте позже или вернитесь на главную страницу</p>
      </div>
      <div className={styles.err__btns}>
        <Button type='button' label='Сообщить об ошибке' secondClass="secondary" className={styles.error__button} onClick={handleError}></Button>
        <Button type='button' label='На главную' secondClass="primary" className={styles.main__button} onClick={handleMain}></Button>
      </div>
    </section>
  );
};