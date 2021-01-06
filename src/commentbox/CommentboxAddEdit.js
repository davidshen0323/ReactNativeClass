import React, { useState, useEffect } from 'react';
import { Button, TextInput, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'native-base';


export default function CommentboxAddEdit(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    

    useEffect(() => {
        setTitle(props.commentbox.Title);
        setContent(props.commentbox.Content);
    }, [props.id]);

    function update() {

        async function sendData() {

            const newCommentbox = props.id
                ? {
                    records: [{
                        id: props.id,
                        fields: {
                            Title: title,
                            Content: content,
                        }
                    }]
                }
                : {
                    fields: {
                        Title: title,
                        Content: content,
                    }
                }

                const axios_config = {
                    headers: {
                        'Authorization': 'Bearer keys9gKjERVN7YgGk',
                        'Content-Type': 'application/json'}
                    }
                ;
                try {
        
                    const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Commentbox?maxRecords=3&view=Grid%20view";

                // if id exists, call put
                // else call post
                
                const result = props.id
                    ? await axios.put(url, newCommentbox, axios_config)
                    : await axios.post(url, newCommentbox, axios_config);

                    setTitle("");
                    setContent("");
                

                props.hide();
            }

            catch (e) {
                console.log("error:" + e);
            }
        }
        sendData();

    }



    return (

        <Modal visible={props.modalVisible}
               transparent={true}>
            
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>

                <View style={styles.modalView}>
                    <TextInput placeholder="標題" value={title} onChangeText={text => setTitle(text)} />
                    <TextInput placeholder="內容" value={content} onChangeText={text => setContent(text)} />
                    <Button onPress={update} title="確定" />
                    <Button onPress={props.hide} title="取消" />
                </View>

            </View>
            
        </Modal>
    );

}


const styles = StyleSheet.create({


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
      elevation: 5,
      width: 250,
      height: 200

    },

    

  
  });