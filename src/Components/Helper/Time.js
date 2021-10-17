import React, { useState, useEffect } from 'react';
import moment from 'moment'





const Time = () => {

    const [time, setTime] = useState(moment().format('D MMMM YYYY H:mm'));

    useEffect(() => {

        setInterval(() => setTime(moment().format('D MMMM YYYY H:mm')), 1000);

    }, [time])

    return <h3>{time}</h3>
};

export default Time;