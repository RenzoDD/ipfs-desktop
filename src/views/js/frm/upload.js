async function frmUpload_Load() {
    FormOpen(frmUpload);
}

async function cbxFile_OnChange() {
    fileData.classList.add('d-none');
    txtData.classList.add('d-none');


    if (cbxFile.checked)
        fileData.classList.remove('d-none');
    else if (cbxText.checked)
        txtData.classList.remove('d-none');
}

let bytes = 0;
async function progress(length) {
    var x = (length / bytes * 100).toFixed(2);
    pbPercentage.style = `width: ${x}%`;
    pbPercentage.innerHTML = x + "%";
}

async function btnUpload_OnClick() {
    const client = ipfsClient.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: 'Basic ' + Buffer.from(store.get('credentials.user') + ':' + store.get('credentials.key')).toString('base64')
        }
    });

    if (cbxFile.checked && fileData.files.length > 0) {
        var buffer = fs.readFileSync(fileData.files[0].path);
        bytes = buffer.length;
        var result = await client.add(buffer, { progress });
    } else if (cbxText.checked && txtData.value != "") {
        bytes = txtData.value.length;
        var result = await client.add(txtData.value, { rawLeaves: true, progress });
    }

    pbPercentage.innerHTML = result.cid;
}