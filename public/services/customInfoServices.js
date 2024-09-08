$(document).ready(function() {
    $('#informationForm').on('submit', function(event) {
      event.preventDefault();
  
      // Lấy dữ liệu từ form và chuyển đổi thành JSON
      const formData = {
        full_name: $('#fullName').val(),
        phone_number: $('#phone').val(),
        gender: $('input[name="gender"]:checked').val(), 
        dob_day: $('#day').val(),
        dob_month: $('#month').val(),
        dob_year: $('#year').val(),
        email: $('#email').val()
      };
  
      // Gửi yêu cầu AJAX để cập nhật thông tin
      $.ajax({
        url: '/cap-nhat-thong-tin',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData), 
        success: function(response) {
          console.log('Success:', response);
          alert('Thông tin đã được cập nhật!');
          window.location.reload();
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
          alert('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
      });
    });
  });