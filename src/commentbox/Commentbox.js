import React, {useState, useEffect} from 'react';
import { FlatList, View, Text, TouchableOpacity, StatusBar, StyleSheet, Image} from 'react-native';
import { Icon, Fab } from "native-base";
import axios from "axios";
import CommentboxAddEdit from "./CommentboxAddEdit";
import CommentboxList from "./CommentboxList";
import CommentboxDelete from "./CommentboxDelete";
// import styles from "../styles";
import { Avatar} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Commentbox({route}) {

   const[commentboxs, setCommentboxs] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [modalVisible2, setModalVisible2] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [commentbox, setCommentbox] = useState({
    Title:"",
    Content: "",
  });

   const [list, setList] = useState([]);
   const [Csid, setCsid] = useState(route.params.Csid);
   console.log("公告的id "+ Csid);
   

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE2MjgzIiwiZXhwIjoxNjQxOTc4MzU5LCJpc3MiOiJQcm9ncmFtbWluZyBDbGFzc3Jvb20ifQ.zY0_7FPY14jk8ZcOXJIBYAT7jmEN2hmeOv91l3j5yM8' },
      };
      const url =
        "https://140.136.156.12/teacher/solvedquestion/all/CSD129/get";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setCommentboxs(result.data.records);
      setList(result.data.records);
    }

    fetchData();
  }, [modalVisible]);

    
  function hide() {
    setCommentbox({
        Title:"",
        Content: "",
    });
    setSelectedId("");
    setModalVisible(false);
  }

  function hide2() {
    setCommentbox({
        Title:"",
        Content: "",
    });
    setSelectedId("");
    setModalVisible(false);
  }

  function close() {
    setCommentbox({
        Title:"",
        Content: "",
    });
  }

  function add() {
    setCommentbox({
        Title:"",
        Content: "",
    });

    setSelectedId("");
    setModalVisible(true);
  }

  function update(id, index) {
    setCommentbox({
      Title: commentboxs[index].fields.Title,
      City: commentboxs[index].fields.Content,
    });

    setSelectedId(id);
    setModalVisible(true);

    navigation.navigate("CommentboxList");
  }


  function Delete(id, index){
    setCommentbox({
      Title: commentboxs[index].fields.Title,
      City: commentboxs[index].fields.Content,
    });

    setSelectedId(id);
    setModalVisible2(true);
  }


  const navigation = useNavigation();
  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity
      onPress={onPress} style={[styles.item, style]}>
      {/* <Text>{index}</Text> */}
      <View style={styles.frame}>
        <Text style={styles.title}>
          {item.fields.Title}
        </Text>
      </View>
      
      <View style={styles.frame2}>
        <Text style={styles.itemtext}>
          {item.fields.Content}
        </Text>
      </View>

    </TouchableOpacity>
    
  );


  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.id === selectedId ? "#f9c2ff" : styles.item.backgroundColor;

    return (
      <Item
        index={index}
        item={item}
        // onPress={() => update(item.id, index)}
        onPress={() => {
          navigation.navigate("CommentboxList",
          {
            Title: list[index].fields.Title,
            Content: list[index].fields.Content,
          });
          console.log("\n\n\n\n");
          console.log(list[index].fields.Title);
          console.log(list[index].fields.Content);
          console.log("\n\n\n\n");
        }}
          //id:item.id
        onLongPress={() => Delete(item.id, index)}
        style={{ backgroundColor }}
      />
      
      
      
    );
  };

  


  return (
    
    <View style={styles.container2}>
      <Text style={styles.textCommentbox}>討論區</Text>
      {/* <ImagesExample /> */}
      
      <FlatList
        data={commentboxs}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      ></FlatList>


      <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>

      <CommentboxList
        commentbox={commentbox}
        id={selectedId}
      />

      <CommentboxAddEdit
        modalVisible={modalVisible}
        commentbox={commentbox}
        id={selectedId}
        hide={hide}
      />

      <CommentboxDelete
        modalVisible2 = {modalVisible2} 
        Delete = {Delete} 
        commentbox = {commentbox} 
        id={selectedId} 
        hide2={hide2}
      />
      
    </View>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#ffd1a4',
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",

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
    marginBottom:20
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


  
  

});