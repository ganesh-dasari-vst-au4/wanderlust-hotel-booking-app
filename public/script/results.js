window.onscroll = function() {
  stickySearchBar();
};
var searchBar = document.getElementById("searchBar");
var sticky = searchBar.offsetTop;

function stickySearchBar() {
  if (window.pageYOffset > sticky) {
    searchBar.classList.add("sticky");
  } else {
    searchBar.classList.remove("sticky");
  }
}

$(document).ready(function() {
  $("#book").on("submit", function() {
    var title = $("title-"(this))
      .val()
      .toLowerCase();
    $.ajax({
      type: "POST",
      url: "/results",
      data: {
        title: title
      },
      success: function() {},
      error: function() {}
    });
  });

  $("#signupbtn").on("submit", function() {
    console.log("clicked");
    var name = $("#name").val();
    var email = $("#email").val();
    var phoneNumber = $("#phoneNumber").val();
    var password = $("#password").val();
    var cnfpassword = $("#cnfpassword").val();
    $.ajax({
      method: "POST",
      url: "/signup",
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        cnfpassword: cnfpassword
      },
      success: function() {},
      error: function() {}
    });
  });
});
