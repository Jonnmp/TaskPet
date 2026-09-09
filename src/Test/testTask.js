const { addTask } = require("../services/TaskManager.js");

const nueva = addTask({ text: "Probar notificación real", reminderMinutes: 0 });
console.log("Tarea creada:", nueva);
