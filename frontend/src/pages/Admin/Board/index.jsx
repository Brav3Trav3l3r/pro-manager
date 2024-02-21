import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useContext, useState } from 'react';
import { Text } from '../../../components/ui';
import { AuthContext } from '../../../store/AuthProvider';
import styles from './styles/index.module.css';
import TasksContainer from './TasksContainer';
import TaskProvider from '../../../store/TaskProvider';

const options = [
  { id: 1, name: 'Today' },
  { id: 2, name: 'This week' },
  { id: 3, name: 'This month' },
];

export default function Board() {
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(options[1]);

  const date = new Date();

  return (
    <TaskProvider>
      <div className={styles.container}>
        <div className={styles.groupOne}>
          <Text step={5} weight="500">
            Welcome! {user.info.name}
          </Text>
          <Text style={{ opacity: '0.4' }} weight="500">
            20th Feb, 2024
          </Text>
        </div>

        <div className={styles.groupTwo}>
          <Text step={6} weight="500">
            Board
          </Text>

          <Listbox
            as="div"
            className={styles.listbox}
            value={selectedOption}
            onChange={setSelectedOption}
          >
            {({ open }) => (
              <>
                <Listbox.Button className={styles.listboxButton}>
                  {selectedOption.name}
                  <ChevronDown
                    size={16}
                    className={open ? styles.rotate : ''}
                  />
                </Listbox.Button>

                <Listbox.Options className={styles.listboxOptions}>
                  {options.map((option) => (
                    <Listbox.Option key={option.id} value={option}>
                      {({ active, selected }) => (
                        <div
                          className={`${active && styles.active} ${
                            styles.listboxOption
                          } ${selected && styles.selected}`}
                        >
                          {option.name}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </>
            )}
          </Listbox>
        </div>

        <TasksContainer />
      </div>
    </TaskProvider>
  );
}
