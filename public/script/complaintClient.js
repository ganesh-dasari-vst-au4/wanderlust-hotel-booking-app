$(document).ready(function () {
  $('#complaintForm').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      method: 'POST',
      url: url,
      data: form.serialize(),
      success: function (data) {
        console.log(data)
        if (data != "error") {
          $('.modal-body').empty();
          $('.modal-body').append("<p>complaint successfully registered</p>")
          $('#complaintModal').click();
        } else {
          $('.modal-body').empty();
          $('.modal-body').append("<p>complaint cannot be registered</p>")
          $('#complaintModal').click();
        }
      },
      error: function () {}
    })
  })
})