const fs = require("fs");
const path = require("path");

const taskPath = path.join(__dirname, "../../tasks-data.json");

function getTasks() {
    try {

        if (fs.existsSync(taskPath)) {
            const data = fs.readFileSync(taskPath, "utf-8");
            return JSON.parse(data);
        }

    } catch (error) {
        console.error("Error reading tasks data:", error);
    } return [];
}

function saveTasks(tasks) {
    fs.writeFileSync(
        taskPath,
        JSON.stringify(tasks, null, 2)
    );
}

function addTask(dataTasks) {
    const tasks = getTasks();
    const newTask = {
        id: Date.now().toString(),
        text: dataTasks.text,
        reminder: dataTasks.reminder,
        reminderMinutes: dataTasks.reminderMinutes,
        reminderInterval: dataTasks.reminderInterval,
        completed: false,
        reminderFinal: null
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

function completeTask(id) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return null;
    } 
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks(tasks);
    return tasks[taskIndex]; 
};

function deleteTask(id) {
    const tasks = getTasks();
    const deleteTasks = tasks.filter(task => task.id !== id);
    if (deleteTasks.length === tasks.length) {
        return null;
    }
    saveTasks(deleteTasks);
    return deleteTasks;
};

module.exports = {
    getTasks,
    addTask,
    saveTasks,
    completeTask,
    deleteTask
};