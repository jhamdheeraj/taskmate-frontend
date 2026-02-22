import './App.css';
import { useEffect, useState } from "react";
import { Header } from './components/Header/Header';
import { TaskList } from './components/TaskList/TaskList';
import { AddTask } from './components/AddTask/AddTask';
import axios from 'axios';
import type { Task } from './components/TaskCard/TaskCard';

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type AddTaskProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const App = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response: any = await axios.get('http://localhost:8080/api/v1/tasks');
      setTasks(response.data.content);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <AddTask tasks={tasks} setTasks={setTasks as React.Dispatch<React.SetStateAction<Task[]>>} />
        <TaskList tasks={tasks} setTasks={setTasks as React.Dispatch<React.SetStateAction<Task[]>>} />
      </main >
    </>
  )
}