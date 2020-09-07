import React, { useState, useEffect } from 'react';

let timer: number | null = null;

const useTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        timer = window.setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            timer && clearInterval(timer);
            timer = null;
        }
    }, []);

    return time;
}

export default useTime;