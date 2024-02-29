import {Controller, useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {Button, Card, Input} from '@rneui/base';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = ({handleToggle}: {handleToggle: () => void}) => {
  const {postUser, getEmailAvailable, getUsernameAvailable} = useUser();
  const initValues = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: initValues,
    mode: 'onBlur',
  });

  const doRegister = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      await postUser(inputs);
      Alert.alert('User created', 'You can now login.');
      handleToggle();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: async (value) => {
            try {
              const {available} = await getUsernameAvailable(value);
              return available ? available : 'Username taken';
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'is required'},
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
            message: 'Password must contain at least 5 characters and 1 number',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) =>
            value === getValues().password ? true : 'Passwords do not match',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="confirm password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'is required'},
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
          validate: async (value) => {
            try {
              const {available} = await getEmailAvailable(value);
              return available ? available : 'Email taken';
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      <Button title="Register" onPress={handleSubmit(doRegister)} />
    </Card>
  );
};
export default RegisterForm;
