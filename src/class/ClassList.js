import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Icon, Fab } from "native-base";
import axios from "axios";
// import PersonAddEdit from "./PersonAddEdit";
import styles from "../styles";
import { set } from "react-native-reanimated";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import PersonAddEdit from "../person/PersonAddEdit";
import { useNavigation } from "@react-navigation/native";
import FunctionList from "../function/FunctionList";
import ClassAdd from "../class/ClassAdd";
import ClassView from "../class/ClassView";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function ClassList() {
  const [cs, setCs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [classes, setClasses] = useState({
    Title: "",
    Csid: "",
    Teacher: "",
  }); //temp variable for edit

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
      "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/ClassList?maxRecords=20&view=Grid%20view" ;
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setCs(result.data.records);
    }

    fetchData();
  }, [cs]);

  function hide() {
    setClasses({
      Title: "",
      Csid: "",
      Teacher: "",
    });
    setSelectedId("");
    setModalVisible(false);
  }

  function close() {
    setClasses({
      Title: "",
      Csid: "",
      Teacher: "",
    });

    // props.hide();
  }

  function add() {
    setClasses({
      Title: "",
      Csid: "",
      Teacher: "",
    });

    setSelectedId("");
    // setModalVisible(true);
    setModalVisible2(true);

  }

  function hide2() {
    setClasses({
      Title: "",
      Csid: "",
    });
    setSelectedId("");
    setModalVisible2(false);
    
  }

  function update(id, index) {
    setClasses({
      Title: cs[index].fields.Title,
      Csid: cs[index].fields.Csid,
      Teacher: cs[index].fields.Teacher,
    });

    setSelectedId(id);
    setModalVisible(true);

    // navigation.navigate("FunctionList");
  }

  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text>{index}</Text>
      <Text style={styles.title}>{item.fields.Title}</Text>
      <Text>{item.fields.Csid},</Text>
      <Text>{item.fields.Teacher}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.id === selectedId ? "#f9c2ff" : styles.item.backgroundColor;

    return (
      <Item
        // index={index}
        item={item}
        onPress={() => navigation.navigate("FunctionList",
        {
          Csid: cs[index].fields.Csid,
        }
        )}
        style={{ backgroundColor }}
      />
    );
  };

  const navigation = useNavigation();

  

  return (
    <View style={styles.container2}>
       <FlatList
        data={cs}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      >
      </FlatList>
  
      <ClassView modalVisible = {modalVisible} classes = {classes} id={selectedId} hide={hide}/> 

      <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>

      {/* <PersonAddEdit
        modalVisible={modalVisible}
        person={classes}
        id={selectedId}
        hide={hide}
      /> */}
      <ClassAdd modalVisible2 = {modalVisible2} update={update} hide2={hide2}/>
    
    </View>
  );
}
