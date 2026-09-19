const { getPendingTasks, completeTask } = require("../services/TaskManager");

const container = document.getElementById("TaskList-container");

function renderTask () {
    const tasks = getPendingTasks();

    if (tasks.length === 0) {
        container.innerHTML = "No tienes tareas pendientes 🎉";
        return;
    }
    
    let html = "";
    tasks.forEach(element => {
        html += `<div class="task-card">
            <span>${element.text}</span>
            <button class="complete-btn" data-id="${element.id}">Completar</button>
        </div>`;
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
