import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StatusBar,StyleSheet, Button, YellowBox,ImageBackground} from 'react-native';
import {Icon, Fab} from 'native-base';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
//import ProductAdd from './ProductAdd';
import { concat } from 'react-native-reanimated';
import * as FirebaseCore from 'expo-firebase-core';

const bgimage = {}

// const config = {

//   apiKey: "AIzaSyDgwhPwhLT6NLFbFjLUirjGocTGxazIBCU",
//   authDomain: "product-3c000.firebaseapp.com",
//   databaseURL: "https://product-3c000.firebaseio.com",
//   projectId: "product-3c000",
//   storageBucket: "product-3c000.appspot.com",
//   messagingSenderId: "208041875505",
//   appId: "1:208041875505:web:4d466843a9c0d1dd1add10",
//   measurementId: "G-JRY61NGHWR"

// };

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
}

const db = firebase.firestore();

const renderItem = ({ item, index }) => (
  <View style={styles.item}>
  <Text> {index} </Text>
  <Text style={styles.title}>{item.desc}</Text>
  <Text>{item.price}</Text>
  </View>
);

export default function HandsUpWork() {
 

  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function readDate(){
    const newProducts=[]; 
    db.collection("product").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const newProduct = {
          desc:doc.data().desc,
          price:doc.data().price
        }
        newProducts.push(newProduct);
      });
      setProducts(newProducts);
    })
  }

  useEffect(readDate,[modalVisible])

  function hide(){
    setModalVisible(false);
  }

  function update(newProduct){
    setProducts(oldProducts=>[...oldProducts, newProduct]);
    setModalVisible(false);
  }

  function colse(){
    setModalVisible(false);
  }

  const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
     },})

 return (
  <ImageBackground source={require('../img/bg.jpg')} style={styles.backgroundImage} >
   <View style={styles.container}>
   <FlatList 
    data={products} 
    renderItem = {renderItem}
    keyExtractor={(item, index) => ""+index}
    >
   </FlatList>
   <Fab onPress={()=>setModalVisible(true)}>
     <Icon ios='ios-add' android="md-add"/>
   </Fab>
   {/* <Button title="新增" onPress={()=>setModalVisible(true)}/> */}
   {/* <ProductAdd modalVisible = {modalVisible} colse={colse} update={update} hide={hide}/> */}
   </View>
   </ImageBackground>
 );

}

const styles = StyleSheet.create({
     modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
  container: {
    backgroundColor: '#ffd1a4',
    flex: 1,
    //margin: 'auto',
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight || 0,

  },

  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,

  },

  title: {
    fontSize: 24,
  },

});

