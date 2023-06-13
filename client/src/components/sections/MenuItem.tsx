import React from 'react';
import { NavLink } from 'react-router-dom';

import Typography from '@/components/ui/Typography';

interface MenuItemProps {
  name: string;
  img: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, img, link }) => {
  return (
    <li className=' hover:text-activity'>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `flex w-full flex-row items-center gap-2 border-l-4 p-2 ${
            isActive ? 'border-l-activity text-activity' : 'border-l-transparent'
          }`
        }
      >
        <img src={img} alt={name} className='h-12' />
        <Typography component='span' variant='title-2'>
          {name}
        </Typography>
      </NavLink>
    </li>
  );
};

export default MenuItem;
