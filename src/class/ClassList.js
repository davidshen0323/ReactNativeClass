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

export default function ClassList({ route }) {
  const [cs, setCs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [classes, setClasses] = useState({
    Title: "",
    Csid: "",
    Teacher: "",
  }); //temp variable for edit

  const { Token } = route.params;
  const { Role } = route.params;
  // console.log("接到token:" + Token);
  // console.log("接到role:" + Role);

  useEffect(() => {
    async function fetchData() {
      const axios_config = {
        headers: {
          "Authorization":
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE2MjgzIiwiZXhwIjoxNjQxOTc4MzU5LCJpc3MiOiJQcm9ncmFtbWluZyBDbGFzc3Jvb20ifQ.zY0_7FPY14jk8ZcOXJIBYAT7jmEN2hmeOv91l3j5yM8",
          },
      };
      const url = "http://140.136.156.12:8080/teacher/HomePage1_s/one/";
      const result = await axios.get(url, axios_config);
      //console.log(result);
      // console.log("接到的值:"+result.data[0].cs_id);
      setCs(result.data);
    }
    fetchData();
  }, [modalVisible2]);
  
  // console.log(cs);

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
      Title: cs[index].cs_name,
      Csid: cs[index].cs_id,
      Teacher: cs[index].teacher_name,
    });

    setSelectedId(id);
    setModalVisible(true);

    // navigation.navigate("FunctionList");
  }

  const Item = ({ index, item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      {/* <Text>{index}</Text> */}
      <Text style={styles.title}>{cs[index].cs_id}</Text>
      <Text>{cs[index].cs_name},</Text>
      <Text>{cs[index].teacher_name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.id === selectedId ? "#f9c2ff" : styles.item.backgroundColor;

    return (
      <Item
        index={index}
        item={item}
        onPress={() =>
          navigation.navigate("FunctionList", {
            Csid: cs[index].cs_id,
          })
        }
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
      ></FlatList>

      <ClassView
        modalVisible={modalVisible}
        classes={classes}
        id={selectedId}
        hide={hide}
      />

      <Fab onPress={() => add()}>
        <Icon ios="ios-add" android="md-add" />
      </Fab>

      {/* <PersonAddEdit
        modalVisible={modalVisible}
        person={classes}
        id={selectedId}
        hide={hide}
      /> */}
      <ClassAdd modalVisible2={modalVisible2} update={update} hide2={hide2} />
    </View>
  );
}