import React, { useState, useEffect } from 'react';
import './DigitalClock.css';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayName = dayNames[date.getDay()];

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const isAM = hours < 12;
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours = hours - 12;
    }

    const displayHours = String(hours).padStart(2, '0');

    return {
      year,
      month,
      day,
      dayName,
      hours: displayHours,
      minutes,
      seconds,
      isAM
    };
  };

  const timeData = formatTime(time);

  return (
    <div className="digital-clock-wrapper">
      <div className="clock-container">
        <div className="date-section">
          <div className="date-group">
            <div className="display-number">{timeData.year}</div>
            <div className="label">YEAR</div>
          </div>
          <div className="date-group">
            <div className="display-number">{timeData.month}</div>
            <div className="label">MONTH</div>
          </div>
          <div className="date-group">
            <div className="display-number">{timeData.day}</div>
            <div className="label">DAY</div>
          </div>
          <div className="day-name">{timeData.dayName}</div>
        </div>
        
        <div className="time-section">
          <div className="am-pm">
            <span className={timeData.isAM ? 'active' : 'inactive'}>AM</span>
            <br />
            <span className={!timeData.isAM ? 'active' : 'inactive'}>PM</span>
          </div>
          <div className="time-display">
            <div className="time-group">
              <div className="display-number large">{timeData.hours}</div>
              <div className="label">HOUR</div>
            </div>
            <div className="separator">:</div>
            <div className="time-group">
              <div className="display-number large">{timeData.minutes}</div>
              <div className="label">MINUTE</div>
            </div>
            <div className="seconds-group">
              <div className="display-number medium">{timeData.seconds}</div>
              <div className="label">SECOND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
