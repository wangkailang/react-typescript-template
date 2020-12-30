const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function installExtensions() {
  const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
  return installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1204,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    // allow cors
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, (isDev ? '../public/preload.js' : './preload.js')),
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '../dist/index.html')}`);

  if (isDev) {
    app.whenReady().then(installExtensions);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

ipcMain.on('sync-job', (event, data) => {
  switch(data.key) {
    case 'open-file':
      dialog.showOpenDialog({ properties: ['openFile'] }).then(excelFile => {
        event.sender.send('file-data', { data: excelFile });
      });
      break;
    default:
  }
});

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});