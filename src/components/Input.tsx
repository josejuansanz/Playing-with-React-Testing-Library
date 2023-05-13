import { TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function Input({
  name = '',
  label = '',
  type = 'text',
  disabled = false,
  required = false,
}: Props) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <TextField
        required={required}
        disabled={disabled}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        label={label}
        variant='outlined'
        { ...register(name) }
        fullWidth
      />
      {errors && errors[name] && <Typography color="red">{errors[name]?.message as string}</Typography>}
    </>
  );
}
