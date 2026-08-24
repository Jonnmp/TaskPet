const fs = require("fs");
const path = require("path");

const taskPath = path.join(
    __dirname,
    "../../task.json"
);

function getTasks() {
    try {
        
        if (!fs.existsSync(taskPath)) {
            return [];
        }

        const data = fs.readFileSync(taskPath, "utf8");

        return JSON.parse(data);
    } catch (error) {

        console.error(
            "Error reading tasks:",
            error
        );

        return [];
    }
}

function saveTasks(tasks) {

    fs.writeFileSync(
        taskPath,
        JSON.stringify(tasks, null, 2)
    );
}

function addTask(title) {

    const tasks = getTasks();

    const newTask = {
        id: Date.now(),
        title, 
        completed: false,
        createdAt:
        new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    return newTask
}

function getPendingTasks() {
    const tasks = getTasks();
    
    return tasks.filter(
        task => !task.completed
    );
}

module.exports = {
    addTask,
    getTasks,
    getPendingTasks
};