import {FlatList, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Text} from '@rneui/base';
import MediaListItem from '../components/MediaListItem';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia();
  const {user} = useUserContext();
  if (!user) {
    return (
      <View>
        <Text>Not logged in</Text>
      </View>
    );
  }

  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);
  return (
    <>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => (
          <MediaListItem navigation={navigation} item={item} />
        )}
      />
    </>
  );
};

export default MyFiles;
