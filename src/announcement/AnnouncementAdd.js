import React, {useState} from 'react';
import { Button , TextInput, Modal, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { View } from 'native-base';
import { cos } from 'react-native-reanimated';

export default function AnnouncementAdd(props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Csid, setCsid] = useState(props.Csid);
  console.log("新增的ID "+props.Csid);
  function add(){
    async function sendData(){
        const newAnnouncement={
            cs_id: props.Csid,
            at_title: title,
            at_content: content
        }
        console.log(newAnnouncement)
        const axios_config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE2MjgzIiwiZXhwIjoxNjQxOTc4MzU5LCJpc3MiOiJQcm9ncmFtbWluZyBDbGFzc3Jvb20ifQ.zY0_7FPY14jk8ZcOXJIBYAT7jmEN2hmeOv91l3j5yM8',
                'Content-Type': 'application/json'}
            }
        ;
        try {

            const url="http://140.136.156.12:8080/teacher/announcement/post/";
            const result = await axios.post(url, newAnnouncement, axios_config);
            setTitle("");
            setContent("");
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
    <Modal animationType="slide" transparent={true} visible={props.modalVisible2} onRequestClose={() => { Alert.alert("Modal has been closed."); }} >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <TextInput placeholder="標題" value={title} onChangeText={text=>setTitle(text)}/>
          <TextInput placeholder="內容" value={content} onChangeText={text=>setContent(text)}/>
            <TouchableHighlight style={styles.openButton} onPress={add}>
              <Text style={styles.textStyle}>新增</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.openButton} onPress={props.hide2} >
              <Text style={styles.textStyle}>關閉公告</Text>
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