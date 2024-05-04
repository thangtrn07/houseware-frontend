'use client';
import React from 'react';
import { Chip } from '@nextui-org/react';

interface BadgeUIProps {
   startIcon?: React.ReactNode;
   color?: 'success' | 'default' | 'primary' | 'secondary' | 'warning' | 'danger' | undefined;
   variant?: 'dot' | 'faded' | 'solid' | 'bordered' | 'light' | 'flat' | 'shadow' | undefined;
   text: string;
   radius?: 'none' | 'sm' | 'md' | 'lg' | 'full' | undefined;
   [index: string]: any;
}

const BadgeUI: React.FC<BadgeUIProps> = ({ startIcon, text, color, variant, radius, ...rest }) => {
   return (
      <Chip startContent={startIcon} variant={variant} color={color} radius={radius} {...rest}>
         {text}
      </Chip>
   );
};

export default BadgeUI;
