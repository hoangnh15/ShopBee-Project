const range = document.querySelectorAll('.range-slider input');
const progress = document.querySelector('.range-slider .progress');
const inputValue = document.querySelectorAll('.numberVal input');
const warning = document.getElementById('waring-maxmin-text');
const range_slider = document.getElementById('ranger');
const gap = 1000; // khoảng cách tối thiểu giữa hai thanh trượt

// Cập nhật thanh trượt và thanh tiến trình khi thay đổi giá trị của thanh trượt
function updateSlider() {
    let minRange = parseInt(range[0].value);
    let maxRange = parseInt(range[1].value);

    // Đảm bảo khoảng cách giữa min và max không nhỏ hơn gap

    if (maxRange - minRange < gap) {

        warning.style.display = 'block';
       range_slider.style.marginTop='-10px';

    }
    else {
        // Cập nhật giá trị của thanh trượt
        warning.style.display = 'none';
        range_slider.style.marginTop='10px';
        range[0].value = minRange;
        range[1].value = maxRange;
        // Cập nhật thanh tiến trình
        let minPercentage = (minRange / range[0].max) * 100;
        let maxPercentage = (maxRange / range[1].max) * 100;
        progress.style.left = minPercentage + '%';
        progress.style.right = (100 - maxPercentage) + '%';

        // Cập nhật giá trị của các ô nhập
        inputValue[0].value = minRange;
        inputValue[1].value = maxRange;
    }


}

// Cập nhật thanh trượt khi thay đổi giá trị của ô nhập số
function updateInput() {
    let minInput = parseInt(inputValue[0].value);
    let maxInput = parseInt(inputValue[1].value);

    // Đảm bảo khoảng cách giữa min và max không nhỏ hơn gap
    if (maxInput - minInput < gap) {
        warning.style.display = 'block';
        range_slider.style.marginTop='-10px';
    }
    else {
        // Cập nhật giá trị của ô nhập
        warning.style.display = 'none';
        range_slider.style.marginTop='10px';
        inputValue[0].value = minInput;
        inputValue[1].value = maxInput;
        // Cập nhật thanh trượt
    range[0].value = minInput;
    range[1].value = maxInput;

    // Cập nhật thanh tiến trình
    let minPercentage = (parseInt(range[0].value) / range[0].max) * 100;
    let maxPercentage = (parseInt(range[1].value) / range[1].max) * 100;
    progress.style.left = minPercentage + '%';
    progress.style.right = (100 - maxPercentage) + '%';
    }

    
}

// Gán sự kiện cho thanh trượt
range.forEach(input => {
    input.addEventListener('input', updateSlider);
});

// Gán sự kiện cho ô nhập số
inputValue.forEach(input => {
    input.addEventListener('input', updateInput);
});

// Khởi tạo giá trị ban đầu
updateSlider();
