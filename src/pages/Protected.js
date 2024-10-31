import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Protected() {
    const [data, setData] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/protected', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data.message);
            } catch (error) {
                setData(error.response.data.error || 'Error accessing protected route');
            }
        };
        fetchData();
    }, [token]);

    return <div>{data}</div>;
}

export default Protected;
