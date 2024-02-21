import PropTypes from 'prop-types';
import { Text } from '../../../components/ui';
import styles from './styles/Checklists.module.css';
import { ChevronDown } from 'lucide-react';
import { SECONDARY_COLOR } from '../../../constants';
import Checklist from './Checklist';
import { useContext, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { TasksContext } from '../../../store/TaskProvider';

export default function CheckLists({ task }) {
  const [lists, setLists] = useImmer(task.checklists);
  const dones = lists.filter((list) => list.checked);
  const [isOpen, setIsOpen] = useState(false);
  const { updateTask } = useContext(TasksContext);
  const ranUpdate = useRef(false);

  const handleList = (list, value) => {
    ranUpdate.current = true;

    setLists((draft) => {
      const listToUpdate = draft.find((l) => l._id === list._id);

      if (!listToUpdate) return;

      listToUpdate.checked = value;
    });
  };

  useEffect(() => {
    if (!ranUpdate.current) {
      return;
    }

    (async () => {
      await updateTask(task, { checklists: lists });
    })();

    ranUpdate.current = false;
  }, [task, lists, updateTask]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Text weight="500">
          Checklits ({dones.length + '/' + lists.length})
        </Text>

        <button
          className={styles.button}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronDown
            className={isOpen && styles.rotate}
            color={SECONDARY_COLOR}
          />
        </button>
      </div>

      {isOpen && (
        <div className={styles.lists}>
          {lists.map((list) => (
            <Checklist key={list._id} list={list} onChange={handleList} />
          ))}
        </div>
      )}
    </div>
  );
}

CheckLists.propTypes = {
  task: PropTypes.object,
};
