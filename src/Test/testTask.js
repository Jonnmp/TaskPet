const { getTasks, completeTask } = require("../services/TaskManager.js");

const tasks = getTasks();
console.log("Tareas actuales:", tasks);

if (tasks.length > 0) {
    const primeraTarea = tasks[0];
    const resultado = completeTask(primeraTarea.id);
    console.log("Tarea marcada como completada:", resultado);
}