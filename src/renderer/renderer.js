const { ipcRenderer } = require("electron");

document.getElementById("AddTask_btn").addEventListener("click", () => {
  ipcRenderer.send("open-form");
});