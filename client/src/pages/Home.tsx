import React from 'react';

import PostFeed from '@/components/sections/PostFeed';

const posts = [
  {
    id: '6de5dc17-62bb-4d4c-a779-4101bfea8294',
    title: '',
    text: 'rewerw',
    img: null,
    viewsCount: 0,
    createdAt: new Date('2023-06-09T07:15:49.131Z'),
    updatedAt: null,
    userId: '863f78b8-13ee-49c1-925e-dc279f101e6c',
    likedById: null,
    tags: [
      {
        id: '549763ed-42f4-43c8-91d4-2eec8af50742',
        name: 'for me new',
      },
    ],
  },
  {
    id: '9b5135c3-fb02-4afa-b144-cb3a9b793e20',
    title: 'fdasasgf',
    text: 'rewerw',
    img: null,
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
  },
];

const Home: React.FC = () => {
  return (
    <div className=''>
      <PostFeed posts={posts} currentPage={1} totalPages={10} />
    </div>
  );
};

export default Home;
