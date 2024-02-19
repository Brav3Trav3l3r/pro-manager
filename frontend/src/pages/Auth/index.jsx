import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import astroBoy from '../../assets/kanban_astro.png';

import styles from './style/index.module.css';
import { Text } from '../../components/ui';

export default function AuthLayout() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#fff',
            color: 'black',
          },
        }}
      />

      <main className={styles.container}>
        <div className={styles.poster}>
          <div className={styles.image}>
            <img src={astroBoy} alt="Astro boy" />
          </div>

          <Text color="white" step={8}>
            Welcome aboard my friend
          </Text>

          <Text color="white" step={4} style={{ marginTop: '0.5rem' }}>
            Just a couple of clicks and we start
          </Text>
        </div>

        <div className={styles.outlet}>
          <Outlet />
        </div>
      </main>
    </>
  );
}
