import React, { useState, useEffect } from "react";
import { Button, View, Text, TextInput, Image } from "react-native";
import styles from "../styles";
import CheckBox from "react-native-check-box";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';
import { useLinkProps } from "@react-navigation/native";




  export default function SignIn({ navigation, route }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSelected, setSelect] = useState(false);
    const [jsonReturn, setJsonReturn] = useState({
      user_role:"",
      token:""}
    );

    // useEffect(() => {

    //   async function fetchData () {
    //     const axios_config = {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     };
  
    //     const url="http://140.136.156.12:8080/auth/";
    //     const result = await axios.post(url,axios_config);
    //     //console.log(result);
    //     setJsonReturn(result.data.records);
    //   }
    //   fetchData();

    // },[]);
    // console.log(jsonReturn);


    // async function signIn() {
    //   fetch('http://140.136.156.12:8080/auth/', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: email,
    //       password: password
    //     })
    //   }).then(res => {
    //     const result = await res.json();
    //   });
    // }

    // const navigation = useNavigation();

    const handleSubmitAsk = () => {
      console.log(email);
      console.log(password);
      fetch('http://140.136.156.12:8080/auth/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })
        .then(res => {
          async function fetchres() {
            const result = await res.json();
            // const test = await res.text();
            // console.log(result);
            console.log(result["token"]);
            console.log(result["user_role"]);
            
            navigation.navigate("ClassList",
            {
              Token: result["token"],
              Role: result["user_role"],
            }
            )
  
            setClicked(true);
  
          } fetchres()
        })
    }
  


  // function update(){
  //   signIn();
  // }

  // function getAccount() {
  //   SecureStore.getItemAsync("login")
  //     .then((loginString) => {
  //       const login = JSON.parse(loginString);
  //       // console.log(login);
  //       if (login) {
  //         setEmail(login.email);
  //         setPassword(login.password);
  //       }
  //     })
  //     .catch((error) => {
  //       setEmail(error.message);
  //     });
  // }
  // useEffect(getAccount, []);

  return (
    <View style={styles.container}>
      <Image
        // style={styles.stretch}
        source={require("../../assets/Rollsuplogo.jpeg")}
      />

      <TextInput
        style={styles.inputStyle}
        placeholder="帳號"
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

      <Button title="登入" onPress={handleSubmitAsk} />

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
