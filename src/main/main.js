const { app, BrowserWindow, Notification, ipcMain} = require ('electron');
const {getTasks, isTaskDue, markReminded, addTask} = require("../services/TaskManager.js");


function createWindow() {

    const win = new BrowserWindow({
        width: 180,
        height: 300,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile("src/renderer/index.html");
}

function checkReminders() {
    getTasks().forEach(element => {
        if (isTaskDue(element)) {
            const notification = new Notification({
                title: "Task Reminder",
                body: element.text
            });
            notification.show();
            markReminded(element.id)
        }
        
    });
} 

let formWindow;

ipcMain.on("open-form", () => {
    formWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    formWindow.loadFile("src/renderer/form.html");
});

ipcMain.on("send-task", (event, taskData) => {
    addTask(taskData);
    formWindow.close();
});

let viewtask;

ipcMain.on("viewtask", () => {
    viewtask = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    viewtask.loadFile("src/renderer/tasklist.html");
});


app.whenReady().then(() => {
    createWindow();
    setInterval(checkReminders, 60000);
});
