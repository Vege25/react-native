import {Button} from '@rneui/base';
import {useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUserContext} from '../hooks/contextHooks';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => {
    setToggleRegister(!toggleRegister);
  };
  const {handleAutoLogin} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
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
    </TouchableOpacity>
  );
};

export default Login;
