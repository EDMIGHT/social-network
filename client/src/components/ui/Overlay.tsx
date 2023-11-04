import { forwardRef } from 'react';

const Overlay = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className='fixed top-0 h-screen w-screen bg-black/50' />;
});

export default Overlay;
