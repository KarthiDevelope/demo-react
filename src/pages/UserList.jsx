import React, { useState, useEffect } from 'react';
import { Table, Space, message } from 'antd';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Function to fetch users from an API endpoint
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://demo-nodejs-1.onrender.com/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                message.error('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); 
        return () => {
            
        };
    }, []); 

    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span>{text}</span>,
        }
    ];

    return (
        <div>
            <h1>User List</h1>
            <Table columns={columns} dataSource={users} loading={loading} bordered
                size="small" />
        </div>
    );
};

export default UserList;
