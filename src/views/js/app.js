const forms = document.getElementsByClassName('frm');

function FormOpen(frm) {
	for (var form of forms)
		form.classList.add('d-none');

	frm.classList.remove('d-none');
}

FormOpen(frmStart)