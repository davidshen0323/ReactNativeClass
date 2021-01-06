import React, {useState} from 'react';
import { Button , TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function CommentboxAdd(props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  
  function update(){
    async function sendData(){

        const newCommentbox={
            fields:{
                Title:title,
                Content:content,
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

            const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Commentbox?maxRecords=3&view=Grid%20view";
            const result = await axios.post(url,newCommentbox, axios_config);
            console.log(result);
            props.update();}
            catch (e){
              console.log("error:"+e);
            }
        }
          sendData();
        
        }
        
  return (
    <Modal visible={props.modalVisible}>
    
    <SafeAreaView>
    <TextInput placeholder="標題" value={title} onChangeText={text=>setTitle(text)}/>
    <TextInput placeholder="內容" value={content} onChangeText={text=>setContent(text)}/>
    <Button onPress={update} title="新增"/>
    </SafeAreaView>

    </Modal>
  );

}