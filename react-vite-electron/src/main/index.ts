import { BrowserWindow, app } from 'electron';
import { join } from 'path';

const isDev = process.env.IS_ENV === 'true';

if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reload')(__dirname, {
    electron: process.execPath,
    hardResetMethod: 'exit',
  });
}

function createWindow() {
  // 创建窗口
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    // 开发环境，通过 loadURL 加载 devServer
    mainWindow?.loadURL(`http://localhost:${process.env.PORT || 5173}`);
  } else {
    // 生产环境，加载构建后的文件
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow.destroy();
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

process.on('SIGINT', () => {
  // 忽略 SIGINT 信号，不做任何操作
});
