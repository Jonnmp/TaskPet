class TaskPanel {
    constructor(){
        this.panel = 
            document.getElementById("task-panel");

        this.input = 
            document.getElementById("task-input");
    }

    show(){

        this.panel.classList.remove("hidden");
        this.input.focus();
    }

    hide(){
        this.panel.classList.add("hidden");
    }

    clear(){
        this.input.value = "";
    }

    getValue(){
        return this.input.value.trim();
    }
}

const addTaskButton = 
  document.getElementById("add-task-btn");
const taskPanel = 
  document.getElementById("task-panel");
const cancelTask = 
  document.getElementById("cancel-task");

addTaskButton.addEventListener("click", () => {
  taskPanel.classList.remove("hidden");
});

cancelTask.addEventListener("click", () => {
  taskPanel.classList.add("hidden");
});

module.exports = TaskPanel;

