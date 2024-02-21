import PropTypes from 'prop-types';
import { CopyMinus, Plus } from 'lucide-react';
import styles from './styles/Container.module.css';
import { Text } from '../../../components/ui';
import Card from './Card';

export default function Container({ tasks, category }) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Text step={4} weight="500">
          {category.title}
        </Text>
        <div className={styles.icons}>
          {category.title == 'To do' && <Plus size={20} color="#767575" />}
          <CopyMinus size={20} color="#767575" />
        </div>
      </div>

      <div className={styles.tasks}>
        {tasks.map((task) => {
          if (task.status == category.value) {
            return <Card key={task._id} task={task} />;
          }
        })}
      </div>
    </div>
  );
}

Container.propTypes = {
  tasks: PropTypes.array,
  category: PropTypes.object,
};
