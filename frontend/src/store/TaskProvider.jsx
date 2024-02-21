import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthProvider';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';

export const TasksContext = createContext({
  tasks: {},
  isLoading: true,
  updateTask: async () => {},
});

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useImmer(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { token } = user;

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/tasks', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!res.ok) {
        const errObj = await res.json();
        console.log(errObj);
        throw new Error(errObj.message);
      }

      const dataObj = await res.json();
      return dataObj.data.tasks;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const updateTaskInDB = useCallback(
    async (task, updates) => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + '/tasks/' + task._id,
          {
            method: 'PATCH',
            body: JSON.stringify(updates),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );

        if (!res.ok) {
          const errObj = await res.json();
          console.log(errObj);
          throw new Error(errObj.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [token]
  );

  const updateTasksState = useCallback(
    (task, updates) => {
      setTasks((draft) => {
        let tsk = draft.find((t) => t._id == task._id);

        if (!tsk) return;

        const updateKeys = Object.keys(updates);
        updateKeys.map((updateKey) => (tsk[updateKey] = updates[updateKey]));
      });
    },
    [setTasks]
  );

  const updateTask = useCallback(
    async (task, updates) => {
      // updateState
      updateTasksState(task, updates);
      // updateDB
      await updateTaskInDB(task, updates);
    },
    [updateTaskInDB, updateTasksState]
  );

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, [fetchTasks, setTasks]);

  return (
    <TasksContext.Provider
      value={useMemo(() => {
        return { tasks, isLoading, updateTask };
      }, [tasks, isLoading, updateTask])}
    >
      {children}
    </TasksContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node,
};
