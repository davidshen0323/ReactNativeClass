import React, {useState, useEffect} from 'react';
import {Button, View, Text, TextInput } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
import styles from '../styles';
import CheckBox from 'react-native-check-box'
import * as SecureStore from 'expo-secure-store';

export default function SignIn({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelect] = useState(false);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }


  function signIn(){
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      console.log('User login successfully!');
      if(isSelected === true){
        const loginString = JSON.stringify({email:email, password:password});
        SecureStore.setItemAsync("login", loginString).then(()=>{
          const login = JSON.parse(loginString);
          console.log(login);
          setEmail(login.email);
          setPassword(login.password);
        }
    
        ).catch((error)=>{
          setEmail(error.message)
        })
       
      }else{
        
        SecureStore.deleteItemAsync("login").then(()=>{
          setEmail("");
          setPassword("");
        }
    
        ).catch((error)=>{
          setEmail(error.message)
        })
      }

      navigation.navigate('Home');
    })
    .catch(error => setEmail(error.message)); 
  };

 
  function getAccount(){

    SecureStore.getItemAsync("login").then((loginString)=>{
      const login = JSON.parse(loginString);
      console.log(login);
      if (login) {
        setEmail(login.email);
        setPassword(login.password);
      }
    }

    ).catch((error)=>{
      setEmail(error.message)
    })
  }

   useEffect(getAccount,[]);




  return(

    <View style={styles.container}>  

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
        title="登入"
        onPress={signIn}
      />


      <View style={styles.checkboxContainer}>

        <CheckBox
          isChecked = {isSelected}
          onClick={()=>{
            setSelect(!isSelected)
          }}
          style={styles.checkbox}

        />
        <Text style={styles.label}>記住密碼</Text>
      </View>

      

      <Text onPress={()=>navigation.navigate('SignUp')}>
        尚未註冊，我要註冊
      </Text>

    </View>

  )

}

