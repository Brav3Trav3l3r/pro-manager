import { Eye, Lock, Mail, User } from 'lucide-react';
import FormInput from '../../../components/form/FormInput';
import Form from '../Form';
import styles from './styles/index.module.css';
import Button from '../../../components/ui/Button';

export default function Register() {
  return (
    <Form title="Register">
      <form action="" className={styles.form}>
        <FormInput placeholder={'Name'} mainIcon={<User />} />
        <FormInput placeholder={'Email'} mainIcon={<Mail />} />
        <FormInput
          type="password"
          placeholder={'Password'}
          mainIcon={<Lock />}
          secondaryIcon={<Eye />}
        />
        <FormInput
          type="password"
          placeholder={'Confirm Password'}
          mainIcon={<Lock />}
          secondaryIcon={<Eye />}
        />

        <Button>Register</Button>
      </form>
    </Form>
  );
}
