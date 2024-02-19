import Proptypes from 'prop-types';
import styles from './styles/Button.module.css';

export default function Button({ children = 'Button', variant = 'primary' }) {
  const buttonVariant = styles[variant];

  return (
    <button className={`${buttonVariant} ${styles.button}`}>{children}</button>
  );
}

Button.propTypes = {
  children: Proptypes.string,
  variant: Proptypes.oneOf(['primary', 'outline']),
};
