import React, { useMemo } from 'react';

import formatTime from '@/utils/formatTime';

import Typography from './Typography';

interface TimeProps {
  time: Date;
  children: React.ReactNode;
}

const Time: React.FC<TimeProps> = React.memo(({ time, children }) => {
  const formattedTime = useMemo(() => formatTime(time), [time]);

  return (
    <Typography component='span' variant='description'>
      {children} {formattedTime}
    </Typography>
  );
});

export default Time;
