import React, {useState, useEffect} from 'react';
import { FlatList, View, Text, TouchableOpacity, Button} from 'react-native';
import { Icon, Fab } from "native-base";
import axios from "axios";
import CommentboxAdd from "./CommentboxAdd";
import styles from "../styles";
import { Avatar} from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Commentbox() {

   const[Commentboxs, setCommentboxs] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [Commentbox, setCommentbox] = useState({
    Title:"",
    Content: "",
  });
   

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
        "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Commentbox?maxRecords=3&view=Grid%20view";
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
      Title: Commentboxs[index].fields.Title,
      City: Commentboxs[index].fields.Content,
    });

    setSelectedId(id);
    setModalVisible(true);
  }

  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.fields.Title}</Text>
      <Text>{item.fields.Content}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.id === selectedId ? "#f9c2ff" : styles.item.backgroundColor;

    return (
      <Item
        index={index}
        item={item}
        onPress={() => update(item.id, index)}
        style={{ backgroundColor }}
      />
    );
  };


  return (

    <View style={styles.container2}>
      <FlatList
        data={Commentboxs}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      ></FlatList>
  
      <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>

      {/* <CommentboxAdd
        modalVisible={modalVisible}
        commentbox={commentbox}
        id={selectedId}
        hide={hide}
      /> */}
      
    </View>

  );

}