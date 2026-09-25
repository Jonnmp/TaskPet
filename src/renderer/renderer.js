const { ipcRenderer } = require("electron");
const { getPendingTasks } = require("../services/TaskManager"); 

const mascot = document.getElementById("mascot");
const speechBubble = document.getElementById("speechBubble");

document.getElementById("AddTask_btn").addEventListener("click", () => {
  ipcRenderer.send("open-form");
});

document.getElementById("ViewTask").addEventListener("click", () => {
  ipcRenderer.send("viewtask");
});

mascot.addEventListener("click", () => {
  console.log("CLIC DETECTADO");
  const pendingCount = getPendingTasks().length;
  let message;

  if (pendingCount !== 0) {
      message = `Tienes ${pendingCount} pendientes`
  } else {
    message = `Todo al día 🎉`;
  }

  speechBubble.textContent = message;
  speechBubble.classList.add("show");

  setTimeout(() => {
    speechBubble.classList.remove("show");
    }, 3000);
  });