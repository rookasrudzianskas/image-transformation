import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import Button from "~/components/button";
import {uploadImage} from "~/lib/cloudinary";
import {useAuth} from "~/providers/auth-provider";
import {supabase} from "~/lib/supabase";
import {router} from "expo-router";

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) {
      return;
    }
    const response = await uploadImage(image);
    // Save the post in database
    console.log('image id: ', response?.public_id);

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          caption,
          image: response?.public_id,
          user_id: session?.user.id,
        },
      ])
      .select();

    router.push('/(tabs)');
  };


  return (
    <View className="p-3 items-center flex-1">
      {/* Image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-[3/4] rounded-lg bg-slate-300" />
      )}


      <Text onPress={() => {}} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      {/* TextInput for caption */}
      <TextInput
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
        placeholder="What is on your mind"
        className="w-full p-3"
      />

      {/* Button */}
      <View className="mt-auto w-full">
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
