import React, {useState} from 'react';
import { Button , TextInput, View, Modal, SafeAreaView, YellowBox} from 'react-native';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function ProductAdd(props) {
  YellowBox.ignoreWarnings(['Setting a timer']);

  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  } 
  const db = firebase.firestore();

  function update(){
    // props.update({desc,price});
    db.collection("product").add({
      desc: desc,
      price: parseInt(price)
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    props.hide();
  }

  function colse(){
    props.colse();
  }

  return (
    
    <Modal visible = {props.modalVisible}>
    <SafeAreaView>
    <TextInput placeholder="產品的說明" value={desc} onChangeText={text=>setDesc(text)}/>
    <TextInput placeholder="價格" value={price} onChangeText={text=>setPrice(text)}/>
    <Button onPress={update} title="裡面新增"/>
    <Button onPress={colse} title="關閉"/>
    </SafeAreaView>
    </Modal>
  );
}

