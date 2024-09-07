$(document).ready(function () {
       //handle loggin True
       $.ajax({
        url: '/auth/status',
        method: 'GET',
        success: function (response) {
            if (response.loggedIn) {
                $('#loginText').hide();
                $('#loginNameShow').text(response.username).show();
                $('#dropdownMenuOfLoginCluster').removeClass('d-none');
                console.log("OK");
            } else {
                $('#loginNameShow').hide();
                $('#loginText').show();
                $('#dropdownMenuOfLoginCluster').addClass('d-none');
                console.log(response.loggedIn);
            }
        },
        error: function (error) {
            console.error('Error fetching login status:', error);
        }
    });
});
$(document).ready(function () {
    // Hiển thị toast nếu có trạng thái loginStatus
    if (sessionStorage.getItem('loginStatus') === 'success') {
        const toastElement = $('#loginToast');
        const toastBody = toastElement.find('.toast-body');
        
        toastBody.text('Login successful');
        toastElement.removeClass('bg-danger').addClass('bg-success');

        // Hiển thị toast
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Xóa trạng thái khỏi sessionStorage sau khi hiển thị
        sessionStorage.removeItem('loginStatus');
    }
});

$(document).ready(function () {
    // login form
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        const emailOrUsername = $('#loginName').val();
        const password = $('#loginPassword').val();

        $.ajax({
            url: '/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: emailOrUsername,
                password: password
            }),
            success: function (response) {
                if (response.message === 'Login successful') {
                    // Lưu trạng thái vào sessionStorage
                    sessionStorage.setItem('loginStatus', 'success');
                    window.location.href = '/';
                } else {
                   
                   // alert('Login failed: ' + response.message);
                    
                }
            },
            error: function (xhr) {
                let errorMessage = xhr.responseJSON.message;
                alert(errorMessage);
            }
        });
    });

    // register form
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        const name = $('#registerName').val();
        const username = $('#registerUsername').val();
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val();
        const repeatPassword = $('#registerRepeatPassword').val();

        $.ajax({
            url: '/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                full_name: name,
                username: username,
                email: email,
                password: password,
                repeat_password: repeatPassword
            }),
            success: function (response) {
                if (response.message === 'Registration successful') {
                    alert('Registration successful');
                } else {
                    alert('Registration failed: ' + response.message);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    //logout 
    $('#logoutButton').click(function(event) {
        event.preventDefault();
        $.ajax({
            url: '/auth/logout',
            method: 'POST',
            success: function(response){
                alert('Đăng xuất thành công!');
                window.location.reload();

            },
            error: function(error){
                console.error('Error logging out: ', error);
            }
        });
        
    });
    
});
