import {FlatList} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MediaListItem from '../components/MediaListItem';
import {useMedia} from '../hooks/apiHooks';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia();

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

export default Home;
