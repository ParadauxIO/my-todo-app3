import { supabase } from "../state/supabase";

let getTasks = async () => {
    let { data, error } = await supabase.from("tasks").select("*");

    if (error) {
        console.error(error);
    }

    return data;
};

// CRUD
// Creates Data -> Adding a task
// Reads data -> Rendering the task list
// Updates Data -> Complete
// Destroys Data -> Delete task

let addTask = async (text) => {
    let { data } = await supabase.auth.getUser();

    let { error } = await supabase.from("tasks").insert({
        text,
        owner: data.user.id,
    });
};

let removeTask = async (id) => {
    let { error } = await supabase.from("tasks").delete().eq("id", id);
};

let completeTask = async (id) => {
    let { error } = await supabase
        .from("tasks")
        .update({ isCompleted: true })
        .eq("id", id);
};

export { getTasks, addTask, removeTask, completeTask };
