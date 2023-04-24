async function frmCredentials_Load() {
    txtHost.value = store.get('credentials.host');
    txtPort.value = store.get('credentials.port');
    txtUser.value = store.get('credentials.user');
    txtKey.value = store.get('credentials.key');
    https.checked = store.get('credentials.protocol') == 'https';
    FormOpen(frmCredentials);
}

async function btnSave_OnClick() {
    store.set('credentials', { host: txtHost.value, port: txtPort.value, protocol: https.checked ? 'https' : 'http', user: txtUser.value, key: txtKey.value });
}