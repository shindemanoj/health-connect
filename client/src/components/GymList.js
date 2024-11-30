import React, { useEffect, useState } from 'react';
import { fetchGyms } from '../api';

const GymList = () => {
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        const getGyms = async () => {
            const { data } = await fetchGyms();
            setGyms(data);
        };
        getGyms();
    }, []);

    return (
        <div>
            <h2>Nearby Gyms</h2>
            <ul>
                {gyms}
                    <li key={gyms.id}>
                        <h3>{gyms.name}</h3>
                        <p>{gyms.location}</p>
                        <p>{gyms.distance} km away</p>
                    </li>
            </ul>
        </div>
    );
};

export default GymList;