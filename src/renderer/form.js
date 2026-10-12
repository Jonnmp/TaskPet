const { ipcRenderer } = require("electron");

const dateModeBtn = document.getElementById("dateModeBtn");
const minutesModeBtn = document.getElementById("minutesModeBtn");
const duedate = document.getElementById("duedate");
const defaultTime = new Date().getTime() + (30 * 60 * 1000) - (new Date().getTimezoneOffset() * 60000);
duedate.value = new Date(defaultTime).toISOString().slice(0, 16);
const minutes = document.getElementById("minutes");
let mode = "date";

dateModeBtn.addEventListener("click", () => {
    mode = "date";
    duedate.style.display = "block";
    minutes.style.display = "none";
    duedate.required = true;
    minutes.required = false;
});

minutesModeBtn.addEventListener("click", () => {
    mode = "minutes";
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
        reminder: mode === "date" && date ? new Date(date).toISOString() : null,
        reminderMinutes : mode === "minutes" && mins !== ""? Number(mins) : null,
        reminderInterval : interval === "" ? null : Number(interval),
        });
});