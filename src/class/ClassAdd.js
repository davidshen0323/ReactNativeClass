import React, {useState} from 'react';
import { Button , TextInput, Modal, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { View } from 'native-base';

export default function ClassAdd(props) {

  const [title, setTitle] = useState("");
  const [csid, setCsid] = useState("");
  
  
  function update(){
    async function sendData(){

        const newClass={
            fields:{
                Title:title,
                Csid:csid,
            }
        }
        console.log(newClass)
        const axios_config = {
            headers: {
                'Authorization': 'Bearer key4eVi7GTb0FVNWK',
                'Content-Type': 'application/json'}
            }
        ;
        try {

            const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/ClassList?maxRecords=20&view=Grid%20view";
            const result = await axios.post(url,newClass, axios_config);
            console.log(result);
            setTitle("");
            setCsid("");
            //setPersons(result.data.records);
            props.hide2();
          }

        catch (e){
              console.log("error:"+e);
            }
        }
          sendData();
          
        }
        
  return (
    <Modal animationType="slide"
    transparent={true}
    visible={props.modalVisible2}
    onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }} >
    <View style={styles.centeredView2}>
      <View style={styles.modalView}>
    <TextInput placeholder="課堂名稱" value={title} onChangeText={text=>setTitle(text)}/>
    <TextInput placeholder="課程代碼" value={csid} onChangeText={text=>setCsid(text)}/>
    <TouchableHighlight style={styles.openButton} onPress={update}>
      <Text style={styles.textStyle}>新增</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.openButton} onPress={props.hide2} >
      <Text style={styles.textStyle}>關閉</Text>
    </TouchableHighlight>
    </View>
    </View>
    </Modal>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#ffecd9',
    alignItems: "center",
  },
  centeredView2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  modalView: {
    margin: 20,
    width:"90%",
    
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
  openButton: {
    backgroundColor: "#f8b62b",
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    marginTop:20,
    width:220,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 1,
    textAlign: "center"
  },
  textAnnounce:{
      fontSize:30,
      fontWeight:'bold',
      marginBottom:20
  },
});