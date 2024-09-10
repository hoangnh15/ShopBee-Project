const findFullNameById = (id, data) => {
    const item = data.find(item => item.id === id);
    return item ? item.full_name : null; 
};
$(document).ready(function () {
    const apiUrl = 'https://esgoo.net/api-tinhthanh/1/0.htm';

    // Fetch provinces
    $.getJSON('https://esgoo.net/api-tinhthanh/1/0.htm', function (data_tinh) {
        if (data_tinh.error == 0) {
            const $provinceSelect = $('.province');
            $provinceSelect.empty().append('<option value="">Chọn Tỉnh/Thành phố</option>');
            $.each(data_tinh.data, function (key_tinh, val_tinh) {
                $provinceSelect.append('<option value="' + val_tinh.id + '">' + val_tinh.full_name + '</option>');
            });

        } else {
            console.error('Error fetching provinces');
        }
    });

    $(".province").change(function (e) {
        var idtinh = $(this).val();
        //lấy quận huyện
        $.getJSON('https://esgoo.net/api-tinhthanh/2/' + idtinh + '.htm', function (data_quan) {
            if (data_quan.error == 0) {
                const $districtSelect = $('.district');
                $districtSelect.empty().append('<option value="">Chọn Quận/Huyện</option>');
                $.each(data_quan.data, function (key_quan, val_quan) {
                    $districtSelect.append('<option value="' + val_quan.id + '">' + val_quan.full_name + '</option>');
                });
            } else {
                console.error('Error fetching district');
            }
        });
        //lấy phường xã
        $('.district').change(function (e) {
            var idquan = $(this).val();
            $.getJSON('https://esgoo.net/api-tinhthanh/3/' + idquan + '.htm', function (data_phuong) {
                if (data_phuong.error == 0) {
                    const $wardSelect = $('.ward');
                    $wardSelect.empty().append('<option value="">Chọn Phường/Xã</option>');
                    $.each(data_phuong.data, function (key_phuong, val_phuong) {
                        $wardSelect.append('<option value="' + val_phuong.id + '">' + val_phuong.full_name + '</option>');
                    });
                } else {
                    console.error('Error fetching provinces');
                }
            });

        });

    });

    $('#addressForm').on('submit', function (e) {
        e.preventDefault();


        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/them-dia-chi',
            data: formData,
            success: function (response) {
                alert("Đã thêm địa chỉ mới!");
                window.location.reload();

            },
            error: function (xhr, status, error) {
                alert(xhr.responseJSON.message);
                //window.location.reload();

            }
        });
    });


    $(document).on('click', '.update_addr', function () {
        var fullname = $(this).data('fullname');
        var phoneNumber = $(this).data('phonenumber');
        var province = $(this).data('province');
        var district = $(this).data('district');
        var ward = $(this).data('ward');
        var detailAddr = $(this).data('detail-addr');
        var type = $(this).data('type');
        var isDefault = $(this).data('is-default');
        var addressId = $(this).data('address-id');
        var userId = $(this).data('user-id');
    
        console.log(fullname, phoneNumber, province, district, ward, detailAddr, type, isDefault, addressId, userId);
        $('#offcanvasRightUpdate #Up_recipientName').val(fullname);
        $('#offcanvasRightUpdate #Up_phoneNumber').val(phoneNumber);
        $('#offcanvasRightUpdate #Up_detail_addr').val(detailAddr);
        $('#offcanvasRightUpdate #Up_addressId').val(addressId);
        $('#offcanvasRightUpdate #Up_userId').val(userId);
        $('#offcanvasRightUpdate input[name="type"][value="'+type+'"]').prop('checked', true);
        if (isDefault === 1) {
            $('#offcanvasRightUpdate #Up_defaultaddr').prop('checked', true);
        } else {
            $('#offcanvasRightUpdate #Up_defaultaddr').prop('checked', false);
        }
        //province
        $.getJSON('https://esgoo.net/api-tinhthanh/1/0.htm' , function (data_tinh) {
            if (data_tinh.error == 0) {
                const $provinceSelect = $('.province');
                $provinceSelect.val(String(province));
                province_name = findFullNameById(String(province),data_tinh.data);
                console.log(String(province), province_name);
                $provinceSelect.find('option[value="' + String(province) + '"]').text(province_name);
                
            } else {
                console.error('Error fetching province');
            }
        });
        //district:
        $.getJSON('https://esgoo.net/api-tinhthanh/2/' + String(province) + '.htm', function (data_quan) {
            if (data_quan.error == 0) {
                const $districtSelect = $('.district');
                $districtSelect.empty().append('<option value="">Chọn Quận/Huyện</option>');
                $.each(data_quan.data, function (key_quan, val_quan) {
                    $districtSelect.append('<option value="' + val_quan.id + '">' + val_quan.full_name + '</option>');
                });
                $districtSelect.val(String(district));
                district_name = findFullNameById(String(district),data_quan.data);
                console.log(String(district), district_name);
                $districtSelect.find('option[value="' + String(district) + '"]').text(district_name);
            } else {
                console.error('Error fetching district');
            }
        });
        //ward:
        $.getJSON('https://esgoo.net/api-tinhthanh/3/' + String(district) + '.htm', function (data_phuong) {
            if (data_phuong.error == 0) {
                const $wardSelect = $('.ward');
                $wardSelect.empty().append('<option value="">Chọn Phường/Xã</option>');
                    $.each(data_phuong.data, function (key_phuong, val_phuong) {
                        $wardSelect.append('<option value="' + val_phuong.id + '">' + val_phuong.full_name + '</option>');
                    });
                $wardSelect.val(String(ward));
                ward_name = findFullNameById(String(ward),data_phuong.data);
                console.log(String(ward), ward_name);
                $wardSelect.find('option[value="' + String(ward) + '"]').text(ward_name);
            } else {
                console.error('Error fetching ward');
            }
        });


    });

    $('#updateAddressForm').on('submit', function (e) {
        e.preventDefault();


        var formData = $(this).serialize();
        console.log(formData);
        $.ajax({
            type: 'POST',
            url: '/chinh-sua-dia-chi',
            data: formData,
            success: function (response) {
                alert("Đã cập nhật địa chỉ thành công!");
                window.location.reload();

            },
            error: function (xhr, status, error) {
                alert(xhr.responseJSON.message);
                //window.location.reload();

            }
        });
    });

    $(document).on('click', '.delete_addr', function (){
        var addressId = $(this).data('address-id');

        $.ajax({
            type: 'DELETE',
            url: `/xoa-dia-chi/${addressId}`,
            success: function(response) {
                alert(response.message);
                window.location.reload();
            },
            error: function(xhr, status, error){
                alert(xhr.responseJSON.message);
            }
        });

    });
});
