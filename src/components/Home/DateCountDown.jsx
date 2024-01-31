"use client"

import React, { useState, useEffect } from 'react';
 

function DateCountdown({ targetDate }) {
    const [secondsLeft, setSecondsLeft] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const difference = targetDate > now ? targetDate - now : 0;
        setSecondsLeft(Math.floor(difference / 1000));
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [targetDate]);
  
    const hours = Math.floor(secondsLeft / (60 * 60));
    const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
    const seconds = secondsLeft % 60;
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return (
      <div className="countdown">{formattedTime}</div>
    );
  }
  
   
  
  export default DateCountdown;