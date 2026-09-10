const { ipcRenderer } = require("electron");

const dateModeBtn = document.getElementById("dateModeBtn");
const minutesModeBtn = document.getElementById("minutesModeBtn");
const duedate = document.getElementById("duedate");
const minutes = document.getElementById("minutes");

dateModeBtn.addEventListener("click", () => {
    duedate.style.display = "block";
    minutes.style.display = "none";
    duedate.required = true;
    minutes.required = false;
});

minutesModeBtn.addEventListener("click", () => {
    minutes.style.display = "block";
    duedate.style.display = "none";
    duedate.required = false;
    minutes.required = true;
});

const form = document.getElementById("taskForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = document.getElementById("taskdescription").value;
    const date = document.getElementById("duedate").value;
    const mins = document.getElementById("minutes").value;
    const interval = document.getElementById("interval").value;

    ipcRenderer.send("send-task", {
        text: text,
        reminder: date,
        reminderMinutes : Number(mins),
        reminderInterval : Number(interval),
        });
});