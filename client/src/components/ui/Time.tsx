import React from 'react';

import Typography from './Typography';

interface TimeProps {
  time: Date;
  children: React.ReactNode;
}

const Time: React.FC<TimeProps> = ({ time, children }) => {
  const currentTime = new Date();
  const timeDiffInSeconds = Math.floor((currentTime.getTime() - time.getTime()) / 1000);

  const days = Math.floor(timeDiffInSeconds / (24 * 60 * 60));
  const hours = Math.floor((timeDiffInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeDiffInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(timeDiffInSeconds % 60);

  if (days >= 1) {
    return (
      <Typography component='span' variant='description'>
        {children} {days} days ago
      </Typography>
    );
  }
  if (hours >= 1) {
    return (
      <Typography component='span' variant='description'>
        {children} {hours} hours ago
      </Typography>
    );
  }
  if (minutes >= 1) {
    return (
      <Typography component='span' variant='description'>
        {children} {minutes} minutes ago
      </Typography>
    );
  }

  return (
    <Typography component='span' variant='description'>
      {children} {seconds} seconds ago
    </Typography>
  );
};

export default Time;
