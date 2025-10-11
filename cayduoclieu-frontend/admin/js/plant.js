
async function loadPlantStatus() {
    const res = await fetch("http://localhost:8080/api/plant/public/all-status");
    const statuses = await res.json();
    const select = document.getElementById("status");
    select.innerHTML = "";
    statuses.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.name;
        opt.textContent = s.label;
        select.appendChild(opt);
    });
}

async function loadDiseasesSelectAdd() {
    const res = await fetch("http://localhost:8080/api/diseases/public/get-all-list");
    var list = await res.json();
    var main = '';
    list.forEach(s => {
        main += `<option value="${s.id}">${s.name}</option>`;
    });
    document.getElementById("diseases").innerHTML = main
    const ser = $("#diseases");
    ser.select2({
        placeholder: "Chọn các công dụng chữa bệnh",
    });
}

async function loadFamiliesAdd() {
    const res = await fetch("http://localhost:8080/api/families/public/all-list");
    var list = await res.json();
    var main = '';
    list.forEach(s => {
        main += `<option value="${s.id}">${s.name}</option>`;
    });
    document.getElementById("families").innerHTML = main
}

async function savePlant() {
    var uls = new URL(document.URL)
    var idPlant = uls.searchParams.get("id");
    var dto = 
    {
        plant:{
            id:idPlant,
            name:document.getElementById("name").value,
            scientificName:document.getElementById("scientificName").value,
            slug:document.getElementById("slug").value,
            genus:document.getElementById("genus").value,
            otherNames:document.getElementById("otherNames").value,
            partsUsed:document.getElementById("partsUsed").value,
            description:document.getElementById("description").value,
            botanicalCharacteristics:document.getElementById("botanicalCharacteristics").value,
            chemicalComposition:document.getElementById("chemicalComposition").value,
            ecology:document.getElementById("ecology").value,
            medicinalUses:document.getElementById("medicinalUses").value,
            indications:document.getElementById("indications").value,
            contraindications:document.getElementById("contraindications").value,
            dosage:document.getElementById("dosage").value,
            folkRemedies:document.getElementById("folkRemedies").value,
            sideEffects:document.getElementById("sideEffects").value,
            plantStatus:document.getElementById("status").value,
            featured:document.getElementById("featured").value,
            stem:document.getElementById("stem").value,
            leaf:document.getElementById("leaf").value,
            flower:document.getElementById("flower").value,
            fruitOrSeed:document.getElementById("fruitOrSeed").value,
            root:document.getElementById("root").value,
            linkDocument:window.documentPlant,
            image:window.ImageBanner,
            families:{
                id:document.getElementById("families").value,
            }
        },
        images: uploadedImages,
        diseasesIds: $("#diseases").val()
    }

    const response = await fetch(`http://localhost:8080/api/plant/admin/create`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(dto)
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "thêm/sửa cây thành công!",
                type: "success"
            },
            function() {
                window.location.href = '/admin/plant/list.html'
            });
    }
    else if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
    else{
        toastr.error("Có lỗi xảy ra: "+response.status);
    }
}


const uploadedImages = []; // lưu link ảnh đã upload
let uploading = false;     // trạng thái đang upload

function initImageUpload() {
    const chooseInput = document.getElementById('choosefile');
    const previewContainer = document.getElementById('preview');
    const btnSave = $("#btnSave");

    // =================== add preview =====================
    function addPreview(file, idx) {
        const div = document.createElement('div');
        div.className = 'col-md-3 col-sm-6 col-6 mb-2';
        div.style.height = '150px';
        div.style.position = 'relative';
        previewContainer.appendChild(div);

        // image
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.height = '100px';
        img.style.width = '100%';
        img.className = 'img-thumbnail';
        div.appendChild(img);

        // progress bar
        const progressWrapper = document.createElement('div');
        progressWrapper.className = 'progress mt-1';
        progressWrapper.style.height = '6px';
        div.appendChild(progressWrapper);

        const progress = document.createElement('div');
        progress.className = 'progress-bar progress-bar-striped progress-bar-animated';
        progress.style.width = '0%';
        progressWrapper.appendChild(progress);

        // button xóa
        const btn = document.createElement('button');
        btn.className = 'btn btn-danger btn-sm';
        btn.innerText = 'Xóa';
        btn.style.position = 'absolute';
        btn.style.bottom = '5px';
        btn.style.left = '5px';
        div.appendChild(btn);

        btn.addEventListener('click', () => {
            div.remove();
            // xóa ảnh khỏi array tạm
            uploadedImages.splice(idx, 1);
        });

        return {progressEl: progress, divEl: div};
    }

    // =================== handle upload =====================
    async function handleFiles(files) {
        if (!files.length) return;

        uploading = true;
        btnSave.prop("disabled", true).text("Đang tải ảnh... ⏳");

        // show preview và khởi tạo vị trí trong array tạm
        const previewElements = [];
        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(null); // placeholder
            previewElements.push(addPreview(files[i], i));
        }

        const formData = new FormData();
        files.forEach(f => formData.append("file", f));

        try {
            const res = await fetch("http://localhost:8080/api/public/upload-multiple-file-order-response", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Upload thất bại");

            const data = await res.json(); // [{id:0, link:"..."}, ...] đã đúng thứ tự
            data.forEach(item => {
                uploadedImages[item.id] = item.link;
                // update progress full
                const progress = previewElements[item.id].progressEl;
                progress.style.width = '100%';
                progress.classList.remove('progress-bar-animated', 'progress-bar-striped');

                // update img src sang link thực tế nếu muốn
                const imgEl = previewElements[item.id].divEl.querySelector('img');
                imgEl.src = item.link;
            });

        } catch (err) {
            console.error("Upload lỗi:", err);
            data?.forEach(item => {
                const progress = previewElements[item.id]?.progressEl;
                if (progress) {
                    progress.style.backgroundColor = '#dc3545';
                    progress.style.width = '100%';
                    progress.classList.remove('progress-bar-animated', 'progress-bar-striped');
                }
            });
            toastr.error("Tải ảnh thất bại!");
        } finally {
            uploading = false;
            btnSave.prop("disabled", false).text("Lưu");
        }
    }

    // =================== event =====================
    chooseInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
        chooseInput.value = '';
    });

    // Drag & drop
    previewContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        previewContainer.classList.add('border-primary');
    });
    previewContainer.addEventListener('dragleave', (e) => {
        e.preventDefault();
        previewContainer.classList.remove('border-primary');
    });
    previewContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        previewContainer.classList.remove('border-primary');
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });

    // Copy paste
    document.addEventListener('paste', (e) => {
        const items = e.clipboardData.items;
        const files = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].kind === 'file') {
                files.push(items[i].getAsFile());
            }
        }
        if (files.length) handleFiles(files);
    });
}

$(document).ready(function() {
    initImageUpload();

});
