import { Eye, Lock, Mail } from 'lucide-react';
import FormInput from '../../../components/form/FormInput';

import Button from '../../../components/ui/Button';
import Form from '../Form';
import styles from './styles/index.module.css';

export default function Login() {
  return (
    <Form title="Login">
      <form action="" className={styles.form}>
        <FormInput placeholder={'Email'} mainIcon={<Mail />} />
        <FormInput
          type="password"
          placeholder={'Password'}
          mainIcon={<Lock />}
          secondaryIcon={<Eye />}
        />

        <Button>Login</Button>
      </form>
    </Form>
  );
}
