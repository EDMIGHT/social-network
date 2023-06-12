import React from 'react';

interface TypographyProps {
  component: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  variant: 'title-1' | 'title-2' | 'title-3' | 'description' | 'text';
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ component, variant, children }) => {
  return React.createElement(component, { className: variant }, children);
};

export default Typography;
