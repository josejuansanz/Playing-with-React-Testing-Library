import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormSchema } from './schemas/login-form-schema';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DisplayFormValues from './components/DisplayFormValues';
import { callEndpoint } from './services/callEndpoint';
import { LoginUser } from './models/login-form.models';

export default function LoginForm() {
  const methods = useForm({
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });
  const {
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
    reset,
  } = methods;

  const usernameWatch = watch('username');
  const passwordWatch = watch('password');

  const onSubmit = async (data: LoginUser) => {
    const result = await callEndpoint(data);
    console.log(result);
    reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="username" label="User Name" required />
          <Input name="password" label="Password" required />
          <Button type="submit" isDirty={isDirty} isValid={isValid}>
            Log In
          </Button>
        </form>
      </FormProvider>
      <DisplayFormValues
        isDirty={isDirty}
        isValid={isValid}
        values={{
          username: usernameWatch,
          password: passwordWatch,
        }}
      />
    </>
  );
}
