import {Card, Text, ListItem, Icon} from '@rneui/themed';
import {Video, ResizeMode} from 'expo-av';
import {MediaItemWithOwner} from '../types/DBTypes';

const Single = ({route}: {route: {params: MediaItemWithOwner}}) => {
  const item = route.params;
  const [fileType, fileFormant] = item.media_type.split('&#x2F;');
  return (
    <Card>
      <Card.Title>{item.title}</Card.Title>
      {fileType === 'image' ? (
        <Card.Image
          // style={{height: 500}}
          resizeMode="contain"
          source={{uri: 'http:' + item.filename}}
        />
      ) : (
        <Video
          style={{height: 500}}
          source={{uri: 'http:' + item.filename}}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
      <ListItem>
        <Text>{item.description}</Text>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>Owner: {item.username}</Text>
      </ListItem>
      <ListItem>
        <Icon name="image" />
        <Text>
          Media type: {fileType} / {fileFormant}, File size:{' '}
          {Math.round(item.filesize / 1024)} kB
        </Text>
      </ListItem>
    </Card>
  );
};

export default Single;
