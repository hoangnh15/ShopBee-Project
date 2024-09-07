//header danh muc san pham:


//mouse hover
document.addEventListener('DOMContentLoaded', function () {
    // Danh sách các ID phần tử cần áp dụng
    var dropdownIds = ['danhmucsanpham', 'login_cluster'];

    dropdownIds.forEach(function (id) {
        var dropdown = document.getElementById(id);

        if (dropdown) {
            dropdown.addEventListener('mouseover', function () {
                var dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    var bootstrapDropdown = new bootstrap.Dropdown(dropdown.querySelector('.dropdown-toggle'));
                    bootstrapDropdown.show();
                }
            });

            dropdown.addEventListener('mouseout', function () {
                var dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    var bootstrapDropdown = new bootstrap.Dropdown(dropdown.querySelector('.dropdown-toggle'));
                    bootstrapDropdown.hide();
                }
            });
        }
    });
});




document.addEventListener('DOMContentLoaded', function () {
    var button1 = document.getElementById('cus_tab_btn1');
    var button2 = document.getElementById('cus_tab_btn2');
    var button3 = document.getElementById('cus_tab_btn3');
    var tab_content_left = document.getElementById('tab_product_content_left');
    var tab_content_right = document.getElementById('tab_product_content_right');
    var product_banner_left = document.getElementById('product_banner_left');

    button1.addEventListener('click', function(){
        phoneContent.style.display = 'block';
        laptopContent.style.display = 'none';
        tabletContent.style.display = 'none';
        button1.style.backgroundColor = '#ed4e2e';
        button2.style.backgroundColor = '#eaedf1';
        button3.style.backgroundColor = '#eaedf1';
        tab_content_left.style.backgroundColor = tab_content_right.style.backgroundColor = '#ed4e2e';
        product_banner_left.src = 'images/banner/banner_dt.png';
        });
    button2.addEventListener('click', function(){
        laptopContent.style.display = 'block';
        phoneContent.style.display = 'none';
        tabletContent.style.display = 'none';
        button2.style.backgroundColor = '#ffd744';
        button1.style.backgroundColor = '#eaedf1';
        button3.style.backgroundColor = '#eaedf1';
        tab_content_left.style.backgroundColor = tab_content_right.style.backgroundColor = '#ffd744';
        product_banner_left.src = 'images/banner/backtoschool.png';
    });
    button3.addEventListener('click', function(){
        phoneContent.style.display = 'none';
        laptopContent.style.display = 'none';
        tabletContent.style.display = 'block';
        button3.style.backgroundColor = '#b3e3f0';
        button2.style.backgroundColor = '#eaedf1';
        button1.style.backgroundColor = '#eaedf1';
        tab_content_left.style.backgroundColor = tab_content_right.style.backgroundColor = '#b3e3f0';
        product_banner_left.src = 'images/banner/banner_3_tab.webp';
    });

});

//show more category
document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product-item');
    const seeMoreBtn = document.getElementById('see-more-btn');
    let visibleCount = 6;

    seeMoreBtn.addEventListener('click', function() {
        const nextCount = visibleCount + 6;
        for (let i = visibleCount; i < nextCount && i < products.length; i++) {
            products[i].style.display = 'block';
        }
        visibleCount += 6;

        // Ẩn nút "Xem thêm" nếu đã hiển thị hết sản phẩm
        if (visibleCount >= products.length) {
            seeMoreBtn.style.display = 'none';
        }
    });
});
