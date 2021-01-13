import React, { useState, useEffect } from 'react';
import { Button, TextInput, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'native-base';

export default function WorkAdd(props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  
  function update(){
    async function sendData(){

        const newCommentbox={
            fields:{
                Title:title,
                //Content: content,
            }
        }
        console.log(newCommentbox)
        const axios_config = {
            headers: {
                'Authorization': 'Bearer keys9gKjERVN7YgGk',
                'Content-Type': 'application/json'}
            }
        ;
        try {

            const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/WorkList?maxRecords=30&view=Grid%20view";
            const result = await axios.post(url, newCommentbox, axios_config);
            console.log(result);
            setTitle("");
            //setContent("");
            // props.update();
            props.hide();
        }

           
            catch (e){
              console.log("error:"+e);
            }
        }
          sendData();
        
        }
        
  return (
    <Modal visible={props.modalVisible} transparent={true}>
    
    <View style={styles.centeredView2}>
     <View style={styles.modalView}>
     <TextInput
        style={styles.modalText}
        placeholder="標題" value={title} onChangeText={text => setTitle(text)}
        />
    {/* <TextInput
        multiline
        style={styles.modalText}
        placeholder="內容" value={content} onChangeText={text => setContent(text)} /> */}
   
    <View style={styles.fixToText}>
        <TouchableOpacity
            onPress={update} >
            <Text style={styles.text}>確認  </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={props.hide} >
            <Text style={styles.text}>取消 </Text>
        </TouchableOpacity>
    </View>
    </View>
    </View>

    </Modal>
  );

}

const styles = StyleSheet.create({


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"95%"
      },
      centeredView2: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
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
        elevation: 2,
        marginTop:10,
        width:160,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
        marginBottom: 20,
        textAlign: "center",
        color:"#000",
        
      },
      textAnnounce:{
          fontSize:30,
          fontWeight:'bold',
          marginBottom:20
      },

    text:{
        fontSize: 18,
        color: "grey",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop:8,
        textAlign: "center"
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

    textinput:{
        backgroundColor: "#ffffff",
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    }

    

  
  });