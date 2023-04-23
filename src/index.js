const { app, BrowserWindow } = require('electron')
let myWindow = null;

// only one instance
if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit();
}

app.on('second-instance', () => {
	if (myWindow) {
		if (myWindow.isMinimized())
			myWindow.restore();
		myWindow.focus();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});

(async function () {
	await app.whenReady();

	myWindow = new BrowserWindow({
		minWidth: 400,
		minHeight: 500,
		webPreferences: {
			//devTools: false,
			nodeIntegration: true,
			//contextIsolation: false
		},
		icon: __dirname + "\\views\\img\\icon.png",
		autoHideMenuBar: true,
		//show: false
	})
	myWindow.setAlwaysOnTop(true, 'screen');
	myWindow.loadFile(__dirname + '/views/index.html');
	myWindow.webContents.once('did-finish-load', function () { myWindow.show() });
})();




/*
global.path = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + "/ipfs-desktop";
if (!fs.existsSync(global.path))
	fs.mkdirSync(global.path);
*/