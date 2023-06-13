import React from 'react';

import friendsIcon from '@/assets/icons/friends.svg';
import homeIcon from '@/assets/icons/home.svg';
import messageIcon from '@/assets/icons/message.svg';
import Card from '@/components/ui/Card';

import MenuItem from './MenuItem';

const links = [
  { name: 'Home', img: homeIcon, link: '/' },
  { name: 'Messages', img: messageIcon, link: '/messages' },
  { name: 'Friends', img: friendsIcon, link: '/friends' },
];

const Menu: React.FC = () => {
  const menuComponents = links.map((menu, i) => <MenuItem key={i} {...menu} />);

  return (
    <nav>
      <Card>
        <ul>{menuComponents}</ul>
      </Card>
    </nav>
  );
};

export default Menu;
