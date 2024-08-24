
document.addEventListener('DOMContentLoaded', function() {
    var button1 = document.getElementById('cus_tab_btn1');
    var button2 = document.getElementById('cus_tab_btn2');
    var button3 = document.getElementById('cus_tab_btn3');
    var tab_content_left = document.getElementById('tab_product_content_left');
    var tab_content_right = document.getElementById('tab_product_content_right');
    var product_banner_left = document.getElementById('product_banner_left');
    function hideAll() {
        phoneContent.style.display = 'none';
        laptopContent.style.display = 'none';
        tabletContent.style.display = 'none';
    }
    button1.addEventListener('click', function(){
        hideAll();
        phoneContent.style.display = 'block';
        button1.style.backgroundColor = '#ed4e2e';
        button2.style.backgroundColor = '#eaedf1';
        button3.style.backgroundColor = '#eaedf1';
        tab_content_left.style.backgroundColor = tab_content_right.style.backgroundColor = '#ed4e2e';
        product_banner_left.src = 'images/banner/banner_dt.png';
        tab_content_right.innerHTML = phonecontent;
    });
    button2.addEventListener('click', function(){
        hideAll();
        laptopContent.style.display = 'block';
        button2.style.backgroundColor = '#ffd744';
        button1.style.backgroundColor = '#eaedf1';
        button3.style.backgroundColor = '#eaedf1';
        tab_content_left.style.backgroundColor = tab_content_right.style.backgroundColor = '#ffd744';
        product_banner_left.src = 'images/banner/backtoschool.png';
        tab_content_right.innerHTML = laptopcontent;
    });
    button3.addEventListener('click', function(){
        hideAll();
        tabletContent.style.display = 'block';
        button3.style.backgroundColor = '#b3e3f0';
        button2.style.backgroundColor = '#eaedf1';
        button1.style.backgroundColor = '#eaedf1';
        tab_content_left.style.backgroundColor = tab_content_right.style.backgroundColor = '#b3e3f0';
        product_banner_left.src = 'images/banner/banner_3_tab.webp';
        tab_content_right.innerHTML = phonecontent;
    });

});


