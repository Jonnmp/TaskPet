const { app, BrowserWindow, screen } = require('electron');

const {
    saveWindowPosition,
    getWindowPosition
} = require("../services/StorageManager");

function createWindow() {
    const savedPosition = getWindowPosition();

    let startX;
    let startY;

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    startX = Math.floor(width / 2 - 90);
    startY = Math.floor(height / 2 - 90);

    if (savedPosition) {
        const display = screen.getAllDisplays();

        const isVisible = display.some(display => {
            const bounds = display.workArea;
            
             return (
                savedPosition.x >= bounds.x &&
                savedPosition.x <= bounds.x + bounds.width &&
                savedPosition.y >= bounds.y &&
                savedPosition.y <= bounds.y + bounds.height
            );
        });

        if (isVisible) {
            startX = savedPosition.x;
            startY = savedPosition.y;
        }
    }

    const win = new BrowserWindow({
        width: 180,
        height: 180,

        x: startX,
        y: startY,

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


    win.on("moved", () => {
        const [x, y] = win.getPosition();

        saveWindowPosition({
            x,
            y
        });
    });
}

app.whenReady().then(() => {
    createWindow();
}); 

