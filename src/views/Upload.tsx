import {Controller, set, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const initValues = {title: '', description: ''};

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doUpload = async (inputs) => {
    console.log(inputs);
    // await postFile();
    // await postMedia();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      // TODO: Display the image in the <Image> component
      setImage(result);
    }
  };

  return (
    <Card>
      <Card.Image
        onPress={pickImage}
        source={{
          uri: image
            ? image.assets![0]?.uri
            : 'https://via.placeholder.com/150?text=Choose+Image',
        }}
      />
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
  );
};
export default Upload;
