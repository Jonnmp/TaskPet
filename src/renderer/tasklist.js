const { getPendingTasks } = require("../services/TaskManager");

const container = document.getElementById("TaskList-container");
const task = getPendingTasks();


let html = "";
task.forEach(Element => {
    html += `<div>${Element.text}</div>`;
});

container.innerHTML = html;