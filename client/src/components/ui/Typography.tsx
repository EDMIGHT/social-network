import React, { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

type TypographyProps = HTMLAttributes<HTMLElement> & {
  component: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  variant: 'title-1' | 'title-2' | 'title-3' | 'description' | 'text';
  children: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({
  component,
  variant,
  children,
  className,
  ...rest
}) => {
  return React.createElement(
    component,
    { ...rest, className: cn(variant, className) },
    children
  );
};

export default Typography;
