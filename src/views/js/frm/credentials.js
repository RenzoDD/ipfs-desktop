async function frmCredentials_Load() {
    txtUser.value = store.get('credentials.user');
    txtKey.value = store.get('credentials.key');
    FormOpen(frmCredentials);
}

async function btnSave_OnClick() {
    store.set('credentials', { user: txtUser.value, key: txtKey.value });
}