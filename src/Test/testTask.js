const {addTask, getTasks, completeTask, deleteTask} = require("../services/TaskManager.js");

const nueva = addTask({text: "Probar TaskManager"});
console.log("Tarea creada: ", nueva);

console.log("Todas las tareas: ", getTasks());

const completada = completeTask("1787784730804");
console.log("Tareas Completadas: ", completada);

const borrar = deleteTask("1787784737117");
console.log("Tareas Eliminadas: ", borrar);

