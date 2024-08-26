//header danh muc san pham:


//mouse hover
document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.getElementById('danhmucsanpham');

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
        tab_content_right.innerHTML = phonecontent;
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
        tab_content_right.innerHTML = laptopcontent;
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
        tab_content_right.innerHTML = phonecontent;
    });

});