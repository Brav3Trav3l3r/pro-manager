import PropTypes from 'prop-types';
import styles from './styles/Card.module.css';
import { Text } from '../../../components/ui';
import { MoreHorizontal } from 'lucide-react';
import CheckLists from './Checklists';
import Badge from '../../../components/ui/Badge';
import { TasksContext } from '../../../store/TaskProvider';
import { useContext } from 'react';

const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'In progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function Card({ task }) {
  const { updateTask } = useContext(TasksContext);

  return (
    <div className={styles.container}>
      <div className={styles.groupOne}>
        <Text
          style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          step={1}
          color="#767575"
          weight="500"
        >
          <span className={styles[task.priority]}>•</span>{' '}
          {task.priority.toUpperCase()} PRIORITY
        </Text>

        <MoreHorizontal />
      </div>

      <div className={styles.title}>
        <Text step={5} weight="500">
          {task.title}
        </Text>
      </div>

      <CheckLists task={task} checklists={task.checklists} />

      <div className={styles.badges}>
        <Badge>Feb 20</Badge>
        <div className={styles.categoryBadges}>
          {categories.map((category) => {
            if (category.value !== task.status) {
              return (
                <div key={category.id} className="">
                  <Badge
                    onClick={() => updateTask(task, { status: category.value })}
                  >
                    {category.title}
                  </Badge>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  task: PropTypes.object.isRequired,
};
