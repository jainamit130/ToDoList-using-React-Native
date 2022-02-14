import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import { useBackHandler } from "@react-native-community/hooks";

const Task = (props) => {
  const colours = [
    "rgba(233, 30, 99,  0.7)",
    "rgba(194, 24, 88, 0.7)",
    "rgba(156, 39, 128, 0.7)",
    "rgba(87, 39, 128,  0.7)",
    "rgba(39, 42, 128,  0.7)",
    "rgba(39, 104, 128, 0.7)",
    "rgba(87, 172, 220, 0.7)",
    "rgba(87, 220, 190, 0.7)",
    "rgba(96, 198, 137, 0.7)",
  ];

  const completeTask = () => {
    let itemsCopy = [...props.taskItems];
    itemsCopy.splice(props.index, 1);
    props.setTaskItems(itemsCopy);

    let agreeCopy = [...props.agree];
    agreeCopy.splice(props.index, 1);
    props.setAgree(agreeCopy);
  };

  const taskCompleteToggle = () => {
    let agreeCopy = [...props.agree];
    agreeCopy[props.index] = !props.agree[props.index];
    props.setAgree(agreeCopy);
  };

  function backhandler() {
    {
      Alert.alert(
        " Exit From App ",
        " Do you want to exit From App ?",
        [
          { text: "Yes", onPress: () => BackHandler.exitApp() },
          { text: "No", onPress: () => console.log("NO Pressed") },
        ],
        { cancelable: false }
      );
    }
    return true;
  }

  useBackHandler(backhandler);

  return (
    <TouchableOpacity onPress={() => taskCompleteToggle()} activeOpacity={1}>
      <View
        style={{
          backgroundColor: colours[props.index % 9],
          padding: 15,
          paddingHorizontal: 20,
          opacity: 1,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          marginLeft: 17,
          height: 100,
          width: 360,
        }}
      >
        <View style={styles.itemLeft}>
          <View style={styles.square}>
            <TouchableOpacity>
              <CheckBox
                value={props.agree[props.index]}
                onValueChange={() => taskCompleteToggle()}
                color={props.agree[props.index] ? "black" : undefined}
                style={{ height: 28, width: 28, borderColor: "black" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemText}>
            <Text
              style={
                (styles.itemText,
                {
                  textDecorationLine: props.agree[props.index]
                    ? "line-through"
                    : "none",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: props.agree[props.index] ? "black" : "#FFF",
                })
              }
            >
              {props.text}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => completeTask()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemLeft: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  square: {
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  cross: {
    color: "#FFF",
    opacity: 0.3,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFF",
    padding: 20,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "black",
    opacity: 0.7,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
});

export default Task;
