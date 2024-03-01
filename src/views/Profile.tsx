import {Button, Card, ListItem} from '@rneui/base';
import {Text, View} from 'react-native';
import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  return (
    <View>
      <Card>
        <ListItem>
          <Text>Username: {user?.username}</Text>
        </ListItem>
        <Text>Profile</Text>
        <Button title="Logout" onPress={handleLogout} />
      </Card>
    </View>
  );
};

export default Profile;
