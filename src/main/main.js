const { app, BrowserWindow, Notification, ipcMain, shell} = require ('electron');
const {getTasks, isTaskDue, markReminded, addTask} = require("../services/TaskManager.js");
const { syncCalendar } = require('../services/CalendarSync.js');
const fs = require('fs');
const path = require('path');
const {login} = require('../services/ApiClient.js');

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

async function loginWithStoredCredentials() {
    const configData = fs.readFileSync(authConfigPath, 'utf-8');
    const { username, password } = JSON.parse(configData);
    await login(username, password);
    console.log("Logged in successfully with stored credentials");
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