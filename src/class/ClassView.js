import React, { useState, useEffect } from 'react';
import { Button,Alert, TextInput, StyleSheet, Modal , View, Text, TouchableHighlight} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from 'native-base';


export default function ClassView(props) {

    const [title, setTitle] = useState("");
    const [csid, setCsid] = useState("");
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        setTitle(props.classes.Title);
        setCsid(props.classes.Csid);
    }, [props.id]);

    function update() {

        async function sendData() {
            // if id exists, assign a newAnnouncement with id
            // else assign a newAnnouncement without id
            const newClass = props.id
                ? {
                    records: [{
                        id: props.id,
                        fields: {
                            Title:title,
                            Csid: csid
                        }
                    }]
                }
                : {
                    fields: {
                        Title:title,
                        Csid: csid
                    }
                }

            const axios_config = {
                headers: {
                    'Authorization': 'Bearer key4eVi7GTb0FVNWK',
                    'Content-Type': 'application/json'
                }
            }
                ;
            try {
                const url = "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/ClassList?maxRecords=20&view=Grid%20view";

                // if id exists, call put
                // else call post
                
                const result = props.id ? await axios.put(url, newClass, axios_config) : await axios.post(url, newAnnouncement, axios_config); 
                   
                    setTitle("");
                    setCsid("");
                console.log(result.data.id);

                props.hide();
            }

            catch (e) {
                console.log("error:" + e);
            }
        }
        sendData();

    }

    return (

        <Modal 
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}>
            <View style={styles.centeredView2}>
                <View style={styles.modalView}>
                <TextInput placeholder="課堂名稱" style={styles.modalText} value={title} onChangeText={text => setTitle(text)} />
                <TextInput placeholder="課程代碼" style={styles.modalText} value={csid} onChangeText={text => setCsid(text)} />
                <TouchableHighlight style={styles.openButton} onPress={props.hide}>
                    <Text style={styles.textStyle}>關閉</Text>
                </TouchableHighlight>
                {/* <Button style={styles.openButton} onPress={update} title="確定" /> */}
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
