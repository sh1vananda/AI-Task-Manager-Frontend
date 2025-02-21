import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { Task } from '@/types/types';

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use environment variable
                const response = await fetch(`${apiUrl}/tasks`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <ProtectedRoute>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Title</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="border-b">
                                <td className="p-2">{task.title}</td>
                                <td className="p-2">{task.description}</td>
                                <td className="p-2">{task.status}</td>
                                <td className="p-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                                        Mark Complete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProtectedRoute>
    );
}