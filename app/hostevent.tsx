import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Use axios to make HTTP requests

const HostEvent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [datetime, setDatesTime] = useState<String>('');
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [earlyPrice, setEarlyPrice] = useState<string>('');
  const [latePrice, setLatePrice] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image.');
      return;
    }
  
    const formData = new FormData();
  
    formData.append('name', name);
    formData.append('description', description);
    formData.append('datetime', datetime as unknown as string);
    formData.append('price', price);
    formData.append('earlyprice', earlyPrice);
    formData.append('lateprice', latePrice);
    formData.append('url', url);
  
    // 👇 Attach the image
    const fileName = image.split('/').pop();
    const fileType = fileName?.split('.').pop();
  
    formData.append('image', {
      uri: image,
      name: fileName,
      type: image/${fileType},
    } as any);
  
    try {
      const response = await axios.post('http://localhost:3000/uploadEvents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Upload failed:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Upload failed:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };
  
  

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload Image" onPress={handleImageUpload} />
      <TextInput placeholder="Name" onChangeText={setName} style={styles.name} />
      <TextInput placeholder="Description" onChangeText={setDescription} style={styles.description} />
      <TextInput placeholder="Write the Date and Time" onChangeText={setDatesTime} style={styles.datetime} />
      <TextInput placeholder="Price" onChangeText={setPrice} style={styles.price} keyboardType="numeric" />
      <TextInput placeholder="Early Price" onChangeText={setEarlyPrice} style={styles.earlyprice} keyboardType="numeric" />
      <TextInput placeholder="Late Price" onChangeText={setLatePrice} style={styles.lateprice} keyboardType="numeric" />
      <TextInput placeholder="Social Media Urls" onChangeText={setUrl} style={styles.url} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default HostEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  description: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  datetime: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  price: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  earlyprice: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  lateprice: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  url: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
  },
});
