import { PropsWithChildren } from 'react';
import { Button as MuiButton } from '@mui/material';

interface Props {
  isDirty: boolean;
  isValid: boolean;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function Button({
  isDirty,
  isValid,
  children,
  type = 'button',
}: PropsWithChildren<Props>) {
  return (
      <MuiButton
        type={type}
        fullWidth
        variant="contained"
        disabled={!isDirty || !isValid}
      >
        {children}
      </MuiButton>
  );
}
