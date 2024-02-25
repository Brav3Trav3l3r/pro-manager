import PropTypes from 'prop-types';
import styles from './styles/Button.module.css';

export default function Button({
  children = 'Button',
  variant = 'solid',
  version = 'primary',
  style,
  onClick,
}) {
  const buttonVariant = styles[variant];
  const buttonVersion = styles[version];

  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      className={`${buttonVariant} ${buttonVersion} ${styles.button}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['solid', 'outline', 'ghost']),
  version: PropTypes.oneOf(['error', 'primary', 'success', 'ghost']),
};
