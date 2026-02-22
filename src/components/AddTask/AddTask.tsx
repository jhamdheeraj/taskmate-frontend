import React, { useState } from 'react'
import type { Task } from '../TaskCard/TaskCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export const AddTask = ({ tasks, setTasks }: { tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {

    const [taskValue, setTaskValue] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [progress, setProgress] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskValue(event?.target?.value);
    }
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskDescription(event.target.value);
    };
    const handleDueDateChange = (date: Date | null) => {
        setDueDate(date);
    };
    const handleReset = () => { setTaskValue(''); setTaskDescription(''); setDueDate(null); }

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();
        const task = {
            title: taskValue,
            description: taskDescription,
            completed: progress,
            dueDate: dueDate ?? new Date(),
        }
        try {
            const response = await axios.post('http://localhost:8080/api/v1/tasks', task);
            const newTasks = [...tasks, response.data];
            setTasks(newTasks);
            handleReset();
        } catch (error) {
            console.error('Error creating task:', error);
        }
        console.log(task);
        setTasks([...tasks, task]); // Add new task into the existing list of tasks
        handleReset();
    }
    return (
        <section className='addtask'>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <input
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        type='text'
                        name='task-name'
                        id='task-name'
                        placeholder='Task name'
                        autoComplete='off'
                        value={taskValue} />
                </div>
                <div>
                    <textarea
                        name="taskDescription"
                        id="taskDescription" rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder='Description'
                        value={taskDescription} onChange={handleDescriptionChange} />
                </div>
                <div className="flex items-center">
                    <div className="flex items-center">
                        <select
                            className='border p-2 rounded'
                            onChange={(event) => setProgress(Boolean(event.target.value))} value={progress.toString()}>
                            <option value=''>Pending</option>
                            <option value='true'>Completed</option>
                        </select>
                    </div>
                    <div className="ml-4">
                        <DatePicker
                            id="dueDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            selected={dueDate}
                            onChange={handleDueDateChange}
                            placeholderText="Select due date"
                        />
                    </div>

                </div>
                <div className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm">

                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Task</button>
                    <button type="reset" className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </section>
    )
}
