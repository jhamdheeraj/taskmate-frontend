import React, { useState } from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import axios from 'axios';


type Task = {
    id?: string;
    title?: string;
    description: string;
    completed: boolean;
    dueDate: Date;
}

export type TaskListProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}


export const TaskList = ({ tasks, setTasks }: TaskListProps) => {

    const deleteTask = async (taskId: string) => {

        try {
            await axios.delete(`http://localhost:8080/api/v1/tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }

    }

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Tasks</h2>
            <ul className="list-none pl-4">
                {
                    tasks.map((task) => (
                        <React.Fragment key={task.id}>
                            <TaskCard task={task} deleteTask={() => deleteTask(task.id ?? '')} />
                        </React.Fragment>
                    ))
                }
            </ul>
        </div>

    )
}