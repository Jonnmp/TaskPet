const { getPendingTasks, completeTask } = require("../services/TaskManager");

const container = document.getElementById("TaskList-container");

function renderTask () {
    const tasks = getPendingTasks();
    let html = "";
    tasks.forEach(element => {
        html += `<div>${element.text} <button data-id="${element.id}">Completar</button></div>`;
    });
    container.innerHTML = html;
}

container.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const id = event.target.dataset.id;
        completeTask(id);
    }
    renderTask();
});

renderTask();
