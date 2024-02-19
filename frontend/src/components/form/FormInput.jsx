import Proptypes from 'prop-types';
import { Text } from '../ui';

import styles from './styles/FormInput.module.css';
import { useState } from 'react';

const checkType = (type) => {
  if (type === 'password') {
    return false;
  }

  return true;
};

export default function FormInput({
  placeholder,
  mainIcon,
  secondaryIcon,
  type = 'text',
}) {
  const [isVisible, setIsVisible] = useState(() => checkType(type));
  console.log(isVisible);

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div className={styles.icon}>{mainIcon}</div>
        <input
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
        />
        <div
          onClick={togglePassword}
          style={{ cursor: 'pointer' }}
          className={styles.icon}
        >
          {secondaryIcon}
        </div>
      </div>
      <Text color="red">Error message</Text>
    </div>
  );
}

FormInput.propTypes = {
  type: Proptypes.string,
  placeholder: Proptypes.string,
  mainIcon: Proptypes.element,
  secondaryIcon: Proptypes.element,
};
