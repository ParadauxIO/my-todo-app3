import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import TaskItem from "../components/TaskItem";
import { addTask, getTasks } from "../partials/taskHandler";

export default function Home() {
    let [tasks, setTasks] = useState([]);

    async function load() {
        setTasks(await getTasks());
    }

    useEffect(() => {
        load();
    }, []);

    let [taskInput, setTaskInput] = useState("");

    function removeTask(taskToBeDeleted) {
        setTasks((tasks) => {
            return tasks.filter((task) => task.text !== taskToBeDeleted);
        });
    }

    function completeTask(taskToBeCompleted) {
        setTasks((tasks) => {
            let newTasks = [...tasks];

            for (let task of newTasks) {
                if (task.text === taskToBeCompleted) {
                    console.log(task);
                    task.isCompleted = true;
                    return newTasks;
                }
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Today</Text>
            <View style={styles.taskContainer}>
                <View style={styles.taskList}>
                    {tasks.map((task) => (
                        <TaskItem task={task} load={load} />
                    ))}
                </View>
                <TextInput
                    style={styles.newTaskInput}
                    defaultValue={taskInput}
                    onChangeText={setTaskInput}
                />
                <Button
                    title="Add Task"
                    onPress={async () => {
                        await addTask(taskInput);
                        await load();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 48,
        marginLeft: 50,
        marginTop: 30,
    },
    taskContainer: {
        alignItems: "center",
    },

    newTaskInput: {
        borderColor: "#CCC",
        backgroundColor: "#CCC",
        width: 190,
    },
});
