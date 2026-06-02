const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 180,
        height: 180,

        transparent: true,
        frame: false,
        alwaysOnTop: true,
        resizable: false,

        hasShadow: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }    
    });

    win.loadFile("index.html");

}

app.whenReady().then(() => {
    createWindow();
});