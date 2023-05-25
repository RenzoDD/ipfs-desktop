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
		width: 600,
		height: 300,
		webPreferences: {
			devTools: false,
			nodeIntegration: true,
			contextIsolation: false
		},
		icon: __dirname + "\\views\\img\\icon.png",
		resizable: false,
		maximizable: false,
		autoHideMenuBar: true,
		//show: false
	})
	myWindow.setAlwaysOnTop(true, 'screen');
	myWindow.loadFile(__dirname + '/views/index.html');
	myWindow.webContents.once('did-finish-load', function () { myWindow.show() });
})();

const Store = require('electron-store');
const store = new Store();

if (!store.get('credentials'))
	store.set('credentials', { host: 'ipfs.infura.io', port: 5001, protocol: 'https', user: '', key: '' });