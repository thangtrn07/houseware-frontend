'use client';
import { Button, ButtonProps, Tooltip, TooltipProps } from '@nextui-org/react';
import React from 'react';
import tw from '~/lib/tw';

type ButtonUI = {
   tooltip?: string;
   tooltipProp?: TooltipProps;
   disabled?: boolean;
};

const ButtonUI: React.FC<ButtonProps & ButtonUI> = ({
   children,
   tooltip,
   className,
   color = 'default',
   tooltipProp,
   disabled,
   ...rest
}) => {
   if (tooltip) {
      return (
         <Tooltip
            showArrow={true}
            content={tooltip}
            radius='none'
            className='z-40 rounded'
            closeDelay={0}
            {...tooltipProp}
         >
            <Button
               disabled={disabled}
               className={tw('rounded', className)}
               color={color}
               {...rest}
            >
               {children}
            </Button>
         </Tooltip>
      );
   }
   return (
      <Button disabled={disabled} className={tw('rounded', className)} color={color} {...rest}>
         {children}
      </Button>
   );
};

export default ButtonUI;
