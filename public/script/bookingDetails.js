function checkDate(id) {
  var selectedText = document.getElementById(id).value;
  var selectedDate = new Date(selectedText);
  var now = new Date();
  if (selectedDate < now) {
    alert("Date must be in the future");
  }
}

function validate() {
  var guest = document.getElementById("guestQuantity");
  var room = document.getElementById("roomQuantity");
  var checkIn = document.getElementById("checkIn");
  var checkOut = document.getElementById("checkOut");

  var valid = true;
  removeEr();
  if (guest.value.length == 0) {
    guest.nextElementSibling.innerHTML = "**Guest Field can not be blank!";
    valid = false;
  }
  if (room.value.length == 0) {
    room.nextElementSibling.innerHTML = "**Rooms Field can not be blank!";
    valid = false;
  }
  if (checkIn.value.length == 0) {
    checkIn.nextElementSibling.innerHTML = "**CheckIn date can not be Empty!";
    valid = false;
  }
  if (checkOut.value.length == 0) {
    checkOut.nextElementSibling.innerHTML = "**CheckOut date can not be Empty!";
    valid = false;
  }

  var hotelId = $("#hotelId").attr("class");
  var hotelName = $("#hotelName").attr("class");
  var hotelAddress = $("#hotelAddress").attr("class");
  var hotelCity = $("#hotelCity").attr("class");
  var hotelPhone = $("#hotelPhone").attr("class");
  var hotelPrice = $("#hotelPrice").attr("class");
  var guestQuantity = $("#guestQuantity").val();
  var roomQuantity = $("#roomQuantity").val();
  var checkIn = $("#checkIn").val();
  var checkOut = $("#checkOut").val();
  $.ajax({
    method: "POST",
    url: "/bookingDetails",
    data: {
      hotelId: hotelId,
      hotelName: hotelName,
      hotelAddress: hotelAddress,
      hotelCity: hotelCity,
      hotelPhone: hotelPhone,
      hotelPrice: hotelPrice,
      guestQuantity: guestQuantity,
      roomQuantity: roomQuantity,
      checkIn: checkIn,
      checkOut: checkOut
    },
    success: function(data) {
      console.log(data);
    },
    error: function() {}
  });

  return valid;
}

function removeEr() {
  var errerPara = document.querySelectorAll(".error");
  [].forEach.call(errerPara, function(el) {
    el.innerHTML = "";
  });
}

/*$(document).ready(function() {
  $("#confirm").click(function() {
    var hotelId = $("#hotelId").attr("class");
    var hotelName = $("#hotelName").attr("class");
    var hotelAddress = $("#hotelAddress").attr("class");
    var hotelCity = $("#hotelCity").attr("class");
    var hotelPhone = $("#hotelPhone").attr("class");
    var hotelPrice = $("#hotelPrice").attr("class");
    var guestQuantity = $("#guestQuantity").val();
    var roomQuantity = $("#roomQuantity").val();
    var checkIn = $("#checkIn").val();
    var checkOut = $("#checkOut").val();
    $.ajax({
      method: "POST",
      url: "/bookingDetails",
      data: {
        hotelId: hotelId,
        hotelName: hotelName,
        hotelAddress: hotelAddress,
        hotelCity: hotelCity,
        hotelPhone: hotelPhone,
        hotelPrice: hotelPrice,
        guestQuantity: guestQuantity,
        roomQuantity: roomQuantity,
        checkIn: checkIn,
        checkOut: checkOut
      },
      success: function(data) {
        console.log(data);
        if (data != "error") {
          $(".modal-body").empty();
          $(".modal-body").append("<h5><b>" + data.name);
          $(".modal-body").append("<br><p>Check in date:<b>" + data.checkIn);
          $(".modal-body").append("<br><p>Check out date:<b>" + data.checkOut);

          $(".modal-body").append("<br><p>No. of guests:<b>" + data.guests);
          $(".modal-body").append("<br><p>No. of rooms:<b>" + data.rooms);
          $(".modal-body").append("<br><p>Price:<b>" + data.price);

          $("#loginModal").click();
        }
      },
      error: function() {}
    });
  });
});*/
