import { useState } from "react";
import './TaskCard.css'; // Import the CSS file
import { format } from 'date-fns';


export type Task = {
    id?: string;
    title?: string;
    description: string;
    completed: boolean;
    dueDate: Date;
}

type TaskCardProps = {
    task: Task
    deleteTask: (id: string) => void;
}


export const TaskCard = (props: TaskCardProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(props.task);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTask(props.task);
    }

    // const handleSaveEdit = async () => {
    //     setIsEditing(false);
    //     try {
    //         const response = await axios.put(`/api/tasks/${props.task.id}`, editedTask);
    //         const updatedTasks = tasks.map(task => task.id === response.data.id ? response.data : task);
    //         props.setTasks(updatedTasks);
    //     } catch (error) {
    //         console.error('Error updating task:', error);
    //     }
    // }


    return (
        <div className="task-card">
            <div className="task-card-content">
                <h2 className="task-card-title">{props.task.title}</h2>
                <p className="task-card-description">{props.task.description}</p>
                <div className="task-card-center">
                    <p className="task-card-due-date">Due Date: {format(props.task.dueDate, 'yyyy-MM-dd')}</p>
                    <p className="task-card-status" style={{ color: props.task.completed ? 'green' : 'red' }}>
                        Current Status: {props.task.completed ? 'Completed' : 'Incomplete'}
                    </p>
                </div>
            </div>
            <div className="task-card-actions">
                <button
                    className="task-card-button"
                    onClick={handleEdit}
                    disabled={true}
                >
                    Edit (TBD)
                </button>
                <button
                    className="task-card-button-delete"
                    onClick={() => props.deleteTask(props.task.id as string)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
