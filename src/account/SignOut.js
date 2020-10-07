import React, {useState} from 'react';
import {Button, View, Text } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
import styles from '../styles';


export default function SignOut({navigation}) {

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [message, setMessage] = useState("");

  
  function signOut(){
    firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('User signed out successfully!');
      navigation.navigate('SignIn')
    })

    .catch(error => setMessage(error.message)); 

  };



  return(

    <View style={styles.container}>  
      <Text>{message}</Text>      
      <Button
        title="登出"
        onPress={signOut}
      />


      <Text onPress={()=>navigation.navigate('SignIn')}>
        我要登入
      </Text>                          

    </View>

  )

}