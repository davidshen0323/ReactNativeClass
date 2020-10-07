import React, {useState} from 'react';
import { Image, Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles'
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

export default function ImageUpload() {


    const [selectedImage, setSelectedImage] = useState({localUri:'https://i.imgur.com/TkIrScD.png'});

    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
      }

    let uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        // Create a reference to "my-image"
        const ref = firebase.storage().ref().child("my-image");
        // Upload file  
        const result = await ref.put(blob);
        return result;
      }

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;

    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (!pickerResult.cancelled) {
        //if not cancelled
        setSelectedImage({ localUri: pickerResult.uri });
        uploadImage(pickerResult.uri);
      }

  }

  

  return (

    <View style={styles.container}>

      <Image source={{  uri: selectedImage.localUri }} style={styles.logo} />
      <Button onPress={openImagePickerAsync} title='選擇檔案'/>

    </View>

  );

}