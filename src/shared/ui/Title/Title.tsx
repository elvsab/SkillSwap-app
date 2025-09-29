import React from 'react';
import clsx from 'clsx';
import styles from './Title.module.css';
import type { TitleProps } from './Title.types';

const defaultSize: Record<TitleProps['as'], Required<TitleProps>['size']> = {
  h1: 'lg',
  h2: 'md',
  h3: 'sm',
  h4: 'xs',
};

export const Title: React.FC<TitleProps> = ({
  as: Tag,
  size,
  children,
  className,
  ...props
}) => {
  
  const titleSize = size ?? defaultSize[Tag];

  const classNames = clsx(
    styles.title,
    styles[titleSize],
    className
  );

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};