var token = localStorage.getItem("token");
const exceptionCode = 417;
$( document ).ready(function() {
    var headerAdmin =
`<div class="sidebar d-none d-lg-flex flex-column">
      <div class="d-flex align-items-center p-3 border-bottom">
        <div class="brand-circle">DL</div>
        <span class="ms-2 brand">DuocLieuVN</span>
      </div>
      <nav class="flex-grow-1 p-2">
        <a href="/admin" class="nav-link active"><i data-lucide="layout-dashboard" class="me-2"></i>Trang chủ</a>
        <a href="/admin/plant/list.html" class="nav-link"><i data-lucide="leaf" class="me-2"></i>Cây dược liệu</a>
        <a href="/admin/blog/list.html" class="nav-link"><i data-lucide="file-text" class="me-2"></i>Bài viết</a>
        <a href="/admin/research/list.html" class="nav-link"><i data-lucide="book-open" class="me-2"></i>Nghiên cứu</a>
        <a href="/admin/experts" class="nav-link"><i data-lucide="user-circle" class="me-2"></i>Chuyên gia</a>
        <a href="/admin/account/list.html" class="nav-link"><i data-lucide="users" class="me-2"></i>Người dùng</a>
        <div class="accordion" id="menuAccordion">
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="nav-link w-100 d-flex align-items-center collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#submenu1">
                <i data-lucide="list" class="me-2"></i>Danh mục
              </button>
            </h2>
            <div id="submenu1" class="accordion-collapse collapse" data-bs-parent="#menuAccordion">
              <div class="accordion-body py-2 px-0 submenu">
                <a href="/admin/diseases/list.html" class="nav-link">Công dụng chữa bệnh</a>
                <a href="/admin/families/list.html" class="nav-link">Họ thực vật</a>
              </div>
            </div>
          </div>
        </div>

        <a href="/admin/settings" class="nav-link"><i data-lucide="settings" class="me-2"></i>Cài đặt</a>
      </nav>
      </div>` 
document.getElementById("header-admin").innerHTML = headerAdmin

var navbarAdmin = 
`<header class="topbar py-2 px-3 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <button class="btn btn-link d-lg-none p-0 me-2"><i data-lucide="menu"></i></button>
          <div class="search-box">
            <i data-lucide="search" class="icon"></i>
            <input type="text" class="form-control" placeholder="Tìm kiếm...">
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-light rounded-circle me-3"><i data-lucide="bell"></i></button>
          <div class="dropdown">
            <button class="btn btn-light rounded-circle" data-bs-toggle="dropdown">
              <img src="https://via.placeholder.com/32" alt="Admin" class="rounded-circle">
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><h6 class="dropdown-header">Tài khoản của tôi</h6></li>
              <li><a class="dropdown-item" href="#"><i data-lucide="user-circle" class="me-2"></i>Hồ sơ</a></li>
              <li><a class="dropdown-item" href="#"><i data-lucide="settings" class="me-2"></i>Cài đặt</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="/login.html"><i data-lucide="log-out" class="me-2"></i>Đăng xuất</a></li>
            </ul>
          </div>
        </div>
      </header>`
document.getElementById("navbar-admin").innerHTML = navbarAdmin
lucide.createIcons();
});

