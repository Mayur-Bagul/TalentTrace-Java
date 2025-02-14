import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

const UsersPageTable = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users from the backend
        axios.get('http://localhost:8088/api/users/all')
            .then(response => {
                setUsers(response.data); // Store the users' data in state
            })
            .catch(err => {
                setError('Error fetching user data. Please try again.');
                console.error(err);
            });
    }, []);

    const handleDelete = (userId) => {
        // Delete the user by ID (optional functionality)
        axios.delete(`http://localhost:8088/api/users/${userId}`)
            .then(() => {
                // Remove the deleted user from the list
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error("Error deleting user:", error));
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700 mb-6 relative z-10"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Users List</h2>
            </div>

            {/* Error message */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-400">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Phone Number</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-500">
                        {users.map((user) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.1, delay: 0.2 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{user.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                                    {user.roles.map(role => role.name).join(', ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center">
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UsersPageTable;






