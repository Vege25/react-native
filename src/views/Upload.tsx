import {Controller, set, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {Video} from 'expo-av';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Keyboard, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const initValues = {title: '', description: ''};
  const {postExpoFile} = useFile();
  const {postMedia} = useMedia();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doUpload = async (inputs: {title: string; description: string}) => {
    if (!image) {
      Alert.alert('Please select an image or video');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const fileResponse = await postExpoFile(image.assets![0].uri, token);
        const mediaResponse = await postMedia(fileResponse, inputs, token);
        Alert.alert(mediaResponse.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      // TODO: Display the image in the <Image> component
      setImage(result);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <Card>
          {image?.assets![0].mimeType?.includes('video') ? (
            <Video
              source={{uri: image.assets![0].uri}}
              style={{height: 300}}
              useNativeControls
            />
          ) : (
            <Card.Image
              onPress={pickImage}
              style={{aspectRatio: 1, height: 300}}
              source={{
                uri: image
                  ? image.assets![0]?.uri
                  : 'https://via.placeholder.com/150?text=Choose+Image',
              }}
            />
          )}
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 1000,
              required: {value: true, message: 'is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description?.message}
                multiline={true}
                numberOfLines={5}
                style={{height: 120, textAlignVertical: 'top'}}
              />
            )}
            name="description"
          />
          <Button title="Upload" onPress={handleSubmit(doUpload)} />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Upload;
