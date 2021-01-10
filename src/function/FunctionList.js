import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Icon, Fab } from "native-base";
import axios from "axios";
import PersonAddEdit from "../person/PersonAddEdit";
import styles from "../styles";
import { set } from "react-native-reanimated";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductList from "../product/ProductList";
import PersonList from "../person/PersonList";
import ImageUpload from "../storage/ImageUpload";
import SignOut from "../account/SignOut";
import HandsUp from "../HandsUp/HandsUpChoose";
import Announcement from '../announcement/Announcement';
import Comment from '../commentbox/Commentbox';
import csid from "../classcontext/ClassContext";


const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function FunctionList() {
  const [persons, setPersons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [person, setPerson] = useState({
    Name: "",
    City: "",
    Age: 0,
  }); //temp variable for edit




  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: { Authorization: "Bearer keys9gKjERVN7YgGk" },
      };
      const url =
        "https://api.airtable.com/v0/appCvAxAr9rxmTWh4/Student?maxRecords=30&view=Grid%20view";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      setPersons(result.data.records);
    }



    fetchData();
  }, [modalVisible]);

  function hide() {
    setPerson({
      Name: "",
      City: "",
      Age: 0,
    });
    setSelectedId("");
    setModalVisible(false);
  }

  function close() {
    setPerson({
      Name: "",
      City: "",
      Age: 0,
    });

    // props.hide();
  }

  function add() {
    setPerson({
      Name: "",
      City: "",
      Age: 0,
    });

    setSelectedId("");
    setModalVisible(true);
  }

  function update(id, index) {
    setPerson({
      Name: persons[index].fields.Name,
      City: persons[index].fields.City,
      Age: persons[index].fields.Ag,
    });

    setSelectedId(id);
    setModalVisible(true);
  }

  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text>{index}</Text>
      <Text style={styles.title}>{item.fields.Name}</Text>
      <Text>{item.fields.City},</Text>
      <Text>{item.fields.Age}</Text>
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

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
    <Tab.Screen name="HandsUp" component={HandsUp}/>
    {/* <Tab.Screen name="Person" component={PersonList} /> */}
    {/* <Tab.Screen name="Product" component={ProductList} /> */}
    <Tab.Screen name="Announcement" component={Announcement} />
    {/* <Tab.Screen name="Click" component={Click} initialParams={{ count: 10 }}/> */}
    {/* <Tab.Screen name="Image" component={ImageUpload} /> */}
    <Tab.Screen name="Comment" component={Comment} />
    <Tab.Screen name="SignOut" component={SignOut} />
    
  </Tab.Navigator>
    // <View style={styles.container2}>
    //   {/* <FlatList
    //     data={persons}
    //     renderItem={renderItem}
    //     keyExtractor={(item, index) => "" + index}
    //   ></FlatList> */}

    

    //   <Fab onPress={() => add()}>
    //     <Icon ios="ios-add" android="md-add" />
    //   </Fab>
    //   {/* 
    //   <PersonAddEdit
    //     modalVisible={modalVisible}
    //     person={person}
    //     id={selectedId}
    //     hide={hide}
    //   /> */}
    // </View>
  );
}
