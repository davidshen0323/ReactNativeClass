import React, {useState} from 'react';
import {Button, View, Text, TextInput } from 'react-native';
import styles from '../styles';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';


export default function SignUp({navigation}) {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

    

  function signUp(){
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {

      res.user.updateProfile({
        displayName: displayName
      })

      console.log('User registered successfully!');
      setDisplayName('');
      setEmail('');
      setPassword('');
      navigation.navigate('SignIn')
    })
    .catch(error => setDisplayName(error.message)); 

  };


  return(

    <View style={styles.container}>  
      <TextInput
        style={styles.inputStyle}
        placeholder="姓名"
        value={displayName}
        onChangeText={text=>setDisplayName(text)}

      />      

      <TextInput

        style={styles.inputStyle}
        placeholder="電子信箱"
        value={email}
        onChangeText={text=>setEmail(text)}

      />

      <TextInput
        style={styles.inputStyle}
        placeholder="密碼"
        value={password}
        onChangeText={text=>setPassword(text)}
        maxLength={15}
        secureTextEntry={true}

      />   

      <Button
        onPress={signUp} title="註冊"
      />

      <Text onPress={()=>navigation.navigate('SignIn')}>
        已經註冊，我要登入
      </Text>                          

    </View>

  )

}