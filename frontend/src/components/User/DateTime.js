import React, {  useEffect, useState } from 'react';

import './User.css';


export default function DateTime() {
    const locale = 'en';
    const [ currentDate, setCurrentDate ] = useState(new Date());


    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentDate(new Date());

        }, 1000);

        return () => {
        clearInterval(timer);
        };
    }, []);

    const day = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short', year: 'numeric' });
    const time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

    return (
        <>
            <div className="date-time-cont">
                <p><i className="fa-regular fa-calendar"></i>{day}</p>
                <p><i className="fa-regular fa-clock"></i>{time}</p>
            </div>
        </>
    );
}
