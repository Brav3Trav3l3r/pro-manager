import { Database, LogOut, PanelsTopLeft, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/kanban_logo.png';
import { Text } from '../../components/ui';
import styles from './styles/Navigation.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export default function Navigation() {
  const { logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.image}>
          <img src={logo} alt="Pro manage" />
        </div>
        <Text step={6} weight="600">
          Pro Manage
        </Text>
      </div>

      <nav className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.icon}>
            <PanelsTopLeft color="#767575" />
          </div>
          <Text weight="500">Board</Text>
        </NavLink>

        <NavLink
          to={'analytics'}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.icon}>
            <Database color="#767575" />
          </div>
          <Text weight="500">Analytics</Text>
        </NavLink>

        <NavLink
          to={'settings'}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.icon}>
            <Settings color="#767575" />
          </div>
          <Text weight="500">Settings</Text>
        </NavLink>
      </nav>

      <div onClick={logout} className={styles.logout}>
        <div className={styles.icon}>
          <LogOut />
        </div>
        <Text>Logout</Text>
      </div>
    </div>
  );
}
