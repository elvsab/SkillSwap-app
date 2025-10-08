import { Button } from '../../../shared/ui/button';
import styles from './AuthForm.module.css';
import GoogleIcon from '../../../shared/assets/icons/socials/google.svg';
import AppleIcon from '../../../shared/assets/icons/socials/apple.svg';

export const SocialAuth = () => {
  return (
    <div>
      <div className={styles['social-auth']}>
        <Button
          label="Продолжить с Google"
          secondClass="secondary"
          buttonWidth="100%"
          padding="12px 24px"
          icon={GoogleIcon}
          iconPosition="left"
          className={styles['social-btn']}
        />
        <Button
          label="Продолжить с Apple"
          secondClass="secondary"
          buttonWidth="100%"
          padding="12px 24px"
          icon={AppleIcon}
          iconPosition="left"
          className={styles['social-btn']}
        />
      </div>

      <div className={styles['auth-container__separator']} aria-hidden="true">
        <span />
        <span>или</span>
        <span />
      </div>
    </div>
  );
};