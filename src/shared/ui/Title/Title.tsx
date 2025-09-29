import React from 'react';
import clsx from 'clsx';
import styles from './Title.module.css';
import type { TitleProps } from './Title.types';

export const Title: React.FC<TitleProps> = ({
  as: Tag,
  size,
  children,
  className,
  ...props
}) => {
  const classNames = clsx(
    styles.title,
    styles[size],
    className
  );

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};