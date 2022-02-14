import React, { useState, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
// import Swipeout from "react-native-swipeout";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [agree, setAgree] = useState([false]);

  const scrollRef = useRef();

  const handleAddTask = (scrollView) => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setAgree([...agree, false]);
    setTask(null);
    scrollRef.current.scrollToEnd();
  };

  const deleteAllTasks = () => {
    setTaskItems([]);
    setAgree([false]);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textWrapper}>
          <Text style={styles.sectionTitle}>Today's Task</Text>
          <TouchableOpacity
            onPress={() => deleteAllTasks()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.items}>
          <ScrollView ref={scrollRef} style={{ flexGrow: 0, maxHeight: 600 }}>
            {taskItems.map((item, index) => {
              return (
                <View key={index}>
                  <Task
                    text={item}
                    taskItems={taskItems}
                    setTaskItems={setTaskItems}
                    index={index}
                    agree={agree}
                    setAgree={setAgree}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Write a task Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.9,
  },
  textWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  items: { marginTop: 30 },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 22,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: { fontSize: 30 },
  button: {
    backgroundColor: "#C21858",
    padding: 10,
    borderRadius: 10,
    marginLeft: 120,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
