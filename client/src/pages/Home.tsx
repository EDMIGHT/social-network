import React from 'react';

import Posts from '@/components/sections/Posts';

const posts = [
  {
    id: '6de5dc17-62bb-4d4c-a779-4101bfea8294',
    title: '',
    text: 'rewerw',
    img: 'https://i.pinimg.com/originals/fe/07/39/fe0739322e4d782b0dd87d74a672af6f.jpg',
    viewsCount: 0,
    createdAt: new Date('2023-06-09T07:15:49.131Z'),
    updatedAt: new Date(),
    userId: '863f78b8-13ee-49c1-925e-dc279f101e6c',
    likedById: null,
    tags: [
      {
        id: '549763ed-42f4-43c8-91d4-2eec8af50742',
        name: 'for me new',
      },
    ],
    user: {
      login: 'loremization',
      name: 'loremtest',
      img: 'https://i.pinimg.com/564x/52/c3/21/52c3210d4639feab9d28c4e2e468d7a1.jpg',
    },
  },
  {
    id: '9b5135c3-fb02-4afa-b144-cb3a9b793e20',
    title: 'fdasasgf',
    text: 'rewerw',
    img: 'https://i.pinimg.com/originals/1a/ce/b6/1aceb65c8cfe378528476f65d41e346b.jpg',
    viewsCount: 0,
    createdAt: new Date('2023-06-09T06:41:21.501Z'),
    updatedAt: null,
    userId: '863f78b8-13ee-49c1-925e-dc279f101e6c',
    likedById: null,
    tags: [
      {
        id: '549763ed-42f4-43c8-91d4-2eec8af50742',
        name: 'for me new',
      },
    ],
    user: {
      login: 'loremization',
      name: 'loremtest',
      img: 'https://i.pinimg.com/564x/4d/3e/fb/4d3efbfc884ec474844abc8942ae3f7b.jpg',
    },
  },
];

const Home: React.FC = () => {
  return (
    <div className=''>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
