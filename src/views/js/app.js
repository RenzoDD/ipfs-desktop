const forms = document.getElementsByClassName('frm');

function FormOpen(frm) {
	for (var form of forms)
		form.classList.add('d-none');

	frm.classList.remove('d-none');
}

FormOpen(frmUpload)

const fs = require('fs');
const ipfsClient = require('ipfs-http-client');

const Store = require('electron-store');
const store = new Store();