import * as ImagePicker from "expo-image-picker";
export const imagePicker = async (func, value) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1,
  });
  if (!result.cancelled) {
    if (value !== "") func(value, result.uri);
    else func(result.uri);
  }
};

export const imagePickerArray = async (setImageArr, imageArr) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1,
  });
  console.log(result);

  if (!result.cancelled) {
    setImageArr([...imageArr, result.uri]);
  }
};
