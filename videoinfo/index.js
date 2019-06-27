// this is node type project
const electron = require('electron');
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({});
    // __dirname global variable provided by node
    mainWindow.loadURL(`file://${__dirname}/index.html`);
})

ipcMain.on("video:submit", (event, path) => {
    ffmpeg.ffprob(path, (err, metadata) => {
        mainWindow.webContents.send("video:metadata", metadata.format.duration);
    });
});
