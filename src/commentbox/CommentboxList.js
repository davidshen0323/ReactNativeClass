import React, {useState, useEffect} from 'react';
import {FlatList,
        View, 
        Text, 
        TouchableOpacity, 
        StatusBar, 
        StyleSheet, 
        Image,
        TextInput, 
        Button,
        KeyboardAvoidingView,
        Platform,
        TouchableWithoutFeedback,
        Keyboard
      } from 'react-native';
import { Icon, Fab, Content, Title } from "native-base";  
import axios from "axios";
import Commentbox from "./Commentbox"
// import styles from "../styles";
import Moment from 'moment';

function CommentboxList({route}){
  
   const [modalVisible, setModalVisible] = useState(false);
   const[commentboxs, setCommentboxs] = useState([]);
   const [selectedId, setSelectedId] = useState(null);
   const [message, setMessage] = useState();
   const [time, setTime] = useState();
  //  const [title, setTitle] = useState();
  //  const [content, setContent] = useState();
  //  const {Title} = route.params.Title;
  //  const {Content} = route.params.Content;
  //  console.log(Title);
  //  console.log(Content);



  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
        "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/CommentboxList?maxRecords=50&view=Grid%20view";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setCommentboxs(result.data.records);
    }

    fetchData();
  }, [commentboxs]);
   

  //  useEffect(() => {
  //   setTitle(route.params.Title); 
  //   setContent(route.params.Content);
  // }, [route.params.id]);
  

  function update() {

    async function sendData() {

        const newCommentbox = route.params.id
            ? {
                records: [{
                    //id: route.params.id,
                    fields: {
                        Message: message,
                        Time: time,
                    }
                }]
            }
            : {
                fields: {
                      Message: message,
                      Time: time,
                  }
            }

            const axios_config = {
                headers: {
                    'Authorization': 'Bearer keys9gKjERVN7YgGk',
                    'Content-Type': 'application/json'}
                }
            ;
            try {
    
                const url="https://api.airtable.com/v0/appCvAxAr9rxmTWh4/CommentboxList?maxRecords=50&view=Grid%20view";

            // if id exists, call put
            // else call post
            
            const result = route.params.id
                ? await axios.put(url, newCommentbox, axios_config)
                : await axios.post(url, newCommentbox, axios_config);

                setMessage("");
                setTime("");
                console.log(result.data);
            

            // props.hide();
        }

        catch (e) {
            console.log("error:" + e);
        }
    }
    sendData();

}




const Item = ({ index, item, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress} style={[styles.item, style]}>
    {/* <Text>{index}</Text> */}
    <View style={styles.frame}>
      <Text style={styles.title}>
        {item.fields.Message}
      </Text>
    </View>
    
    <View style={styles.frame2}>
      <Text style={styles.itemtext}>
        {item.fields.Time}
      </Text>
    </View>

  </TouchableOpacity>
  
);
    
const renderItem = ({ item, index }) => {

  const backgroundColor = item.id === selectedId ? "#f9c2ff" : "#afdee3";


  return (
    <Item
      index={index}
      item={item}
      // onPress={() => update(item.id, index)}
      style={{backgroundColor}}
    />
  );
};
  


  const ImagesExample = () => (
    <Image source = {{uri:'https://image.flaticon.com/icons/svg/1915/1915932.svg'}}
    style = {{ width: 400, height: 400 }}
    />
 )


  return (
   
  <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardcontainer}
  >

  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.inner}>
  <View style={styles.container2}>

    <Text style={styles.textCommentbox}>留言板</Text>
      {/* <View style={styles.viewbox}> */}

      {/* <ImagesExample /> */}
      
      {/* <View>
          <Text> {JSON.stringfy(Title)} </Text>
          <Text> {JSON.stringfy(Content)} </Text>
      </View> */}

      <FlatList
        data={commentboxs}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      ></FlatList>       

      <TextInput
        multiline
        style={styles.input}
        placeholder='請輸入內文'
        onChangeText={(newmessage) => setMessage(newmessage)}/>
      
      <Button onPress={update} title="留言"/>

      {/* </View> */}
  </View>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>

  );

}

const styles = StyleSheet.create({

  keyboardcontainer: {
    flex: 1,
  },

  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#ffecd9',
    marginTop: StatusBar.currentHeight || 0,
    // marginLeft: 5,
    // marginRight:5,
    // marginTop: 10,
    alignItems: "center",
    borderRadius: 20,
    marginBottom:35


  },


  item: {
    flex: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: '#f8b62b',
    padding: 15,
    marginVertical: 8,
    // marginHorizontal: 16,
    alignContent: 'space-around',
    borderRadius: 20,

    height:100,
    width:300
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemtext:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },


  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },

  logo: {

    width: 305,
    height: 159,
    marginBottom: 20,

  },

  textCommentbox:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom:20,
    marginTop:10
},

frame:{
  justifyContent: 'center',
  alignItems: 'center',
  flex:5,
  alignContent: 'space-around',
},

frame2:{
  justifyContent: 'center',
  alignItems: 'center',
  flex:5,
  alignContent: 'space-around',
},

viewbox:{
  backgroundColor:'#ffffff'
},

input: {
  borderWidth: 1,
  borderColor: '#777',
  padding: 8,
  margin: 10,
  width: 200,
},

inner: {
  padding: 24,
  flex: 1,
  justifyContent: "space-around"
},


  
  

});

export default CommentboxList;