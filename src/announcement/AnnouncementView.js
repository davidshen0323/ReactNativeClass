import React, { useState, useEffect } from 'react';
import { Button, Alert, TextInput, StyleSheet, Modal , View, Text, TouchableHighlight} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from 'native-base';


export default function AnnouncementView(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalVisible, setModalVisible] = useState(true);
    const [Csid,setCsid] = useState(props.Csid);

    useEffect(() => {
        setTitle(props.announcement.Title);
        setContent(props.announcement.Content);
    }, [props.id]);

    function update() {
        async function sendData() {
            // if id exists, assign a newAnnouncement with id
            // else assign a newAnnouncement without id
            // const updateAnnouncement = props.id
            const updateAnnouncement={
                at_id: props.id,
                cs_id: Csid,
                at_title: title,
                at_content: content
            }
                console.log(updateAnnouncement);

            const axios_config = {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE2MjgzIiwiZXhwIjoxNjQyMDA3MDI0LCJpc3MiOiJQcm9ncmFtbWluZyBDbGFzc3Jvb20ifQ.0GFboAK1xIDIZGYLaWPMOP6Boq8gp2gI_LggOwpQLZI',
                    'Content-Type': 'application/json'
                }
            }
                ;
            try {
                const url = "http://140.136.156.12:8080/teacher/announcement/update/";
                
                const result = await axios.put(url, updateAnnouncement, axios_config); 
                   
                    setTitle("");
                    setContent("");
                // console.log(result.data.id);

                props.hide();
            }

            catch (e) {
                console.log("error:" + e);
            }
        }
        sendData();

    }

    return (

        <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView2}>
                <View style={styles.modalView}>
                    <TextInput placeholder="標題" style={styles.modalText} value={title} onChangeText={text => setTitle(text)} />
                    <TextInput placeholder="內容" style={styles.modalText} value={content} onChangeText={text => setContent(text)} />
                    {/* <Text style={styles.modalText}>*點擊即可修改公告</Text> */}
                        <TouchableHighlight style={styles.openButton} onPress={update}>
                            <Text style={styles.textStyle}>確認修改</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.openButton} onPress={props.hide}>
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
      marginBottom: 20,
      textAlign: "center",
      color:"#000"
    },
    textAnnounce:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:20
    },
  });
