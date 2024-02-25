import { RadioGroup } from '@headlessui/react';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';
import { Button, Text } from '../../../components/ui';
import { TasksContext } from '../../../store/TaskProvider';
import styles from './styles/TaskForm.module.css';

const dummyTask = {
  title: '',
  checklists: [],
  priority: 'high',
};

export default function TaskForm({
  defaultTask = dummyTask,
  toggleModal,
  action = 'add',
}) {
  const [task, setTask] = useImmer(defaultTask);
  const { majorTaskUpdate, addTask, isLoading } = useContext(TasksContext);

  useEffect(() => console.log(task), [task]);

  const handleAddTask = async () => {
    await addTask(task);
    toggleModal();
  };

  const handleUpdateTask = async () => {
    await majorTaskUpdate(task._id, task);
    toggleModal();
  };

  ////////////////////////////////
  // component state modifiers

  const updateTitle = (value) => {
    setTask((draft) => {
      draft.title = value;
    });
  };

  const changePriority = (priority) => {
    setTask((draft) => {
      draft.priority = priority;
    });
  };

  const addList = () => {
    setTask((draft) => {
      draft.checklists.push({
        checked: false,
        title: '',
        _id: uuidv4(),
        isNew: true,
      });
    });
  };

  const deletList = (id) => {
    console.log(id);
    setTask((draft) => {
      draft.checklists = draft.checklists.filter((list) => list._id !== id);
    });
  };

  const updateListChecked = (listId, value) => {
    setTask((draft) => {
      let list = draft.checklists.find((list) => list._id === listId);

      if (!list) return;

      list.checked = value;
    });
  };

  const updateListTitle = (listId, value) => {
    setTask((draft) => {
      let list = draft.checklists.find((list) => list._id === listId);

      if (!list) return;

      list.title = value;
    });
  };

  const dones = task?.checklists.filter((list) => list.checked);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <label htmlFor="taskTitle">
          Title <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          placeholder="Title"
          type="text"
          id="taskTitle"
          value={task.title}
          onChange={(e) => updateTitle(e.target.value)}
        />
      </div>

      <RadioGroup
        className={styles.radioGroup}
        value={task.priority}
        onChange={changePriority}
      >
        <RadioGroup.Label>
          Select Priority <span style={{ color: 'red' }}>*</span>
        </RadioGroup.Label>

        <div className={styles.radioOptions}>
          <RadioGroup.Option value="high">
            {({ checked }) => (
              <div
                className={` ${checked && styles.checkedOption} ${
                  styles.radioOption
                }`}
              >
                <Text step={1}>
                  <span
                    style={{
                      color: '#ff2473',
                    }}
                  >
                    •
                  </span>
                  HIGH PRIORITY
                </Text>
              </div>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="moderate">
            {({ checked }) => (
              <div
                className={` ${checked && styles.checkedOption} ${
                  styles.radioOption
                }`}
              >
                <Text step={1}>
                  <span style={{ color: '#18b0ff' }}>•</span> MODERATE PRIORITY
                </Text>
              </div>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="low">
            {({ checked }) => (
              <div
                className={` ${checked && styles.checkedOption} ${
                  styles.radioOption
                }`}
              >
                <Text step={1}>
                  <span style={{ color: '#63c05b' }}>•</span> LOW PRIORITY
                </Text>
              </div>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>

      <div className={styles.checklists}>
        <Text>
          Checklist (
          {(dones.length ?? 0) + '/' + (task?.checklists.length ?? 0)}){' '}
          <span style={{ color: 'red' }}>*</span>
        </Text>

        <div className={styles.lists}>
          {task?.checklists.map((list) => (
            <div className={styles.list} key={list._id}>
              <input
                type="checkbox"
                name=""
                id=""
                checked={list.checked}
                onChange={(e) => updateListChecked(list._id, e.target.checked)}
              />
              <input
                type="text"
                value={list.title}
                onChange={(e) => updateListTitle(list._id, e.target.value)}
              />
              <button onClick={() => deletList(list._id)} type="button">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.addButton}>
          <Button onClick={addList} version="ghost">
            + Add New
          </Button>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <div className={styles.datePicker}>
          <Button>Select due date</Button>
        </div>

        <div className={styles.actions}>
          <Button version="error" onClick={toggleModal}>
            Cancel
          </Button>
          <Button onClick={action == 'add' ? handleAddTask : handleUpdateTask}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

TaskForm.propTypes = {
  defaultTask: PropTypes.object,
  toggleModal: PropTypes.func,
  action: PropTypes.oneOf(['add', 'update']),
};
