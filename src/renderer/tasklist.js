const { ipcRenderer } = require("electron");
const { getPendingTasks, completeTask, getCompletedTasks, deleteTask} = require("../services/TaskManager");

const container = document.getElementById("TaskList-container");

function renderTask () {
    const tasks = getPendingTasks();

    if (tasks.length === 0) {
        container.innerHTML = "No tienes tareas pendientes 🎉";
        return;
    }

    const urlPattern = /https?:\/\/[^\s]+/;
    let html = "";
    tasks.forEach(element => {
        const match = (element.description || "").match(urlPattern);
        const url = match ? match[0]:null;
        const cleanDescription = (element.description || "").replace(urlPattern, "");

        html += `<div class="task-card">
            <div class="task-main">
                <span class="task-text" data-id="${element.id}">${element.text}</span>
                <button class="complete-btn" data-id="${element.id}" data-url="${url || ''}">Completar</button>
            </div>
            <div class="task-details" style="display: none;">
                ${cleanDescription || "Sin descripcion disponible."}
                
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("complete-btn")) {
        const id = event.target.dataset.id;
        const url = event.target.dataset.url;

        completeTask(id);

        if (url && url !== "null") {
            ipcRenderer.send("open-external-link", url);
        }

        renderTask();
        renderCompleted();
    } else if (event.target.classList.contains("task-text")) {
        const card = event.target.closest(".task-card");
        const details = card.querySelector(".task-details");

        if (details.style.display === "none") {
            details.style.display = "block"
        } else {
            details.style.display = "none";
        } 
    }} 
);

renderTask();

const completedContainer = document.getElementById("CompletedList-container");

function renderCompleted () {
    const tasks = getCompletedTasks();

    if (tasks.length === 0) {
        completedContainer.innerHTML = "No tienes tareas completadas";
        return;
    }

    let html = "";
    tasks.forEach(element => {
        html += `<div class="task-card">
            <span>${element.text}</span>
            <button class="delete-btn" data-id="${element.id}">Eliminar</button>
        </div>`;
    });
    completedContainer.innerHTML = html;
}

completedContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const id = event.target.dataset.id;
        deleteTask(id);
    }
    renderCompleted();
});

renderCompleted();

