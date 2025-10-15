var size = 10;

async function loadAllResearch(page) {
  const param = document.getElementById("param").value || "";
  const status = document.getElementById("status").value || "";
  var url = `http://localhost:8080/api/research/admin/all?page=${page}&size=${size}&q=${param}`;
  if(status != ""){
    url += `&status=${status}`
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  });
  const result = await response.json();
  const list = result.content || [];
  const totalPage = result.totalPages || 0;
  const totalElements = result.totalElements || 0;
  const numberOfElements = result.numberOfElements || 0;
  const start = totalElements === 0 ? 0 : page * size + 1;
  const end = totalElements === 0 ? 0 : page * size + numberOfElements;
  let main = '';
  for (let i = 0; i < list.length; i++) {
    const d = list[i];
    main += `
      <tr>
        <td>${d.id}</td>
        <td><img src="${d.imageBanner}" class="img-table"></td>
        <td>${d.title}</td>
        <td>${d.authors}</td>
        <td>${d.publishedYear}</td>
        <td><span class="badge" style="background:${d.color}">${d.statusLabel}</span></td>
        <td>${d.views}</td>
        <td>${d.createdAt}</td>
        <td>${d.updatedAt}</td>
        <td class="text-center">
            <a href="/admin/research/create.html?id=${d.id}" class="btn btn-primary btn-sm" title="Sửa"><i class="fa-solid fa-pencil"></i></a>
            <button onclick="deleteResearch(${d.id})" class="btn btn-danger btn-sm " title="Xóa"><i class="fa-solid fa-xmark"></i></button>
        </td>
    </tr>`;
  }

  document.getElementById("listData").innerHTML = main;
  document.getElementById("numElm").innerText = `Đang hiển thị ${start}-${end} trong ${totalElements} kết quả`;

  // Pagination
  let pageHtml = '';
  for (let i = 1; i <= totalPage; i++) {
    pageHtml += `<li class="page-item ${i === page + 1 ? 'active' : ''}">
                   <a class="page-link" href="#" onclick="loadAllArticle(${i - 1})">${i}</a>
                 </li>`;
  }
  document.getElementById("pageable").innerHTML = pageHtml;
}

async function loadResearchStatusList() {
  var res = await fetch("http://localhost:8080/api/research/public/research-status");
  var list = await res.json();
  var main = '<option value="">Tất cả trạng thái</option>';
  list.forEach(s => {
    main += `<option value="${s.name}">${s.label}</option>`;
  });
  document.getElementById("status").innerHTML = main
}


async function loadResearchStatus() {
  var res = await fetch("http://localhost:8080/api/research/public/research-status");
  var list = await res.json();
  var main = '';
  list.forEach(s => {
    main += `<option value="${s.name}">${s.label}</option>`;
  });
  document.getElementById("status").innerHTML = main
}

async function loadPlants() {
    const res = await fetch("http://localhost:8080/api/plant/admin/all-name", {
        method: 'GET',
        headers: new Headers({
        'Authorization': 'Bearer ' + token
        })
    });
    var list = await res.json();
    var main = '';
    list.forEach(s => {
        main += `<option value="${s.id}">${s.name}</option>`;
    });
    document.getElementById("plants").innerHTML = main
    const ser = $("#plants");
    ser.select2({
        placeholder: "Chọn các cây dược liệu",
    });
}

async function deleteResearch(id) {
    var con = confirm("Xác nhận xóa nghiên cứu này?")
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/research/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo",
            text: "xóa nghiên cứu thành công!",
            type: "success"
        },
        function() {
            loadAllResearch(0)
        });
    }
    if (response.status == exceptionCode) {
        toastr.warning(result.defaultMessage);
        swal({
            title: "Thông báo",
            text: result.defaultMessage,
            type: "error"
        },
        function() {
        });
    }
}


async function saveReseach() {
    var uls = new URL(document.URL)
    var idPlant = uls.searchParams.get("id");
    var dto = 
    {
        research:{
            id:idPlant,
            title:document.getElementById("title").value,
            slug:document.getElementById("slug").value,
            abstractText:document.getElementById("abstractText").value,
            content:tinymce.get("editor").getContent(),
            authors:document.getElementById("authors").value,
            institution:document.getElementById("institution").value,
            publishedYear:document.getElementById("publishedYear").value,
            journal:document.getElementById("journal").value,
            field:document.getElementById("field").value,
            researchStatus:document.getElementById("status").value,
            linkDocument:window.documentPlant,
            imageBanner:window.uploadedImageBanner,
        },
        plantId: $("#plants").val()
    }

    const response = await fetch(`http://localhost:8080/api/research/admin/save`, {
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
                text: "thêm/sửa nghiên cứu thành công!",
                type: "success"
            },
            function() {
                window.location.href = '/admin/research/list.html'
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


async function loadAResearch() {
    var id = window.location.search.split('=')[1];
    if (id != null) {
        var url = 'http://localhost:8080/api/research/public/find-by-id?id=' + id;
        const response = await fetch(url, {
            method: 'GET'
        });
        var result = await response.json();
        document.getElementById("title").value = result.title
        document.getElementById("slug").value = result.slug
        document.getElementById("authors").value = result.authors
        document.getElementById("abstractText").value = result.abstractText
        document.getElementById("journal").value = result.journal
        document.getElementById("institution").value = result.institution
        document.getElementById("publishedYear").value = result.publishedYear
        document.getElementById("field").value = result.field
        document.getElementById("field").value = result.field
        document.getElementById("previewWrapper").innerHTML = `<img src="${result.imageBanner}" class="img-fluid rounded" />`
        document.getElementById("status").value = result.researchStatus
        tinyMCE.get('editor').setContent(result.content)
        window.uploadedImageBanner = result.imageBanner;
        window.documentPlant = result.linkDocument;
        if(result.linkDocument != null){
            document.getElementById("noti-choosefile").innerText = 'Đã có 1 tài liệu được upload'
        }
        const plantIds = result.researchPlants?.map(pd => pd.plant?.id) || [];
        $("#plants").val(plantIds).change()
    }
}
