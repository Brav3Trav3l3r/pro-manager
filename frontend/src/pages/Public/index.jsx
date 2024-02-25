import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function PublicLayout() {
  const { taskId } = useParams();
  const url = import.meta.env.VITE_BACKEND_URL + '/tasks/' + taskId;
  const { data, isLoading, error } = useFetch(url);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error.message}</p>;
  }

  if (data) {
    content = <p>{data.task.title}</p>;
  }

  return <div>{content}</div>;
}
