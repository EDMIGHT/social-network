import React from 'react';

import TagsAll from './TagsAll';
import TagsSelected from './TagsSelected';

const Aside: React.FC = () => {
  return (
    <div>
      <TagsSelected />
      <TagsAll />
    </div>
  );
};

export default Aside;
