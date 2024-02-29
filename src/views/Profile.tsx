import {Button} from '@rneui/base';
import {Text, View} from 'react-native';
import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {handleLogout} = useUserContext();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
