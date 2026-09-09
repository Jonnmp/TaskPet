const { app, BrowserWindow, Notification} = require ('electron');
const {getTasks, isTaskDue, markReminded} = require("../services/TaskManager.js");


function createWindow() {

    const win = new BrowserWindow({
        width: 400,
        height: 300,
        transparent: false,
        frame: false
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

app.whenReady().then(() => {
    createWindow();
    setInterval(checkReminders, 60000);
});
