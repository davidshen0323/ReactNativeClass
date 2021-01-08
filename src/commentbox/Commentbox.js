import React, {useState, useEffect} from 'react';
import { FlatList, View, Text, TouchableOpacity, StatusBar, StyleSheet} from 'react-native';
import { Icon, Fab } from "native-base";
import axios from "axios";
import CommentboxAddEdit from "./CommentboxAddEdit";
// import styles from "../styles";
import { Avatar} from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Commentbox() {

   const[commentboxs, setCommentboxs] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [commentbox, setCommentbox] = useState({
    Title:"",
    Content: "",
  });
   

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
        "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Commentbox?maxRecords50&=view=Grid%20view";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setCommentboxs(result.data.records);
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
  }

  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity
      onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.fields.Title}</Text>
      <Text style={styles.itemtext}>{item.fields.Content}</Text>
      
    </TouchableOpacity>
    
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.id === selectedId ? "#f9c2ff" : styles.item.backgroundColor;

    return (
      <Item
        index={index}rn
        item={item}
        onPress={() => update(item.id, index)}
        style={{ backgroundColor }}
      />
    );
  };


  return (
    
    <View style={styles.container2}>

      <Text style={styles.textCommentbox}>討論區</Text>

      <FlatList
        data={commentboxs}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      ></FlatList>
  
      <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>

      <CommentboxAddEdit
        modalVisible={modalVisible}
        commentbox={commentbox}
        id={selectedId}
        hide={hide}
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
    flexDirection: 'row',
    backgroundColor: '#f8b62b',
    padding: 15,
    marginVertical: 8,
    // marginHorizontal: 16,
    alignContent: 'space-around',
    borderRadius: 20,
    flexWrap: 'wrap'
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
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


  
  

});