$(document).ready(function () {
    $('#contactUs').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
            method: 'POST',
            url: url,
            data: form.serialize(),
            success: function () {
                $('.modal-body').empty();
                $('.modal-body').append("<p>you message has been recieved");
                $('#contactUsModal').click();
            },
            error: function () {}
        })
    })
})