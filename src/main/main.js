const { app, BrowserWindow, Notification, ipcMain, shell} = require ('electron');
const { isTaskDue, addTask} = require("../services/TaskManager.js");
const { syncCalendar } = require('../services/CalendarSync.js');
const fs = require('fs');
const path = require('path');
const { login, getTasks: getApiTask, markReminded: markApiReminded } = require('../services/ApiClient.js');
const { adaptApiTask } = require('../services/TaskAdapter.js');
const authConfigPath = path.join(__dirname, '../../auth-config.json');


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

async function loginWithStoredCredentials() {
    const configData = fs.readFileSync(authConfigPath, 'utf-8');
    const { username, password } = JSON.parse(configData);
    await login(username, password);
    console.log("Logged in successfully with stored credentials");
}

async function checkReminders() {
    const apiTasks = await getApiTask();
    const tasks = apiTasks.map(adaptApiTask);

    for (const element of tasks) {
        if (isTaskDue(element)) {
            const notification = new Notification({
                title: "Task Reminder",
                body: element.text
            });
            notification.show();
            await markApiReminded(element.id);
        }
    }
}
app.whenReady().then(async () => {
    createWindow();
    await loginWithStoredCredentials();
    setInterval(checkReminders, 60000);
    syncCalendar();
    setInterval(syncCalendar, 15 * 24 * 60 * 60 * 1000)
});

ipcMain.on("open-external-link", (event, url) => {
    shell.openExternal(url)
})