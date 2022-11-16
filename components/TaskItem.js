import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { completeTask, removeTask } from "../partials/taskHandler";

// Object destructing
export default function TaskItem({ task, load }) {
    return (
        <View style={styles.taskItem}>
            <TouchableOpacity
                style={[
                    styles.taskItemComplete,
                    task.isCompleted
                        ? styles.taskItemCompleted
                        : styles.taskItemIncomplete,
                ]}
                onPress={async () => {
                    await completeTask(task.id);
                    await load();
                }}
            />
            <Text style={styles.taskItemText}>{task.text}</Text>
            <TouchableOpacity
                style={styles.taskItemDelete}
                onPress={async () => {
                    await removeTask(task.id);
                    await load();
                }}
            >
                <Text style={styles.taskItemDeleteText}>x</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "70%",
    },
    taskItemComplete: {
        borderColor: "gray",
        borderWidth: 3,
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
    },
    taskItemIncomplete: {
        borderColor: "gray",
    },
    taskItemCompleted: {
        borderColor: "green",
        backgroundColor: "lightgreen",
    },
    taskItemDelete: {
        borderColor: "red",
        borderWidth: 3,
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    taskItemDeleteText: {
        color: "red",
    },
});
