import type { HTMLAttributes } from 'react';

export type TitleProps = {
      /**
       * h1 - "Популярное...";
       * h2 - "Фильтры..."; 
       * h3 - "Навыки,..."; 
       * h4 - "Может научить **/
  as: 'h1' | 'h2' | 'h3' | 'h4';
        /**
       * lg - 32px;
       * md- 24px; 
       * sm - 20px; 
       * xs - 16px **/
  size?: 'lg' | 'md' | 'sm' | 'xs';
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;