
  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      loop: true,
      items: 3,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 3]
    });
  });
  $("#searchButton").on("sumbit", function () {
    var city = $("#destination")
      .val()
      .toLowerCase();
    console.log(city);
    $.ajax({
      type: "POST",
      url: "/results",
      data: {
        city: city
      },
      success: function () {},
      error: function () {}
    });
  });