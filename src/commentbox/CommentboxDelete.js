import React, { useState, useEffect } from 'react';
import { Button, Alert, TextInput, StyleSheet, Modal , View, Text, TouchableHighlight} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from 'native-base';

export default function CommentboxDelete(props){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    useEffect(() => {
        setTitle(props.commentbox.Title);
        setContent(props.commentbox.Content);
    }, [props.id]);


    function Delete() {

        async function sendData() {
            // if id exists, assign a newAnnouncement with id
            // else assign a newAnnouncement without id
            const deldeteCommentbox = props.id
                ? {
                    records: [{
                        id: props.id,
                        fields: {
                            Title:title,
                            Content: content
                        },
                        
                    }]
                }
                : {
                    records: [{
                        id: props.id,
                        fields: {
                            Title:title,
                            Content: content
                        },
                    }]
                }

            const axios_config = {
                headers: {
                    'Authorization': 'Bearer key4eVi7GTb0FVNWK',
                    // 'Content-Type': 'application/json',
                    
                }
            }
                ;
            try {
                const url = "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Commentbox"+props.id;
                
                console.log("成功刪除"+props.id);
                // if id exists, call put
                // else call post
                
                await axios.delete(url, axios_config) ; 
                   
                    setTitle("");
                    setContent("");
                // console.log(result.data.id);
                props.hide2();
            }

            catch (e) {
                console.log("error:" + e);
            }
        }
        sendData();

    }

    return(

        <Modal animationType="slide" transparent={true} visible={props.modalVisible2} onRequestClose={() => {Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView2}>
                <View style={styles.modalView}>
                <Text style={styles.textCommentbox}>是否確認刪除該公告？</Text>
                    <TextInput editable={false} placeholder="標題" style={styles.modalText} value={title} onChangeText={text => setTitle(text)} />
                    <TextInput editable={false} placeholder="內容" style={styles.modalText} value={content} onChangeText={text => setContent(text)} />
                    {/* <Text style={styles.modalText}>*點擊即可修改公告</Text> */}
                        <TouchableHighlight style={styles.openButton} onPress={Delete}>
                            <Text style={styles.textStyle}>確認刪除</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.openButton} onPress={props.hide2}>
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
        textCommentbox:{
            fontSize:20,
            marginBottom:20,
            color:"red"
        },
      });


