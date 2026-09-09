const {addTask, getTasks, completeTask, deleteTask, isTaskDue, markReminded} = require("../services/TaskManager.js");

const nueva = addTask({text: "Probar TaskManager", reminderMinutes: 0});
console.log("Tarea creada: ", nueva);

console.log("Todas las tareas: ", getTasks());
console.log("Tareas Aviso: ", isTaskDue(nueva))

// const completada = completeTask();
// console.log("Tareas Completadas: ", completada);

// const borrar = deleteTask();
// console.log("Tareas Eliminadas: ", borrar);

const recordatorio = markReminded(nueva.id)
console.log("Recordatorios", recordatorio)

console.log("Tareas Aviso: ", isTaskDue(recordatorio))

