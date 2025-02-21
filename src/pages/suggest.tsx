import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SuggestTask() {
    const [goal, setGoal] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
            const response = await fetch(`${apiUrl}/suggest-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ goal }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }

            const data = await response.json();
            setSuggestions(data.suggestions.split('\n'));
        } catch (err) {
            console.error('Error fetching suggestions:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">AI-Powered Task Suggestions</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Describe Your Goal</label>
                        <textarea
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            rows={4}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                    >
                        Get Suggestions
                    </button>
                </form>
                {suggestions.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-bold mb-4">Suggestions:</h2>
                        <ul className="list-disc pl-6">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className="mb-2">{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}