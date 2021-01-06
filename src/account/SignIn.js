import React, { useState, useEffect } from "react";
import { Button, View, Text, TextInput, Image } from "react-native";
import styles from "../styles";
import CheckBox from "react-native-check-box";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';
import { useLinkProps } from "@react-navigation/native";



  export default function SignIn({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSelected, setSelect] = useState(false);
    const axios_config = {
      headers: {'Content-Type': 'application/json'}
    };
    const url = "http://140.136.156.12:8080/login";

    async function signIn() {
      const form = {
        fields:{
          Userid:email,
          Userpassword:password
        }
      }
      
    try {
      const result = await axios.post(url, form, axios_config);
      console.log(result);
      props.update();
    }catch(e) {
      console.log("error: "+e);
    }

  }
  
  function update(){
    signIn();
  }

  function getAccount() {
    SecureStore.getItemAsync("login")
      .then((loginString) => {
        const login = JSON.parse(loginString);
        console.log(login);
        if (login) {
          setEmail(login.email);
          setPassword(login.password);
        }
      })
      .catch((error) => {
        setEmail(error.message);
      });
  }

  useEffect(getAccount, []);

  return (
    <View style={styles.container}>
      <Image
        // style={styles.stretch}
        source={require("../../assets/Rollsuplogo.jpeg")}
      />

      <TextInput
        style={styles.inputStyle}
        placeholder="電子信箱"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.inputStyle}
        placeholder="密碼"
        value={password}
        onChangeText={(text) => setPassword(text)}
        maxLength={15}
        secureTextEntry={true}
      />

      <Button title="登入" onPress={update} />

      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isSelected}
          onClick={() => {
            setSelect(!isSelected);
          }}
          style={styles.checkbox}
        />
        <Text style={styles.label}>記住密碼</Text>
      </View>

      <Text onPress={() => navigation.navigate("SignUp")}>
        尚未註冊，我要註冊
      </Text>
    </View>
  );
}
