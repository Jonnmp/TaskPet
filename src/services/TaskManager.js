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
        id: dataTasks.id || Date.now().toString(),
        text: dataTasks.text,
        createdAt: new Date().toISOString(),
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

function getNextReminderTime(task) {
    if (task.reminder) {
        return new Date(task.reminder)
    }

    if (task.reminderMinutes !== undefined && task.reminderMinutes !== null) {
    const createdMs = new Date(task.createdAt).getTime();
    const minutes = createdMs + (task.reminderMinutes * 60 * 1000)
    return new Date(minutes)
    } 
    return null;
};

function isTaskDue(task) {
    if (task.completed) {
        return false
    }
    const nextTime = getNextReminderTime(task)

    if (nextTime === null) {
        return false
    }

    if (task.reminderFinal === null) {
        return new Date() >= nextTime
        }

    if (task.reminderInterval === undefined || task.reminderInterval === null) {
        return false
    }
    const createdMsg = new Date(task.reminderFinal).getTime();
    const minutes = createdMsg + (task.reminderInterval * 60 * 1000)
    return new Date() >= new Date(minutes)  
};

function markReminded(id) {
    const tasks = getTasks();
    const mark = tasks.findIndex(task => task.id === id);
    if (mark === -1) {
        return null;
    }
    tasks[mark].reminderFinal = new Date().toISOString();
    saveTasks(tasks);
    return tasks[mark];
}

function getPendingTasks() {
    const tasks = getTasks();
    const pending = tasks.filter(task => task.completed === false);
    return pending;
}

function getCompletedTasks() {
    const tasks = getTasks();
    const completed = tasks.filter(task => task.completed === true);
    return completed;
}

module.exports = {
    getTasks,
    addTask,
    saveTasks,
    completeTask,
    deleteTask,
    getNextReminderTime,
    isTaskDue,
    markReminded,
    getPendingTasks,
    getCompletedTasks
};