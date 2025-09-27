import React from 'react';
import styles from './Title.module.css';
import type { TitleProps } from './Title.types';

export const Title: React.FC<TitleProps> = ({
  as: Tag,
  size,
  children,
  className,
  ...props
}) => {
  const classNames = [
    styles.title,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};