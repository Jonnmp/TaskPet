const { getTasks, completeTask } = require("../services/TaskManager.js");

const completedTasks = getTasks().filter(task => task.completed === true);
completedTasks.forEach(task => completeTask(task.id));

console.log(`Se revirtieron ${completedTasks.length} tareas.`);