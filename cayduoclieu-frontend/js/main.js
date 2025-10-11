var token = localStorage.getItem("token");
const exceptionCode = 417;
$( document ).ready(function() {
    var headerUser = 
    `<nav class="navbar navbar-expand-lg bg-white py-3">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <div class="logo-circle">DL</div>
        <span>DuocLieuVN</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
          <li class="nav-item"><a class="nav-link active text-success fw-semibold border-bottom border-2 border-success" href="/index.html">Trang chủ</a></li>
          <li class="nav-item"><a class="nav-link" href="/plant.html">Cây dược liệu</a></li>
          <li class="nav-item"><a class="nav-link" href="/articles.html">Bài viết</a></li>
          <li class="nav-item"><a class="nav-link" href="/research.html">Nghiên cứu</a></li>
          <li class="nav-item"><a class="nav-link" href="/experts.html">Chuyên gia</a></li>
          <li class="nav-item"><a class="nav-link" href="/about.html">Giới thiệu</a></li>
        </ul>
        <div class="d-flex gap-2">
          <a href="/login.html" class="btn btn-light btn-custom-login">
            <i class="bi bi-box-arrow-in-right"></i> Đăng nhập
          </a>
          <a href="/regis.html" class="btn btn-custom-register">
            <i class="bi bi-person"></i> Đăng ký
          </a>
        </div>
      </div>
    </div>
  </nav>`
  document.getElementById("header-main").innerHTML = headerUser

  var footerUser = 
  `<div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="d-flex align-items-center mb-3">
          <div class="footer-logo">DL</div>
          <span class="fs-5 fw-bold">DuocLieuVN</span>
        </div>
        <p>Hệ thống quản lý thông tin cây dược liệu Việt Nam, cung cấp thông tin đầy đủ và chính xác.</p>
        <div class="d-flex gap-3">
          <a href="#"><i class="bi bi-facebook"></i></a>
          <a href="#"><i class="bi bi-twitter"></i></a>
          <a href="#"><i class="bi bi-instagram"></i></a>
        </div>
      </div>
      <div class="col-md-2">
        <h3 class="mb-3">Liên kết nhanh</h3>
        <ul class="list-unstyled">
          <li><a href="/">Trang chủ</a></li>
          <li><a href="/plants">Cây dược liệu</a></li>
          <li><a href="/articles">Bài viết</a></li>
          <li><a href="/research">Nghiên cứu</a></li>
          <li><a href="/experts">Chuyên gia</a></li>
          <li><a href="/about">Giới thiệu</a></li>
        </ul>
      </div>
      <div class="col-md-3">
        <h3 class="mb-3">Danh mục</h3>
        <ul class="list-unstyled">
          <li><a href="#">Thảo dược</a></li>
          <li><a href="#">Cây thuốc</a></li>
          <li><a href="#">Nấm dược liệu</a></li>
          <li><a href="#">Hoa dược liệu</a></li>
          <li><a href="#">Rễ dược liệu</a></li>
          <li><a href="#">Quả dược liệu</a></li>
        </ul>
      </div>
      <div class="col-md-3">
        <h3 class="mb-3">Liên hệ</h3>
        <ul class="list-unstyled">
          <li><i class="bi bi-geo-alt-fill me-2"></i> Số 123, Đường ABC, Hà Nội</li>
          <li><i class="bi bi-telephone-fill me-2"></i> +84 123 456 789</li>
          <li><i class="bi bi-envelope-fill me-2"></i> info@duoclieuvn.com</li>
        </ul>
      </div>
    </div>
    <div class="text-center border-top mt-4 pt-3">
      © 2025 DuocLieuVN. Tất cả các quyền được bảo lưu.
    </div>
  </div>`
  document.getElementById("footer-main").innerHTML = footerUser
});
