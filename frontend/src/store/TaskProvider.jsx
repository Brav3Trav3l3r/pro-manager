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
  isLoading: false,
  fetchTasks: async () => {},
  minorTaskUpdate: async () => {},
  majorTaskUpdate: async () => {},
  addTask: async () => {},
  deleteTask: async () => {},
});

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useImmer(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { token } = user;

  const fetchTasks = useCallback(async () => {
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
      setTasks(dataObj.data.tasks);
    } catch (error) {
      toast.error(error.message);
    }
  }, [token, setTasks]);

  ////////////////////////////////
  // For updates made on card itself

  const minorDbUpdate = useCallback(
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

  const minorStateUpdate = useCallback(
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

  const minorTaskUpdate = useCallback(
    async (task, updates) => {
      // updateState
      minorStateUpdate(task, updates);
      // updateDB
      await minorDbUpdate(task, updates);
    },
    [minorStateUpdate, minorDbUpdate]
  );

  ////////////////////////////////
  // For updates made on TaskForm

  const majorDbUpdate = useCallback(
    async (taskId, updates) => {
      const copyTask = JSON.parse(JSON.stringify(updates));
      copyTask.checklists.forEach((list) => {
        if (list.isNew) {
          delete list._id;
          delete list.isNew;
        }
      });

      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + '/tasks/' + taskId,
          {
            method: 'PATCH',
            body: JSON.stringify(copyTask),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );

        if (!res.ok) {
          const errObj = await res.json();
          throw new Error(errObj.message);
        }

        const resObj = await res.json();
        toast.success('Successfully updated task!');
        return resObj.data.task;
      } catch (error) {
        toast.error(error.message);
      }
    },
    [token]
  );

  const majorTaskUpdate = useCallback(
    async (taskId, updates) => {
      // update db first
      const updatedTask = await majorDbUpdate(taskId, updates);
      // then update state with return value
      setTasks((draft) => {
        let index = draft.findIndex((task) => task._id === taskId);
        if (index < 0) return;
        draft[index] = updatedTask;
      });
    },
    [majorDbUpdate, setTasks]
  );

  ////////////////////////////////
  // Add new task

  const addTaskToDb = useCallback(
    async (task) => {
      console.log(task);
      // deep copy and remove _id from lists
      const copyTask = JSON.parse(JSON.stringify(task));
      copyTask.checklists.forEach((list) => {
        delete list._id;
        delete list.isNew;
      });

      console.log('copy: ', copyTask);

      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/tasks/', {
          method: 'POST',
          body: JSON.stringify(copyTask),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        if (!res.ok) {
          const errObj = await res.json();
          throw new Error(errObj.message);
        }

        const resObj = await res.json();
        toast.success('Successfully added task!');
        return resObj.data.task;
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
    [token]
  );

  const addTask = useCallback(
    async (task) => {
      const newTask = await addTaskToDb(task);

      setTasks((draft) => {
        draft.push(newTask);
      });
    },
    [setTasks, addTaskToDb]
  );

  /////////////////////////////////
  // delete task

  const deleteTaskFromDb = useCallback(
    async (taskId) => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + '/tasks/' + taskId,
          {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );

        if (!res.ok) {
          const errObj = await res.json();
          throw new Error(errObj.message);
        }

        toast.success('Deleted task successfully');
      } catch (error) {
        toast.error(error.message);
      }
    },
    [token]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      await deleteTaskFromDb(taskId);
      await fetchTasks();
    },
    [deleteTaskFromDb, fetchTasks]
  );

  useEffect(() => {
    (async () => {
      fetchTasks();
    })();
  }, [fetchTasks]);

  return (
    <TasksContext.Provider
      value={useMemo(() => {
        return {
          tasks,
          isLoading,
          minorTaskUpdate,
          fetchTasks,
          addTask,
          majorTaskUpdate,
          deleteTask,
        };
      }, [
        tasks,
        isLoading,
        deleteTask,
        minorTaskUpdate,
        fetchTasks,
        addTask,
        majorTaskUpdate,
      ])}
    >
      {children}
    </TasksContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node,
};
