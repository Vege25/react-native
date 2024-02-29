import {Button} from '@rneui/base';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => {
    setToggleRegister(!toggleRegister);
  };
  return (
    <>
      {!toggleRegister ? (
        <LoginForm />
      ) : (
        <RegisterForm handleToggle={handleToggle} />
      )}
      <Button
        title={
          !toggleRegister ? 'No account yet? Register here!' : 'Back to login.'
        }
        onPress={handleToggle}
      />
    </>
  );
};

export default Login;
