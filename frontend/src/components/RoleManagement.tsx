import { useState, useEffect } from 'react';
import axios from 'axios';

const RoleManagement = () => {
    const [roles, setRoles] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchRolesAndUsers = async () => {
            const rolesResponse = await axios.get('http://localhost:8000/api/roles');
            const usersResponse = await axios.get('http://localhost:8000/api/users');
            setRoles(rolesResponse.data);
            setUsers(usersResponse.data);
        };

        fetchRolesAndUsers();
    }, []);

    const assignRole = async (userId: number, role: string) => {
        await axios.post(`http://localhost:8000/api/users/${userId}/roles`, { role });
        // Update user roles in state
    };

    return (
        <div>
            <h2>Role Management</h2>
            <div>
                <h3>Users</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.roles.map((role: any) => role.name).join(', ')}
                            <select onChange={(e) => assignRole(user.id, e.target.value)}>
                                <option value="">Assign Role</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoleManagement;
